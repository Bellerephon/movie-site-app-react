

import { Row, Container, Pagination } from "react-bootstrap";
import { Movie } from "./movie";
import { useMovieContext } from "../../contexts/movie-context";
import { getSearchMovies } from "../../lib/init-firebase";
import { Search } from "./search";
import { useState } from "react";

const Catalog = () => {
    const [ search, setSearch ] = useState('');
    const { movies } = useMovieContext();
    const [ searchMovies, setSearchMovies ] = useState();

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
        if (search !== "") {
            getSearchMovies("movies", search)
                .then(res => setSearchMovies(res));
        }
        setSearch('')
    }

    return (

        <Container className="image-grid">
            <Search
                search={search}
                onSearchChange={onSearchChange}
                onSearchSubmit={onSearchSubmit}
            />
            {searchMovies ? 
                <Row>
                    {searchMovies.map((movie) => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </Row>
            : movies ?
                <Row>
                    {
                        movies.map((movie) => (
                            <Movie
                                key={movie.id}
                                movie={movie}
                            />
                        ))}
                </Row>
             : <h2>No articles yet</h2>
            }                  
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