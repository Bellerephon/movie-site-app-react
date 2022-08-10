import { Row, Container, Pagination } from "react-bootstrap";
import { useMovieContext } from "../../contexts/movie-context";
import { Movie } from "./movie";

export const Favorites = () => {
    const { favorites } = useMovieContext();

    return (
        <Container className="image-grid">
            <Row>
                {favorites ?
                    favorites.map((movie) => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                        />
                    )) : <h2>No articles yet</h2>}
            </Row>
        </Container>
    );
}