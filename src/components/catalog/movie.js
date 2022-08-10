import { Col, Card } from "react-bootstrap";
import emptyImage from '../../asset/no-poster.png'
import { Link } from "react-router-dom";
import './movie.scss';
import { IoMdHeartEmpty, IoIosHeart } from 'react-icons/io';
import { useMovieContext } from "../../contexts/movie-context";

export const Movie = ({ movie }) => {

    const { addToFavorites, isFav } = useMovieContext();

    return (
        <Col sm={12} md={6} lg={3} className="pb-5 row-style">
            <Card className="card image-container">
                <Card.Header className='h5'>{movie.Genre}</Card.Header>
                <Link to={`/catalog/${movie.id}`}><Card.Img className="image-container" variant="top" src={movie.Poster || emptyImage} /></Link>
                <Card.Body className='card-body'>
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
                            cursor= "pointer"
                            name="favorite"
                            tooltip="Favorite"
                            hover="Favorite"
                            size={25}
                            onClick={() => addToFavorites(movie)} />
                    ) : (
                        <IoIosHeart
                            cursor= "pointer"
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
