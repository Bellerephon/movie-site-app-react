import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { AiFillFacebook } from "react-icons/ai";
// import { AiFillLinkedin } from "react-icons/ai";
// import { AiFillGithub } from "react-icons/ai";

export const Footer = () => {
    return (
        <footer className="py-3 bg-dark">
        <Container>
            <Row>
                <Col className="text-center py-3">
                    <Link to="/">
                        <img
                            alt=""
                            src="/logo.svg"
                            width="80"
                            height="80"
                            className="d-inline-block align-top"
                        />
                    </Link>
                </Col>
            </Row>
        </Container>
        </footer>
    )
}