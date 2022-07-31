import { Container, Modal, Button, Form } from "react-bootstrap"
import { deleteMovie } from "../../../lib/init-firebase";

export const DeleteMovie = ({
    movie,
    showAction,
    handleClose,
}) => {
    const handleDeleteMovie = (e) => {
        e.preventDefault();
        deleteMovie(movie.id);
        handleClose();
    }

    return (
        <Container>
            <Modal 
                size="lg"
                animation="true"
                autoFocus="true"
                show={showAction}
                onHide={handleClose}>
                <Form onSubmit={handleDeleteMovie}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete this records ? This process cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit"
                            style={{ background: "#2db4ea", border: 0 }}>
                        Delete
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    )
}