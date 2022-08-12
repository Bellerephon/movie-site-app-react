import { createMovie, storage } from "../../../lib/init-firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import { Container, Row, Col, Form, Modal, Button, ProgressBar, Image } from "react-bootstrap";
import { useUserAuth } from '../../../contexts/user-auth-context';

import './create-movie.scss';

export const CreateMovie = ({
    showAction,
    handleClose,
}) => {
    const [validated, setValidated] = useState(false);
    const [imageUpload, setImageUpload] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');
    const [progress, setProgress] = useState(0);
    const [value, setValue] = useState({
        Title: '',
        Year: '',
        Description: '',
        Director: [],
        Writers: [],
        Cast: [],
        Poster: '',
        OwnerId: '',
        CreatedDate: new Date(),
    });
    const [errors, setErrors] = useState({});
    const {user} = useUserAuth();

    // Upload Movie Poster

    const uploadImage = () => {
        const uniqueKey = "123" + Date.now();
        if (imageUpload == null) return;
        const imageRef = ref(storage, `posters/${imageUpload.name + uniqueKey}`)
        const uploadTask = uploadBytesResumable(imageRef, imageUpload);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDownloadURL(downloadURL);
                });
            }
        )
    }

    const setUploadHandler = (e) => {
        setImageUpload(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setValue(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmitNewMovie = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            e.preventDefault();
            const { ...userData } = value;
            Object.assign(userData, { Poster: downloadURL, OwnerId: user.uid });
            createMovie(userData);
            handleClose();
        }
        setValidated(true);
    };

    const isPositive = (e) => {
        let number = Number(e.target.value);

        setErrors(state => ({
            ...state,
            [e.target.name]: number < 0,
        }));
    }

    const maxLength = (e, limit) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: value[e.target.name].length > limit,
        }));
    }

    const ifSomeErrors = !Object.values(errors).some(x => x)


    return (
        <Container>
            <Modal
                className="modal-style"
                size="lg"
                animation="true"
                autoFocus="true"
                show={showAction}
                onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={handleSubmitNewMovie}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} md={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Movie Title</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Movie Name..."
                                        id="Title"
                                        name="Title"
                                        value={value.Title}
                                        onChange={changeHandler}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a Movie title.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Movie Year</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Enter Movie Year..."
                                        id="Year"
                                        name="Year"
                                        value={value.Year}
                                        onChange={changeHandler}
                                        onBlur={isPositive}
                                    />
                                     {errors.Year &&
                                        <p className="form-error">
                                            Movie Year should be a positive number!
                                        </p>
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a Movie year.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        rows={5}
                                        placeholder="Enter Description..."
                                        id="Description"
                                        name="Description"
                                        value={value.Description}
                                        onChange={changeHandler}
                                        onBlur={(e) => maxLength(e, 3000)}
                                    />
                                    {errors.Description &&
                                        <p className="form-error">
                                            First name should be max 3000 characters long!
                                        </p>
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        Please write a description.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Director</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Movie director..."
                                        id="Director"
                                        name="Director"
                                        value={value.Director}
                                        onChange={changeHandler}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a director.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Writers</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Movie writers..."
                                        id="Writers"
                                        name="Writers"
                                        value={value.Writers}
                                        onChange={changeHandler}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a writers.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cast</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        rows={2}
                                        placeholder="Enter Movie cast..."
                                        id="Cast"
                                        name="Cast"
                                        value={value.Cast}
                                        onChange={changeHandler}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a movie cast.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control
                                        required
                                        type="TagInput"
                                        placeholder="Enter Movie genre..."
                                        id="Genre"
                                        name="Genre"
                                        value={value.Genre}
                                        onChange={changeHandler}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a movie genre.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Upload poster</Form.Label>
                                    <Form.Control
                                        required
                                        type="file"
                                        id="Poster"
                                        onChange={setUploadHandler}
                                    />
                                    {imageUpload && 
                                        <p className="form-error">
                                            Don't forget to upload the poster!
                                        </p>
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        Please upload a poster.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <ProgressBar now={progress} label={`${progress}%`} />
                            </Col>
                            <Col>
                                {!downloadURL
                                    ?
                                    <Button
                                        className="float-bottom"
                                        style={{ background: "#2db4ea", border: 0 }}
                                        onClick={uploadImage}>
                                        Upload Image
                                    </Button> :
                                    <Image
                                        className="image_position"
                                        src={downloadURL} thumbnail />
                                }
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            disabled={!ifSomeErrors || (imageUpload && !downloadURL)}
                            type="submit"
                            style={{ background: "#2db4ea", border: 0 }}>
                            Add Movie
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    )
}