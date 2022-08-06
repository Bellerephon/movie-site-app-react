

import { Row, Container, Pagination } from "react-bootstrap";
import { Movie } from "./movie";
import { useMovieContext } from "../../contexts/movie-context";
import { Search } from "./search";
import { useState } from "react";

const Catalog = () => {
    const [ search, setSearch ] = useState('');
    const { movies } = useMovieContext();

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
        console.log(search);

        setSearch('')
    }

    return (

        <Container className="image-grid">
            <Search 
                search={search}
                onSearchChange={onSearchChange} 
                onSearchSubmit={onSearchSubmit}
            />
            <Row>
                {movies ?
                    movies.map((movie) => (
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
    )
}

export default Catalog;