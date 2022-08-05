import { Container, Carousel, Row } from "react-bootstrap";
import { CatalogItem } from "../catalog/catalog-item";
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
      <Carousel>
        <Carousel.Item interval={5000} className="carousel">
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

      <Row>
        {orderMovies ?
          orderMovies.map((movie) => (
            <CatalogItem
              key={movie.id}
              id={movie.id}
              Title={movie.Title}
              Poster={movie.Poster}
              Year={movie.Year}
              Genre={movie.Genre}
              Cast={movie.Cast}
              Description={movie.Description}
              Director={movie.Director}
              Writers={movie.Writers}
            />
          )) : <div>No articles yet</div>}
      </Row>

    </Container>
  )
}