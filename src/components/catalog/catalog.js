

import { Row, Container, Pagination } from "react-bootstrap";
import { CatalogItem } from "./catalog-item/catalog-item";
import { useContext } from "react";
import { MovieContext } from "../../contexts/movie-context";

export const Catalog = () => {
    const { movies } = useContext(MovieContext);

    return (
        <Container className="image-grid">
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