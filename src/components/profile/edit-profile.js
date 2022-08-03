import { Container, Row, Col, Form, Button, Card, ProgressBar, Modal } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/init-firebase";
import { useState, useEffect } from "react";
import { editCollection, getCollectionDetails } from "../../lib/init-firebase";
import { states } from './states';
import demoAvatar from '../../asset/demo-avatar.png';

export const EditProfile = ({ handleClose, userData }) => {
    const [progress, setProgress] = useState(0);
    const [imageUpload, setImageUpload] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');

    const [value, setValue] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zip: userData.zip,
        aboutMe: userData.aboutMe,
    });

    const changeHandler = (e) => {
        setValue(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditProfile = (e) => {
        e.preventDefault();
        if (downloadURL !== '') {
            Object.assign(value, { photoURL: downloadURL });
        }
        try {
            editCollection(userData.id, "users", value);
            alert("success")
        } catch (err) {
            alert("Not Sucssee")
        }
    }

    const setUploadHandler = (e) => {
        setImageUpload(e.target.files[0]);
    }

    const uploadAvatar = () => {
        const uniqueKey = "123" + Date.now();
        if (imageUpload == null) return;
        const imageRef = ref(storage, `avatars/${imageUpload.name + uniqueKey}`)
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


    return (
        <Container>
            <Form onSubmit={handleEditProfile}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="detail-container">
                        <Col md={5}>
                        <Form.Label>Avatar</Form.Label>
                        <Card style={{ width: '275px', height: '275px' }}>
                                <Card.Img
                                    variant="top"
                                // src={(userData.photoURL || downloadURL) || demoAvatar}
                                />
                                <Card.Body>
                                    <Form.Control
                                        type="file"
                                        id="uploadAvatar"
                                        name="uploadAvatar"
                                    >
                                    </Form.Control>
                                    <Button
                                        className="float-bottom"
                                        style={{ background: "#2db4ea", border: 0, width: "-webkit-fill-available" }}
                                        onClick={uploadAvatar}>
                                        Upload Image
                                    </Button>
                                    {progress !== 0
                                        ? <ProgressBar className="mb-3" now={progress} label={`${progress}%`} />
                                        : ''
                                    }
                                    <Button
                                        className="float-bottom"
                                        style={{ background: "#ff3333", border: 0, width: "-webkit-fill-available" }}
                                    // onClick={deletevatar}
                                    >
                                        Delete Image
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={7}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={value.firstName}
                                    onChange={changeHandler}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={value.lastName}
                                    onChange={changeHandler}
                                />
                            </Form.Group>
                            

                            <Form.Select
                                onChange={changeHandler}
                                name="state"
                                id="state"
                                value={value.state}
                            // defaultValue="Sofia City"
                            >
                                {
                                    states.map((state, index) => {
                                        return (<option key={index} value={state.name}>{state.name}</option>)
                                    })
                                }
                            </Form.Select>
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
                        Edit Profile
                    </Button>
                </Modal.Footer>
            </Form>
        </Container>
    )
}