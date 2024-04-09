import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
  // const [listUser, setListUser] = useState([]);
  const { listUsers } = props;

  const handlePageClick = (event) => {
    props.fetchListUserWithPaginate(+event.selected + 1);
  };

  return (
    <>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => props.handleClickBtnInfoUser(item)}
                    >
                      Info
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => props.handleClickBtnUpdateUser(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleClickBtnDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel="<Pre"
        nextLabel="Next>"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={props.pageCount}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
    </>
  );
};

export default TableUserPaginate;
