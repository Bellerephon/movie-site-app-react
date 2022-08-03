import { Container, Row, Col, PopoverHeader, Form, Button, Card, Modal } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/init-firebase";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { editCollection, getCollectionDetails } from "../../lib/init-firebase";
import { states } from './states';
import demoAvatar from '../../asset/demo-avatar.png';
import { EditProfile } from "./edit-profile";

const Profile = () => {
    const { userID } = useParams();
    const [userData, setUserData] = useState(null);
    const [editProfile, setEditProfile] = useState();

    useEffect(() => {
        getCollectionDetails(userID, "users")
            .then(profile => setUserData(profile));
    }, [userID]);
    
    console.log(userData);

    const handleShow = () => {
        setEditProfile(true)
    }

    const handleClose = () => {
        setEditProfile(false);
    }

    return (
        <Container >
            {editProfile == true &&
                <Modal
                    size="lg"
                    show={handleShow}
                    onHide={handleClose}>
                    <EditProfile handleClose={handleClose} userData={userData} />
                </Modal>
            }
            <PopoverHeader><strong><h2>User Profile</h2></strong></PopoverHeader>
            {userData &&
                <Form>
                    <Row>
                        <Col xs={10} md={9} className="p-3">
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={userData.firstName}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={userData.lastName}
                                        readOnly
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={userData.email}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={userData.phoneNumber}
                                        readOnly
                                    />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={userData.address}
                                    readOnly
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={userData.city}
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={userData.state}
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={userData.zip}
                                        readOnly
                                    />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>About me</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={userData.aboutMe}
                                    readOnly
                                />
                            </Form.Group>
                            <Button
                                style={{ background: "#2db4ea", border: 0 }}
                                onClick={() => handleShow()}
                            >
                                Edit Profile
                            </Button>

                        </Col>

                        <Col xs={6} md={2} className="p-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Avatar</Form.Label>
                                <Card style={{ width: '275px', height: '275px' }}>
                                    <Card.Img
                                        variant="top"
                                        src={(userData.photoURL) || demoAvatar}
                                    />
                                </Card>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            }
        </Container>
    );
}

export default Profile;