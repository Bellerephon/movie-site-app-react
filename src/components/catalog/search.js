import { Container, Form, Button } from "react-bootstrap";

export const Search = ({
    search,
    onSearchChange,
    onSearchSubmit,
}) => {

    return(
        <Container className="justify-content-end">
                <Form onSubmit={onSearchSubmit} className="d-flex" >
                    <Form.Control
                        type="search"
                        placeholder='Type to search...'
                        className="me-2"
                        aria-label="Search"
                        onChange={onSearchChange} 
                        value={search}
                    />
                    <Button 
                        type="submit"
                        style={{ background: "#2db4ea", border: 0 }}>Search
                    </Button>
                </Form>
            </Container>
    )
}