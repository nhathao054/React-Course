import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../../services/apiServices";
import _ from "lodash";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate } = props;
  // const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //=====================function=========================================

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      setType(dataUpdate.difficulty);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);
    setDescription("");
    setName("");
    setType("");
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
    const data = await putUpdateQuiz(
      dataUpdate.id,
      name,
      description,
      type,
      image
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await props.fetchQuiz();
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
                <Form.Label>Quiz Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formRole">
                <Form.Label>Difficulty</Form.Label>
                <Form.Select
                  value={type}
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                >
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
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

export default ModalUpdateQuiz;
