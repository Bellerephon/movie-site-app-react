import { Image } from "react-bootstrap"
import emptyImage from "../../asset/no-poster.png";

export const TopRatedItems = ({ topMovies }) => {
    return (
        <>
                <td>{topMovies.poster_path !== null 
                  ? (
                    <Image src={"https://image.tmdb.org/t/p/w500" + topMovies.poster_path} thumbnail />
                ) : (
                    <Image src={emptyImage} />
                )}
                </td>
                <td style={{
                        width: 180
                    }}>{topMovies.original_title}</td>
                <td style={{
                        width: 120
                    }}>{topMovies.release_date}</td>
                <td>{topMovies.vote_average}</td>
                <td>{topMovies.vote_count}</td>
                <td style={{textAlign: 'center'}}>{topMovies.overview}</td>
        </>
    )
}