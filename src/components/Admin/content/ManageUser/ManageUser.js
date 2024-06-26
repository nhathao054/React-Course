import ModalCreateUser from "./ModalCreateUser";
import { FaPlusCircle } from "react-icons/fa";
import "./ManageUser.scss";
// import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import {
  getListUser,
  getListUserPatinate,
} from "../../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = () => {
  const LIMIT_USER = 5;

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUserWithPaginate(1);
  }, []);

  // const fetchListUser = async () => {
  //   const res = await getListUser();
  //   if (res && res.EC === 0) {
  //     setListUsers(res.DT);
  //   } else {
  //     console.log("list user not found");
  //   }
  // };

  const fetchListUser = async () => {
    fetchListUserWithPaginate(1);
  };

  const fetchListUserWithPaginate = async (page) => {
    const res = await getListUserPatinate(page, LIMIT_USER);
    if (res && res.EC === 0) {
      setPageCount(res.DT.totalPages);
      setListUsers(res.DT.users);
    } else {
      console.log("list user not found");
    }
  };

  const handleClickBtnUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const handleClickBtnInfoUser = (user) => {
    setShowModalViewUser(true);
    setDataUpdate(user);
  };

  const handleClickBtnDeleteUser = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  return (
    <div className="manage-user-container">
      <div className="title"> UserManagement </div>
      <div className="manage-user-content">
        <div className="btn-add-new-user">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FaPlusCircle />
            Add new user
          </button>
        </div>
        <div className="table-users-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
            handleClickBtnInfoUser={handleClickBtnInfoUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
            handleClickBtnInfoUser={handleClickBtnInfoUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            pageCount={pageCount}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
          fetchListUser={fetchListUser}
        />
        <ModalViewUser
          show={showModalViewUser}
          dataUpdate={dataUpdate}
          setShow={setShowModalViewUser}
          fetchListUser={fetchListUser}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUser={fetchListUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
