import { Container, Row, Col, PopoverHeader, Form, Button, Card, ProgressBar } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/init-firebase";
import { useState, useEffect } from "react";
import { editCollection, getCollectionDetails } from "../../lib/init-firebase";
import { states } from './states';
import { useUserAuth } from '../../contexts/user-auth-context';

export const Profile = () => {
    const [newValue, setNewValue] = useState({});
    const [progress, setProgress] = useState(0);
    const [imageUpload, setImageUpload] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');
    const [userData, setUserData] = useState(null);
    const { user } = useUserAuth();

    useEffect(() => {
        const userId = user.uid;
        getCollectionDetails(userId, "users")
            .then(res => setUserData(res));
    }, [user.uid]);


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

    const deletevatar = () => {
        console.log('Delete');
    }

    const handleEditProfile = (e) => {
        e.preventDefault();
        if (downloadURL !== '') {
            Object.assign(newValue, { photoURL: downloadURL });
        }
        try {
            editCollection(userData.id, "users", newValue);
            alert("success")
        } catch (err) {
            alert("Not Sucssee")
        }
    }

    const changeHandler = (e) => {
        setNewValue(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const setUploadHandler = (e) => {
        setImageUpload(e.target.files[0]);
    }

    return (
        <Container >

            <PopoverHeader><strong>Edit Profile</strong></PopoverHeader>
            {userData &&
                <Form onSubmit={handleEditProfile}>
                    <Row>
                        <Col xs={12} md={8} className="p-3">

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={userData.firstName} 
                                        name="firstName"
                                        id="id"
                                        value={newValue.firstName}
                                        onChange={changeHandler} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={userData.lastName}
                                        name="lastName"
                                        value={newValue.lastName}
                                        onChange={changeHandler} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        defaultValue={userData.email}
                                        id="email"
                                        name="email"
                                        value={newValue.email}
                                        onChange={changeHandler} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        defaultValue={userData.phoneNumber}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={newValue.phoneNumber}
                                        onChange={changeHandler} />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={userData.address}
                                    id="address"
                                    name="address"
                                    value={newValue.address}
                                    onChange={changeHandler} />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        defaultValue={userData.city} 
                                        id="city"
                                        name="city"
                                        onChange={changeHandler}
                                        />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Select
                                        onChange={changeHandler}
                                        name="state"
                                        value={newValue.state}
                                        defaultValue="Sofia City">
                                        {
                                            states.map((state, index) => {
                                                return (<option key={index} value={state.name}>{state.name}</option>)
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        type="number"
                                        defaultValue={userData.zip}
                                        name="state"
                                        value={newValue.zip}
                                        onChange={changeHandler} />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>About me</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    defaultValue={userData.aboutMe}
                                    id="aboutMe"
                                    name="aboutMe"
                                    onChange={changeHandler} 
                                />
                            </Form.Group>

                            <Button
                                style={{ background: "#2db4ea", border: 0 }}
                                type="submit">
                                Update Profile
                            </Button>
                        </Col>

                        <Col xs={6} md={4} className="p-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Avatar</Form.Label>
                                <Card style={{ width: '250px', height: '250px' }}>
                                    <Card.Img
                                        variant="top"
                                        src={userData.photoURL ? userData.photoURL : downloadURL}
                                    />
                                    <Card.Body>
                                        <Form.Control
                                            type="file"
                                            id="uploadAvatar"
                                            name="uploadAvatar"
                                            onChange={setUploadHandler}
                                        >
                                        </Form.Control>
                                        <Button
                                            className="float-bottom"
                                            style={{ background: "#2db4ea", border: 0 }}
                                            onClick={uploadAvatar}>
                                            Upload Image
                                        </Button>
                                        <Button
                                            className="float-bottom"
                                            style={{ background: "#ff3333", border: 0 }}
                                            onClick={deletevatar}>
                                            Delete Image
                                        </Button>
                                        {progress !== 0 
                                        ? <ProgressBar className="mb-3" now={progress} label={`${progress}%`} /> 
                                        : ''
                                        }
                                    </Card.Body>
                                </Card>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            }
        </Container>
    );
}