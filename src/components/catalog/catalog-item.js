import { Col, Card, Button } from "react-bootstrap";
import emptyImage from '../../asset/no-poster.png'
import { Link } from "react-router-dom";
import './catalog-item.scss';

export const CatalogItem = ({
    id,
    Genre,
    Poster,
    Title,
    Year,
    Director,
    Cast,
    setFavourites
}) => {
    return (
        <Col sm={12} md={6} lg={3}>
            <Card className="card" style={{ color: "#000", width: "19rem", marginTop: "25px" }}>
            <div className='image-container '>
                <Card.Header>{Genre}</Card.Header>
                <Link to={`/catalog/${id}`}><Card.Img variant="top" src={Poster || emptyImage} /></Link>
              <Card.Body>
                    <Card.Title>
                        {Title} ({Year})
                    </Card.Title>
                    <Card.Text>
                        <strong>Director:</strong> {Director}
                    </Card.Text>
                    <Card.Text>
                        <strong>Cast:</strong> {Cast}
                    </Card.Text>
                    <Button style={{ background: "#2db4ea", border: 0 }} onClick={setFavourites}>Read More</Button>
                </Card.Body>
                </div>
            </Card>
        </Col>
    );
}