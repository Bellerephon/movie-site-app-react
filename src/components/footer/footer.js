import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './footer.scss';

export const Footer = () => {
    return (
        <footer className="py-3 style-footer">
            <Container>
                <Row>
                    <Col className="footer-text"><span>&copy;</span> Movie City 2022</Col>
                    <Col xs={6}><Link to="/">
                        <img
                            alt=""
                            src="/logo.svg"
                            width="80"
                            height="80"
                            className="d-inline-block align-top"
                        />
                    </Link></Col>
                    <Col className="footer-text"><div>Made with ❤️ by Bellerephon</div></Col>
                </Row>
            </Container>
        </footer>
    )
}