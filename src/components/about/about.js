import { Container } from "react-bootstrap"

export const About = () => {
    return (
        <Container>
            <div>
                <h1 className='text-center'>Project Detail</h1>

                <h5>This project developed by Valentin Simeonov</h5>

                <h5 className="about-color-schema">Used Technologies</h5>
                <ul style={{listStyle: "none"}}>
                    <li>Html</li>
                    <li>Css</li>
                    <li>React</li>
                    <li>React-Bootstrap</li>
                    <li>Bootstrap</li>
                    <li>React Router Dom</li>
                </ul>

                <h5>Install - Run</h5>
                <div className="card" style={{margin: "0 auto", float: "none"}}>
                    <div className="card-body fw-bold text-dark">
                        git clone https://github.com/Bellerephon/movie-site-app-react.git <br />
                        <br />
                        $ cd  movie-site-project-react<br />
                        <br />
                        $ npm install <br />
                        $ npm start <br />
                    </div>
                </div>
            </div>
        </Container>
    );
}