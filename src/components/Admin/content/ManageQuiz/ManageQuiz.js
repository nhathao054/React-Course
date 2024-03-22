import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateQuiz } from "../../../../services/apiServices.js";
import { toast } from "react-toastify";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleCreateQuiz = async () => {
    if (!name || !description || !type || !image) {
      toast.error("Don't let field emty");
    }

    console.log(description, type?.value, name, image);

    const res = await postCreateQuiz(description, type?.value, name, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.warning(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <div className="title">ManageQuiz</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new quiz</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="quiz"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="quizType"
            />
            <label>Description</label>
          </div>
          <div className="form-floating mb-3">
            <Select
              defaultValue={type}
              placeholder="QuizType..."
              options={options}
              onChange={setType}
            />
          </div>
          <div className="more-action form-control mb-3">
            <label className="mb-1">Upload image</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => handleChangeFile(event)}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              handleCreateQuiz();
            }}
          >
            Save
          </button>
        </fieldset>
      </div>
      <div className="list-detail">table</div>
    </div>
  );
};

export default ManageQuiz;
