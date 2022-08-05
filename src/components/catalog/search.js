import { Container, Form, Button } from "react-bootstrap";

export const Search = () => {
    return(
        <Container className="justify-content-end">
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button style={{ background: "#2db4ea", border: 0 }}>Search</Button>
                </Form>
            </Container>
    )
}