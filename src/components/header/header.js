import { Container, Nav, Navbar, NavDropdown, Modal, Button, NavLink } from 'react-bootstrap';
import { SignUp } from '../user-area/sign-up';
import { Login } from '../user-area/log-in';
import { Logout } from '../user-area/log-out';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../contexts/user-auth-context';

import './header.scss';

export const Header = () => {
  const [signUp, setSignUp] = useState();
  const [logIn, setLogIn] = useState();
  const [logOut, setLogOut] = useState();
  const { user } = useUserAuth();

  const handleClose = () => {
    setSignUp(false);
    setLogIn(false);
    setLogOut(false);
  }

  const handleSignUp = () => {
    setSignUp(true)
  }
  const handleLogIn = () => {
    setLogIn(true)
  }
  const handleLogOut = () => {
    setLogOut(true)
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className='style-nav'  >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src="/logo.svg"
              width="120"
              height="120"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav nav-link"/>
          <Navbar.Collapse id="responsive-navbar-nav nav-link">
            <Nav className="me-auto" variant="pills">
              <NavLink as={Link} to="/catalog">All Movies</NavLink>
              <NavLink as={Link} to="/Favorites">Favorites</NavLink>
              <NavLink as={Link} to="/top-rated">Top Rated</NavLink>
              <NavLink as={Link} to="/about">About</NavLink>
            </Nav>
            <Nav>
              {user && <NavDropdown title={user ? user.email : "Profile"} id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/movie-list">My Movies</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={user ? `/profile/${user.uid}` : `/profile/${user.uid}`}>
                  My Profile
                </NavDropdown.Item>
              </NavDropdown>}
              {user ? <Button style={{ background: "#2db4ea", border: 0 }} onClick={handleLogOut}>
                Log Out
              </Button> : <Button style={{ background: "#2db4ea", border: 0 }} onClick={handleLogIn}>
                Log In
              </Button>}
              <Modal
                size="lg"
                show={signUp}
                onHide={handleClose}>
                <Modal.Body>
                  <Modal.Header closeButton>
                    <Modal.Title>SignUp</Modal.Title>
                  </Modal.Header>
                  <SignUp handleClose={handleClose} />
                </Modal.Body>
              </Modal>
              <Modal
                size="lg"
                show={logIn}
                onHide={handleClose}>
                <Modal.Body>
                  <Modal.Header closeButton>
                    <Modal.Title>LogIn</Modal.Title>
                  </Modal.Header>
                  <Login
                    handleClose={handleClose}
                    handleSignUp={handleSignUp} />
                </Modal.Body>
              </Modal>
              <Modal
                size="lg"
                show={logOut}
                onHide={handleClose}>
                <Modal.Body>
                  <Modal.Header closeButton>
                    <Modal.Title style={{color: "#000000"}}>Logout</Modal.Title>
                  </Modal.Header>
                  <Logout handleClose={handleClose} />
                </Modal.Body>
              </Modal>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <NavDropdown.Divider />
      </Navbar>
      <hr />
    </>
  );
}
