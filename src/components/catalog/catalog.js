

import { Row, Container, Pagination, Form, Button } from "react-bootstrap";
import { CatalogItem } from "./catalog-item/catalog-item";
import { useContext } from "react";
import { MovieContext } from "../../contexts/movie-context";

const Catalog = () => {
    const { movies } = useContext(MovieContext);

    return (

        <Container className="image-grid">
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
            <Row>
                {movies ?
                    movies.map((movie) => (
                        <CatalogItem
                            key={movie.id}
                            id={movie.id}
                            Title={movie.Title}
                            Poster={movie.Poster}
                            Year={movie.Year}
                            Genre={movie.Genre}
                            Cast={movie.Cast}
                            Description={movie.Description}
                            Director={movie.Director}
                            Writers={movie.Writers}
                        />
                    )) : <div>No articles yet</div>}
            </Row>
            <Pagination className="py-4">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </Container>
    )
}

export default Catalog;