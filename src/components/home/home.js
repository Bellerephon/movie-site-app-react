import { Container, Carousel, Row } from "react-bootstrap";
import { CatalogItem } from "../catalog/catalog-item/catalog-item";
import { useContext } from "react";
import { MovieContext } from "../../contexts/movie-context";


export const Home = () => {
    const { movies } = useContext(MovieContext);
    
    return (
        <Container>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://moviesmarkus.files.wordpress.com/2022/06/top-gun.jpg"
                        alt="First slide"
                        margin= "auto"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/06/THOR-LOVE-AND-THUNDER-SET-PHOTO.jpg"
                        alt="Second slide"
                        margin= "auto"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://ntvb.tmsimg.com/assets/p19994163_v_h8_ac.jpg?w=1280&h=720"
                        alt="Third slide"
                        margin= "auto"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Row>
                {movies ?
                    movies.map((movie) => (
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