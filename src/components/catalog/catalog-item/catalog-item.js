
import { Col, Card, Button } from "react-bootstrap";
import emptyImage from '../../../asset/no-poster.png'
import { Link } from "react-router-dom";
import './catalog-item.scss';

export const CatalogItem = ({
    id,
    Genre,
    Poster,
    Title,
    Year,
    Director,
    Cast
}) => {
    return (
        <Col sm={12} md={6} lg={3}>
            <Card className="card" style={{ color: "#000", width: "19rem", marginTop: "25px" }}>
                <Card.Header>{Genre}</Card.Header>
                <Card.Img variant="top" src={Poster || emptyImage} />
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
                    <Link to={`/catalog/${id}`}><Button style={{ background: "#2db4ea", border: 0 }}>Read More</Button></Link>
                </Card.Body>
            </Card>
        </Col>
    );
}