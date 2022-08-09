import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import API_KEY from '../../lib/imdb-api';
import { Movie } from "../catalog/movie";

export const BoxOffice = () => {
    // const [boxOfficeWeeklyMovies, setBoxOfficeWeeklyMovies] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(API_KEY);
    const url = `https://imdb-api.com/en/API/BoxOffice/${API_KEY}`

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
            {/* {
                        data.map((item) => (
                            <div className="col-md-3">
                                <Movie/>
                            </div>
                        ))
                    } */}
        </Container>
    );
} 


