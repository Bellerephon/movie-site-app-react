import { Container, Modal, Form, Row, Col, Image, Button, ProgressBar } from "react-bootstrap";
import { storage } from "../../../lib/init-firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { editCollection } from "../../../lib/init-firebase";


export const EditMovie = ({
    movie,
    showAction,
    handleClose,
}) => {
    
    const [value, setValue] = useState({
        Title: movie.Title,
        Year: movie.Year,
        Genre: movie.Genre,
        Director: movie.Director,
        Writers: movie.Writers,
        Description: movie.Description,
    });
    const [progress, setProgress] = useState(0);
    const [imageUpload, setImageUpload] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');
    const [errors, setErrors] = useState({});
    
    const handleEditMovie = (e) => {
        e.preventDefault();
        if(downloadURL !== ''){
            Object.assign(value, { Poster: downloadURL });
        }
        editCollection(movie.id, "movies", value);
        handleClose();
    }

    const changeHandler = (e) => {
        setValue(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const setUploadHandler = (e) => {
        setImageUpload(e.target.files[0]);
    }

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

    const isPositive = (e) => {
        let number = Number(e.target.value);

        setErrors(state => ({
            ...state,
            [e.target.name]: number < 0,
        }));
    }

    return (
        <Container>
            <Modal
                size="lg"
                animation="true"
                autoFocus="true"
                show={showAction}
                onHide={handleClose}>
                <Form onSubmit={handleEditMovie}>
                    <Modal.Header closeButton>
                        <Modal.Title>Movie Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="detail-container">
                            <Col md={5}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{!downloadURL
                                        ?
                                        <><Image src={movie.Poster} thumbnail />
                                        <Button
                                            className="float-bottom"
                                            style={{ background: "#2db4ea", border: 0 }}
                                            onClick={uploadImage}>
                                            Upload Image
                                        </Button></> :
                                        <Image
                                            src={downloadURL} 
                                            thumbnail/>
                                    }</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="Poster"
                                        onChange={setUploadHandler}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please upload a poster.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <ProgressBar now={progress} label={`${progress}%`} />
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Movie Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        // defaultValue={movie.Title}
                                        id="Title"
                                        name="Title"
                                        value={value.Title}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Movie Year</Form.Label>
                                    <Form.Control
                                        type="number"
                                        // defaultValue={movie.Year}
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
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        // defaultValue={movie.Genre}
                                        id="Genre"
                                        name="Genre"
                                        value={value.Genre}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Director</Form.Label>
                                    <Form.Control
                                        type="text"
                                        // defaultValue={movie.Director}
                                        id="Director"
                                        name="Director"
                                        value={value.Director}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Writers</Form.Label>
                                    <Form.Control
                                        type="text"
                                        // defaultValue={movie.Writers}
                                        id="Writers"
                                        name="Writers"
                                        value={value.Writers}
                                        onChange={changeHandler}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a writers.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        // defaultValue={movie.Description}
                                        id="Description"
                                        name="Description"
                                        value={value.Description}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            style={{ background: "#2db4ea", border: 0 }}>
                            Edit Movie
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    )
}