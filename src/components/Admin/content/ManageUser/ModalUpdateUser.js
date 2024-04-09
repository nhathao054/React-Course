import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../../services/apiServices";
import _ from "lodash";

const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate } = props;
  // const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //=====================function=========================================

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUserName(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUserName("");
    setRole("");
    setImage("");
    props.setDataUpdate({});
  };

  const handleUploadFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitUser = async () => {
    const data = await putUpdateUser(dataUpdate.id, userName, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await props.fetchListUser();
      handleClose();
    } else {
      toast.error(data.EM);
    }
  };
  //==========================render===============================
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        className="modal-add-user"
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  disabled
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  disabled
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridUserName">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(event) => {
                    setRole(event.target.value);
                  }}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <div className="mb-12 label-upload">
              <FaPlusCircle />
              <Form.Label htmlFor="labelUpload">Upload File image</Form.Label>
              <input
                type="file"
                id="labelUpload"
                onChange={(event) => handleUploadFile(event)}
                hidden
              />
            </div>
            <Form.Group className="mb-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitUser();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
