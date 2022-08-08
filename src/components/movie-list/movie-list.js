import { useState } from "react";
import { Container, Table, Pagination, Button } from "react-bootstrap";
import { CreateMovie } from './crud-operation/create-movie';
import { MovieItem } from "./movie-item/movie-item";
import { PressedButton } from "./crud-operation/pressed-button";
import { ShowMovie } from "./crud-operation/show-movie";
import { EditMovie } from "./crud-operation/edit-movie";
import { DeleteMovie } from "./crud-operation/delete-movie";
import { useMovieContext } from "../../contexts/movie-context";
import * as service from '../../lib/init-firebase';
import './movie-list.scss';


export const MovieList = () => {
    const { movies } = useMovieContext();

    const [buttonAction, setButtonAction] = useState({ action: null });
    const [modalAction, setModalAction] = useState(false);

    const userActionClickHandler = (movieId, actionType) => {
        if (actionType === 'create') {
            setButtonAction({
                action: actionType
            });
        }
        else (
            service.getCollectionDetails(movieId, "movies")
                .then(movie => {
                    setButtonAction({
                        movie,
                        action: actionType
                    });
                }))
    }

    const showAction = () => {
        setModalAction(true);
    }

    const handleClose = () => {
        setButtonAction({ action: null });
    }

    return (
        <Container>
            {buttonAction.action === PressedButton.Create &&
                <CreateMovie
                    showAction={showAction}
                    handleClose={handleClose}
                />
            }
            {buttonAction.action === PressedButton.Edit &&
                <EditMovie 
                    movie={buttonAction.movie}
                    showAction={showAction}
                    handleClose={handleClose}
                />
            }
            {buttonAction.action === PressedButton.Details &&
                <ShowMovie
                    movie={buttonAction.movie}
                    showAction={showAction}
                    handleClose={handleClose}
                />
            }
            {buttonAction.action === PressedButton.Delete &&
                <DeleteMovie
                    movie={buttonAction.movie}
                    showAction={showAction}
                    handleClose={handleClose}
                />
            }
            <div className='py-3' />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Director</th>
                        <th>Writers</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody style={{
                    verticalAlign: 'middle',
                    textAlign: 'center'
                }}>
                    {movies.map(movie =>
                        <tr key={movie.id}>
                            <MovieItem
                                movie={movie}
                                onActionClick={userActionClickHandler}
                            />
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button
                style={{ background: "#2db4ea", border: 0 }}
                onClick={() => userActionClickHandler(null, PressedButton.Create)}>
                Add New Movie
            </Button>
            <Pagination className="py-4">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </Container>
    )
}