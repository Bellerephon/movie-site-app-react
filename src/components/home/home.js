import { Container, Carousel, Row } from "react-bootstrap";
import { Movie } from "../catalog/movie";
import { useState, useEffect } from "react";
import { getLastRecords } from "../../lib/init-firebase";
import './home.scss';
import slide1 from '../../asset/slide1.jpeg';
import slide2 from '../../asset/slide2.jpeg';
import slide3 from '../../asset/slide3.jpeg';

export const Home = () => {

  const [orderMovies, setOrderMovies] = useState();

  useEffect(() => {
    getLastRecords("movies")
      .then(res => setOrderMovies(res));
  }, []);

  return (
    <Container>
      <Carousel variant="dark"> 
        <Carousel.Item interval={4500} className="carousel">
          <img
            width={1200}
            height={560}
            alt="1200x560"
            src={slide1}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            width={1200}
            height={560}
            alt="1200x560"
            src={slide2}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            width={1200}
            height={560}
            alt="1200x560"
            src={slide3}
          />
        </Carousel.Item>
      </Carousel>
      <div className="lastes-text">Latest Movies</div>
      <Row className="row-style">
        {orderMovies ?
          orderMovies.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
            />
          )) : <h2>No articles yet</h2>}
      </Row>

    </Container>
  )
}