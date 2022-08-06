import { Row, Container, Pagination } from "react-bootstrap";
import { useMovieContext } from "../../contexts/movie-context";
import { Search } from "./search";
import { Movie } from "./movie";

export const Favorites = () => {
    const { favorites } = useMovieContext();

    return (
        <Container className="image-grid">
            <Search />
            <Row>
                {favorites ?
                    favorites.map((movie) => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                        />
                    )) : <h2>No articles yet</h2>}
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
    );
}