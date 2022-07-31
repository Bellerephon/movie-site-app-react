import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../contexts/user-auth-context";

export const Login = ({
  handleSignUp,
  handleClose
}) => {
  // const [signUp, setSignUp] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      handleClose();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const showSignUp = () => {
    handleClose(false);
    handleSignUp(true);
  }

  return (
    <>
      <div className="p-4 box">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Label>Email address</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter Email address"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button style={{ background: "#2db4ea", border: 0 }} type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/" onClick={showSignUp}>Sign up</Link>
      </div>
    </>
  );
};