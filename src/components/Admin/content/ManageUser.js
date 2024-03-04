import ModalCreateUser from "./ModalCreateUser";
import { FaPlusCircle } from "react-icons/fa";
import "./ManageUser.scss";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getListUser } from "../../../services/apiServices";

const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    const res = await getListUser();
    if (res && res.EC === 0) {
      setListUsers(res.DT);
    } else {
      console.log("list user not found");
    }
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
          <TableUser listUsers={listUsers} />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
