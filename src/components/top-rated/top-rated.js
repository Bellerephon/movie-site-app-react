import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { TopRatePagination } from "./top-rate-pagination";
import { TopRatedItems } from "./top-rated-items";
import API_KEY from '../../lib/imdb-api';

export const TopRated = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${currentPage}`
    
    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    setMaxPages(json.total_pages)
                    setData(json.results);
                    setLoading(false);
                });
        }, 500);
    }, [url]);

    console.log(data);

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage-1);
        }
    }

    const nextPage = () => {
        if (currentPage < maxPages){
        setCurrentPage(currentPage+1)   
        console.log(currentPage);
        }
    }

    const firstPage = () => {
        setCurrentPage(1)
    }

    const lastPage = () => {
        setCurrentPage(maxPages)
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // console.log(topMovies.total_pages);

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
            <TopRatePagination 
                prevPage = {prevPage}
                nextPage = {nextPage}
                currentPage = {currentPage}
            />
        </Container>
    );
}


