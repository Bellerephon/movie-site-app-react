import { Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserAuth } from '../../contexts/user-auth-context';
import { auth, createUserInFirebase } from '../../lib/init-firebase';

export const SignUp = ({
    handleClose
}) => {
    const [error, setError] = useState("");
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState(false)
    const { signUp } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");

        const { email, password, confirmPassword } = values;

        if (password !== confirmPassword) {
            return setError("Passwords do not match !")
        }

        try {
            setLoading(true)
            await signUp(email, password);
            const userData = ({
                email: auth.currentUser.email,
                lastLogin: auth.currentUser.metadata.lastLoginAt,
                phoneNumber: null,
                firstName: null,
                lastName: null,
                userName: null,
                address: null,
                city: null,
                state: null,
                zip: null,
                aboutMe: null,
                photoURL: null,
            })
            createUserInFirebase(auth.currentUser.uid, userData);
            handleClose();
            navigate("/");
        } catch (err) {
            setError(err.message);
        }

        setLoading(false)
    };

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const passCheck = (e) => {
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        

        if (!strongRegex.test(e.target.value)) {
            return setError("Your password is not secure enough!")
        } else {
            return setError("")
        }
    }

    return (
        <>
            <div className="p-4 box">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-3"
                    >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address..."
                            onChange={changeHandler}
                            autoComplete="on"
                            value={values.email}
                            required />
                    </Form.Group>
                    <Form.Group
                        className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password..."
                            onChange={changeHandler}
                            onBlur={passCheck}
                            autoComplete="on"
                            value={values.password}
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password..."
                            onChange={changeHandler}
                            autoComplete="on"
                            value={values.confirmPassword}
                            required />
                    </Form.Group>
                    {error === "Your password is not secure enough!" ? 
                    <div><ul style={{listStyle: "none"}}>
                    <li>The password must contain at least 1 lowercase alphabetical character</li>
                    <li>The password must contain at least 1 uppercase alphabetical character</li>
                    <li>The password must contain at least 1 numeric character</li>
                    <li>The password must contain at least one special character</li>
                    <li>The password must be eight characters or longer</li>
                </ul></div> : "" }
                    <Button 
                        disabled={loading || error}
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