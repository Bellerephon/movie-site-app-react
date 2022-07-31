import { Form, Modal, Button } from 'react-bootstrap';
import { useUserAuth } from '../../contexts/user-auth-context';
import { useNavigate } from 'react-router-dom';

export const Logout = ({ handleClose }) => {
    const { logOut } = useUserAuth();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await logOut();
            handleClose();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Form onSubmit={handleLogout}>
            <Modal.Body>Are you sure you want to log out ?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit"
                    style={{ background: "#2db4ea", border: 0 }}>
                    Yes
                </Button>
            </Modal.Footer>
        </Form>
    );
}
