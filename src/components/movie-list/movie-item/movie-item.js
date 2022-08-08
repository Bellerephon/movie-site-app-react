import Icon from "react-crud-icons";
import emptyImage from '../../../asset/no-poster.png'
import { Image } from "react-bootstrap";
import { PressedButton } from "../crud-operation/pressed-button";
import { useUserAuth } from '../../../contexts/user-auth-context';

export const MovieItem = ({
    movie,
    onActionClick,
}) => {
    const { user } = useUserAuth();

    return (
        <>
            {user.uid === movie.OwnerId &&
                <>
                    <td><Image
                        width={70}
                        src={movie.Poster}
                        alt={emptyImage}
                        thumbnail />
                    </td>
                    <td>{movie.Title}</td>
                    <td>{movie.Year}</td>
                    <td>{movie.Director}</td>
                    <td>{movie.Writers}</td>
                    <td>{movie.Genre}</td>
                    <td style={{
                        width: 135
                    }}>

                        <Icon
                            name="edit"
                            tooltip="Edit"
                            hover="Edit"
                            theme="dark"
                            size="small"
                            onClick={() => onActionClick(movie.id, PressedButton.Edit)}
                        />

                        <Icon
                            name="show"
                            tooltip="Show"
                            hover="Show"
                            theme="dark"
                            size="small"
                            onClick={() => onActionClick(movie.id, PressedButton.Details)}
                        />

                        <Icon
                            name="delete"
                            tooltip="Delete"
                            hover="Delete"
                            theme="dark"
                            size="small"
                            onClick={() => onActionClick(movie.id, PressedButton.Delete)}
                        />
                    </td>
                </>
            }
        </>
    );
}