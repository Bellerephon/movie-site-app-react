import { Container, Modal, Col, Row, Image, Form, Button } from "react-bootstrap";
import emptyImage from '../../../asset/no-poster.png'

export const ShowMovie = ({
    movie,
    showAction,
    handleClose,
}) => {

    return (
        <Container>
            <Modal
                size="lg"
                animation="true"
                autoFocus="true"
                show={showAction}
                onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Movie Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="detail-container">
                            <Col md={5}>
                                <div className="detail-image">
                                    <Image src={movie.Poster || emptyImage} thumbnail />
                                </div>
                            </Col>
                            <Col md={6}>
                                <Form.Label style={{ fontSize: '3em', fontFamily: 'monospace' }}>{movie.Title}</Form.Label>
                                <div>
                                    <p><b>Year:</b> {movie.Year}</p>
                                    <p><b>Genre:</b> {movie.Genre}</p>
                                </div>
                                <div>
                                    <p>
                                        <b>Director:</b> <span>{movie.Director}</span>
                                    </p>
                                    <p>
                                        <b>Writers:</b> <span>{movie.Writers}</span>
                                    </p>
                                    <p>
                                        <b>Cast:</b> <span>{movie.Cast}</span>
                                    </p>
                                    <p>
                                        <b>Genre:</b> {movie.Genre}
                                    </p>
                                </div>
                                <p>{movie.Description}</p>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}