import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../contexts/user-auth-context";

export const Login = ({
  handleSignUp,
  handleClose
}) => {
  const [values, setValues ] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { email, password } = values;
    try {
      await logIn(email, password);
      handleClose();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

    const changeHandler = (e) => {
      setValues(state => ({
          ...state,
          [e.target.name]: e.target.value
      }));
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
          <Form.Group className="mb-3">
            <Form.Control
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email address"
              onChange={changeHandler}
              autoComplete="on"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={changeHandler}
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