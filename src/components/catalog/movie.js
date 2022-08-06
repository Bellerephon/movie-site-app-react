import { Col, Card } from "react-bootstrap";
import emptyImage from '../../asset/no-poster.png'
import { Link } from "react-router-dom";
import './movie.scss';
import { IoMdHeartEmpty, IoIosHeart } from 'react-icons/io';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useMovieContext } from "../../contexts/movie-context";

export const Movie = ({ movie }) => {

    const { addToFavorites, isFav } = useMovieContext();

    return (
        <Col sm={12} md={6} lg={3}>
            <Card className="card image-container justify-content-start m-3" style={{ color: "#000", width: "19rem", marginTop: "25px" }}>
                <Card.Header className='h5'>{movie.Genre}</Card.Header>
                <Link to={`/catalog/${movie.id}`}><Card.Img variant="top" src={movie.Poster || emptyImage} /></Link>
                <Card.Body className='align-items-center justify-content-center'>
                    <Card.Title className="h2">
                        {movie.Title} ({movie.Year})
                    </Card.Title>
                    <Card.Text>
                        <strong>Director:</strong> {movie.Director}
                    </Card.Text>
                    <Card.Text>
                        <strong>Cast:</strong> {movie.Cast}
                    </Card.Text>
                    {isFav(movie.id) ? (
                        <IoMdHeartEmpty
                            name="favorite"
                            tooltip="Favorite"
                            hover="Favorite"
                            size={25}
                            onClick={() => addToFavorites(movie)} />
                    ) : (
                        <IoIosHeart
                            name="favorite"
                            tooltip="Favorite"
                            hover="Favorite"
                            size={25}
                            color="red"
                            onClick={() => addToFavorites(movie)} />
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}
