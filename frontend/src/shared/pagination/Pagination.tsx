import ReactPaginate from "react-paginate";
import { ReactComponent as LeftArrow } from "../../assets/images/icons/left-chevron.svg";
import { ReactComponent as RightArrow } from "../../assets/images/icons/right-chevron.svg";

const Pagination = () => {
  return (
    <div className="pagination ml-auto mt-5">
      <ReactPaginate
        marginPagesDisplayed={3}
        pageRangeDisplayed={0}
        breakLabel="..."
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination mt-0"
        activeClassName="pagination-is-active"
        pageCount={10}
        previousLabel={
          <button className="border rounded p-1">
            <LeftArrow />
          </button>
        }
        nextLabel={
          <button className="border rounded p-1">
            <RightArrow />
          </button>
        }
      />
    </div>
  );
};

export default Pagination;
