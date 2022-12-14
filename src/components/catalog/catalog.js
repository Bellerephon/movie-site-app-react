

import { Row, Container, Pagination, Alert } from "react-bootstrap";
import { Movie } from "./movie";
import { useMovieContext } from "../../contexts/movie-context";
import { getSearchMovies } from "../../lib/init-firebase";
import { Search } from "./search";
import { useState } from "react";

const Catalog = () => {
    const [search, setSearch] = useState('');
    const { movies } = useMovieContext();
    const [searchMovies, setSearchMovies] = useState(null);
    const [criteria, setCriteria] = useState('Criteria');
    const [error, setError] = useState(false)
    const handleSelect = (e) => {
        setCriteria(e)
    }

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
        if (search !== "" && criteria !== "Criteria") {
            getSearchMovies("movies", search, criteria)
                .then(res => setSearchMovies(res));
            console.log(searchMovies);
            setError(false)
            setSearch('')
        }
        else {
            setError(true)
        }
    }

    return (

        <Container className="image-grid">
            {error &&
                <Alert className="alert-style" variant="warning">
                    Please select a search criteria and keyword !
                </Alert>
            }
            <Search
                search={search}
                onSearchChange={onSearchChange}
                onSearchSubmit={onSearchSubmit}
                handleSelect={handleSelect}
                criteria={criteria}
            />
            {searchMovies ?
                <Row className="py-5">
                    {searchMovies.map((movie) => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </Row>
                :
                <Row className="py-5">
                    {
                        movies.map((movie) => (
                            <Movie
                                key={movie.id}
                                movie={movie}
                            />
                        ))}
                </Row>
            }
        </Container>
    )
}

export default Catalog;