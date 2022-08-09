import { Container, Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
import './search.scss';

export const Search = ({
    search,
    onSearchChange,
    onSearchSubmit,
    handleSelect,
}) => {

    return (
        <Container className="justify-content-end search input">
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
                    variant="secondary"
                    className="search-button"
                    type="submit">Search
                </Button>
                <DropdownButton
                    variant="secondary"
                    title="Search criteria"
                    id="dropdown-menu"
                    onSelect={handleSelect}
                    className="dropdown-style"
                >
                    <Dropdown.Item eventKey="Title">Title</Dropdown.Item>
                    <Dropdown.Item eventKey="Director">Director</Dropdown.Item>
                    <Dropdown.Item eventKey="Year">Year</Dropdown.Item>
                </DropdownButton>
            </Form>
        </Container>
    )
}