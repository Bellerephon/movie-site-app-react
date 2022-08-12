import * as service from "../../../lib/init-firebase";
import emptyImage from "../../../asset/no-poster.png";
import { useMovieContext } from '../../../contexts/movie-context';
import { Container, Row, Col, Image, Tabs, Tab } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { IoMdHeartEmpty, IoIosHeart } from 'react-icons/io';
import './movie-details.scss';

export const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();
    const { addToFavorites, isFav } = useMovieContext();

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

                        <Tabs
                            defaultActiveKey="details"
                            id="justify-tab-example"
                            justify
                        >
                            <Tab eventKey="details" title="Details">
                                <div className="movie-details line-space">
                                    <h6 className="title-style">{movie.Title}</h6>
                                    <hr /><br />
                                    <h6>{movie.Year}</h6><br />
                                    <h6><b>Director:</b> {movie.Director}</h6><br />
                                    <h6><b>Writers:</b> {movie.Writers}</h6><br />
                                    <h6><b>Genre:</b> {movie.Genre}</h6><br />
                                    <h6><b>Cast:</b> {movie.Cast}</h6><br />
                                </div>
                                {isFav(movie.id) ? (
                                    <>
                                        <div>Add to favorites</div>
                                        <IoMdHeartEmpty
                                            cursor= "pointer"
                                            name="favorite"
                                            tooltip="Favorite"
                                            hover="Favorite"
                                            size={25}
                                            onClick={() => addToFavorites(movie)} />
                                    </>
                                ) : (
                                    <>
                                        <div>Remove from favorites</div>
                                        <IoIosHeart
                                            cursor= "pointer"
                                            name="favorite"
                                            tooltip="Favorite"
                                            hover="Favorite"
                                            size={25}
                                            color="red"
                                            onClick={() => addToFavorites(movie)} />
                                    </>
                                )}
                            </Tab>
                            <Tab eventKey="description" title="Description">
                                <div className="movie-details">
                                    {movie.Description}
                                </div>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            }
        </Container>
    );
}