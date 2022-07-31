import { Button, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import emptyImage from "../../asset/no-poster.png";
import errorImage from "../../asset/err-img.png";
import './not-found.scss';

export const NotFound = () => {
    return (

        <div className="page-single-2">
            <div className="row">
                <div className="middle-content">
                    <Image variant="top" src={errorImage} alt={emptyImage} />
                    <h1>Page not found</h1>
                    <Link to="/">
                        <Button style={{ background: "#2db4ea", border: 0 }}>
                            Go Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}