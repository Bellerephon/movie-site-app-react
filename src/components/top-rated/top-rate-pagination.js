import { Pagination } from "react-bootstrap";

export const TopRatePagination = ({ 
    prevPage, 
    nextPage, 
    firstPage,
    lastPage,
    currentPage,
}) => {

    return (
        <Pagination className="py-4">
            <Pagination.Prev onClick={prevPage}/>
            <Pagination.Item>{currentPage}</Pagination.Item>
            <Pagination.Next onClick={nextPage}/>
        </Pagination>
    )
}