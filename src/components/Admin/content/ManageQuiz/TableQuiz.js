import { useEffect, useState } from "react";

const TableQuiz = (props) => {
  const data = props.data;

  return (
    <>
      <div className="table-quiz">
        <table className="table table-hover border-1 my-2">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data?.DT?.map((item, index) => {
                  return (
                    <tr key={`${index}-quiz`}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.difficulty}</td>
                      <td>
                        <button
                          className="btn btn-warning mx-3"
                          onClick={() => props.handleClickBtnUpdateQuiz(item)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => props.handleClickBtnDeleteQuiz(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableQuiz;
