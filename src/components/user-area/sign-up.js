import { Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserAuth } from '../../contexts/user-auth-context';
import { auth, createUserInFirebase } from '../../lib/init-firebase';

export const SignUp = ({
    handleClose
}) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const {signUp } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            return setError("Passwords do not match !")
        }

        try {
            setLoading(true)
            await signUp(email, password);
            const userData = ({
                email: auth.currentUser.email,
                lastLogin: auth.currentUser.metadata.lastLoginAt,
                phoneNumber: '',
                firstName: '',
                lastName: '',
                userName: '',
                address: '',
                city: '',
                state: '',
                zip: null,
                aboutMe: '',
                photoURL: '',
            })
            createUserInFirebase(auth.currentUser.uid, userData);
            handleClose();
            navigate("/");
        } catch (err) {
            setError(err.message);
        }

        setLoading(false)
    };

    return (
        <>
            <div className="p-4 box">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-3"
                        id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email address..."
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="on"
                            required />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password..."
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="on"
                            required />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        id="password">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm your password..."
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="on"
                            required />
                    </Form.Group>

                    <Button
                        disabled={loading}
                        type="submit"
                        style={{ background: "#2db4ea", border: 0 }}
                        className="w-100" >
                        Sign Up
                    </Button>
                </Form>
            </div>
        </>
    );
}
