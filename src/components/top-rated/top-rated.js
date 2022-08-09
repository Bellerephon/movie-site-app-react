import { useEffect, useState } from "react";
import { Container, Table, Pagination } from "react-bootstrap";
import API_KEY from '../../lib/imdb-api';
import { TopRatedItems } from "./top-rated-items";

export const TopRated = () => {
    // const [boxOfficeWeeklyMovies, setBoxOfficeWeeklyMovies] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    setData(json.results);
                    setLoading(false);
                });
        }, 500);
    }, [url]);

    console.log(data);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Vote Average</th>
                        <th>Vote Count</th>
                        <th>Overview</th>
                    </tr>
                </thead>
                <tbody style={{
                    verticalAlign: 'middle',
                    textAlign: 'center',
                }}>
                    {data.map((movie, index) =>
                        <tr key={movie.id}>
                            <TopRatedItems
                                key={index}
                                topMovies={movie}
                            />
                        </tr>
                    )}
                </tbody>
            </Table>
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


