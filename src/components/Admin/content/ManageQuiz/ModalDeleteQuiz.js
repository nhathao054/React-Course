import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleClick = async () => {
    const res = await deleteQuiz(dataDelete.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await props.fetchQuiz();
    } else {
      toast.error(res.EM);
    }
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
          <Modal.Title>Confirm Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete Quiz: {dataDelete.name}</Modal.Body>
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

export default ModalDeleteQuiz;
