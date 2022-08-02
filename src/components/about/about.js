import { Container } from "react-bootstrap"

export const About = () => {
    return(
        <Container>
            <>
                <h1 className='text-center'>Project Detail</h1>
                
                <p>This project developed by Valentin Simeonov</p>

                <h4>Used Technologies</h4>
                <ul>
                    <li>Html</li>
                    <li>Css</li>
                    <li>React</li>
                    <li>React-Bootstrap</li>
                    <li>Bootstrap</li>
                    <li>React Router Dom</li>
                </ul>

                <h4>Install - Run</h4>
                <div class="card">
                    <div class="card-body fw-bold text-dark">
                        git clone https://github.com/nejlasahin/movie-app-with-react.git <br />
                        <br />
                        $ cd  movie-app-with-react<br />
                        <br />
                        $ npm install <br />
                        $ npm start <br />

                    </div>
                </div>
        </>
        </Container>
    );
}