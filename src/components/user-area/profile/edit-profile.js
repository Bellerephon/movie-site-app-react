import { Container, Row, Col, Form, Button, Card, ProgressBar, Modal } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { editCollection, storage } from "../../../lib/init-firebase";
import { states } from './states';
import demoAvatar from '../../../asset/demo-avatar.png';
import './edit-profile.scss';

export const EditProfile = ({ handleShow, handleClose, userData }) => {
    const [progress, setProgress] = useState(0);
    const [imageUpload, setImageUpload] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');
    const [uploadImageRef, setUploadImageRef] = useState('');
    const [errors, setErrors] = useState({});
    let imageRef = '';
    const [value, setValue] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        userName: userData.userName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zip: userData.zip,
        aboutMe: userData.aboutMe,
        photoURL: userData.photoURL
    });

    const changeHandler = (e) => {
        setValue(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditProfile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (downloadURL !== '') {
            Object.assign(value, { photoURL: downloadURL });
        }
        editCollection(userData.id, "users", value);
        handleClose();
    }

    const setUploadHandler = (e) => {
        setImageUpload(e.target.files[0]);
    }

    const uploadAvatar = () => {
        const uniqueKey = "123" + Date.now();
        if (imageUpload == null) return;
        imageRef = ref(storage, `avatars/${imageUpload.name + uniqueKey}`)
        const uploadTask = uploadBytesResumable(imageRef, imageUpload);
        setUploadImageRef(imageRef);
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
                size="lg"
                show={handleShow}
                onHide={handleClose}>
                <Form onSubmit={handleEditProfile}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Avatar</Form.Label>
                                    <Card.Img
                                        variant="top"
                                        src={(downloadURL || userData.photoURL) || demoAvatar}
                                        thumbnail="true"
                                    // src={userData.photoURL ? userData.photoURL : downloadURL}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="file"
                                        id="uploadAvatar"
                                        name="uploadAvatar"
                                        onChange={setUploadHandler}
                                    />
                                </Form.Group>
                                <Button
                                    className="mb-3"
                                    style={{ background: "#2db4ea", border: 0, width: "-webkit-fill-available" }}
                                    onClick={uploadAvatar}>
                                    Upload Image
                                </Button>
                                {progress !== 0
                                    ? <ProgressBar className="mb-2" now={progress} label={`${progress}%`} />
                                    : ''
                                }
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={value.firstName}
                                        onChange={changeHandler}
                                        onBlur={(e) => maxLength(e, 20)}
                                    />
                                     {errors.firstName &&
                                        <p className="form-error">
                                            First name should be max 20 characters long!
                                        </p>
                                    }
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={value.lastName}
                                        onChange={changeHandler}
                                        onBlur={(e) => maxLength(e, 25)}
                                    />
                                    {errors.lastName &&
                                        <p className="form-error">
                                            Last name should be max 25 characters long!
                                        </p>
                                    }
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="userName"
                                        name="userName"
                                        value={value.userName}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={value.phoneNumber}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={value.address}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>About Me</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        id="aboutMe"
                                        name="aboutMe"
                                        value={value.aboutMe}
                                        onChange={changeHandler}
                                        onBlur={(e) => maxLength(e, 1000)}
                                        />
                                        {errors.aboutMe &&
                                            <p className="form-error">
                                                Last name should be max 1000 characters long!
                                            </p>
                                        }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={value.city}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>State</Form.Label>
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
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="zip"
                                        name="zip"
                                        value={value.zip}
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
                            disabled={!ifSomeErrors}
                            type="submit"
                            style={{ background: "#2db4ea", border: 0 }}>
                            Edit Profile
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    )
}