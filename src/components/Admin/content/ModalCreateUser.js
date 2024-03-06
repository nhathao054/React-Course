import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { postCreateUser } from "../../../services/apiServices";

const ModalCreateUser = (props) => {
  const { show, setShow } = props;
  // const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //=====================function=========================================
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUserName("");
    setRole("");
    setImage("");
  };
  const handleShow = () => setShow(true);
  const handleUploadFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitUser = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid Email");
      return;
    }
    if (!role) {
      toast.error("Invalid Role");
      return;
    }
    if (!password) {
      toast.error("Invalid Password");
      return;
    }

    const data = await postCreateUser(email, password, userName, role, image);
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
        autocomplete="off"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
                  onChange={(event) => {
                    setRole(event.target.value);
                  }}
                >
                  <option value="USER">USER</option>
                  <option value="ADIM">ADMIN</option>
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

export default ModalCreateUser;
