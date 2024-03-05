import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    const res = await deleteUser(dataDelete.id);
    console.log(res);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete email: {dataDelete.id}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClick();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
