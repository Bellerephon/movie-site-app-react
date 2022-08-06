import * as service from "../../../lib/init-firebase";
import emptyImage from "../../../asset/no-poster.png";
import './movie-details.scss';
import { Container, Row, Col, Image } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

export const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {
        service.getCollectionDetails(movieId, "movies")
            .then(res => setMovie(res));
    }, [movieId]);

    return (
        <Container>
            {movie &&
                <Row className="detail-container">
                    <Col md={4}>
                        <div className="detail-image">
                            <Image src={movie.Poster} alt={emptyImage} thumbnail />
                        </div>
                    </Col>
                    <Col md={8}>
                        <div>
                            <div className="detail-title">
                                <h1>{movie.Title}</h1>
                            </div>
                            <div className="detail-description">
                                <p>{movie.Year}</p>
                            </div>
                        </div>
                        <div>
                            <p>
                                <b>Director:</b> <span>{movie.Director}</span>
                            </p>
                            <p>
                                <b>Writers:</b> <span>{movie.Writers}</span>
                            </p>
                            <p>
                                <b>Genre:</b> {movie.Genre}
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>Description:</b> {movie.Description}
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>Cast:</b> {movie.Cast}
                            </p>
                        </div>
                    </Col>
                </Row>
            }
        </Container>
    );
}