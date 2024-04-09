import { useState, useEffect } from "react";
import Select from "react-select";
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";
//===================Icon=========================================
import { BsPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { FaPlusSquare } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
//===================API==========================================
import {
  getAllQuiz,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiServices";

import { v4 as uuidv4 } from "uuid";
import _, { forEach, values } from "lodash";

import "./Questions.scss";
import { Value } from "sass";
import { type } from "@testing-library/user-event/dist/type";

const Questions = (props) => {
  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];
  const [listQuiz, setListQuiz] = useState("");
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState("");

  const initQuestion = [
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "answer 1", isCorrect: false }],
    },
  ];
  const [questions, setQuestion] = useState(initQuestion);
  const [previewImage, setPreviewImage] = useState({
    url: "",
    title: "",
  });

  //=============================================================================================

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    const res = await getAllQuiz();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const handleAddRemoveQuestion = (type, questionId) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "question 1",
        imageFile: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "answer 1", isCorrect: false }],
      };

      setQuestion([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      const questionClone = _.cloneDeep(questions);
      setQuestion(questionClone.filter((item) => item.id !== questionId));
    }
  };

  const handleAddRemoveAnswers = (type, questionId, answersId) => {
    if (type === "ADD") {
      const questionClone = _.cloneDeep(questions);

      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers.push(newAnswer);
      setQuestion(questionClone);
    }
    if (type === "REMOVE") {
      const questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answersId
      );
      setQuestion(questionClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      const questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].description = value;
        setQuestion(questionClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    const questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
    }
    setQuestion(questionClone);
  };

  const handleAnswerOnChange = (type, questionId, answerId, value) => {
    const questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            } else if (type === "ANSWER") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
    }
    setQuestion(questionClone);
  };

  const handlePreviewImage = (id) => {
    const questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === id);
    if (index > -1) {
      setPreviewImage({
        url: URL.createObjectURL(questionClone[index].imageFile),
        title: questionClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  const SubmitAnswer = async () => {
    //validate
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose the quiz");
      return;
    }
    let isValidAnswer = true;
    let indexA,
      indexQ = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
        indexQ = i;
        if (isValidAnswer === false) break;
      }
    }

    if (isValidAnswer === false) {
      toast.error(`Not emty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    let isValidQuestion = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQ1 = i;
        break;
      }
    }

    if (isValidQuestion === false) {
      toast.error(`Not emty description at question ${indexQ1 + 1}`);
      return;
    }

    // submitQuestion
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          q.DT.id,
          answer.isCorrect
        );
      }
      toast.success("Create Question successfully");
      setQuestion(initQuestion);
    }
  };

  //===================================================================================
  return (
    <>
      <div className="question-container">
        <div className="question-title">Manage Questions</div>
        <div className="add-new-question">
          <div className="col-6 form-group">
            <label>Select Quiz</label>
            {/* <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
              onChange={setSelectedQuiz(Value)}
            >
              {listQuiz &&
                listQuiz.map((item, index) => {
                  return (
                    <option key={"quiz-" + index} value={index + 1}>
                      {item.label}
                    </option>
                  );
                })}
            </select> */}
            <Select
              defaultValue={selectedQuiz}
              onChange={setSelectedQuiz}
              options={listQuiz}
            />
          </div>
          <div className="my-3"></div>
          Add Questions:
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <div key={question.id} className="q-main mb-4">
                  <div className="question-content">
                    <div className="form-floating description">
                      <input
                        type="type"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={(event) =>
                          handleOnChange(
                            "QUESTION",
                            question.id,
                            event.target.value
                          )
                        }
                      />
                      <label htmlFor="floatingInput">
                        Questions {index + 1}'s Description
                      </label>
                    </div>
                    <div className="group-upload">
                      <label className="label-upload" htmlFor={question.id}>
                        <RiImageAddFill />
                      </label>
                      <input
                        id={question.id}
                        type="file"
                        hidden
                        onChange={(event) =>
                          handleOnChangeFileQuestion(question.id, event)
                        }
                      />
                      <span>
                        {question.imageName ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handlePreviewImage(question.id)}
                          >
                            {question.imageName}
                          </span>
                        ) : (
                          "0 file upload"
                        )}
                      </span>
                    </div>
                    <div className="btn-group">
                      <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                        <BsPatchPlusFill className="icon-add" />
                      </span>
                      {questions.length > 1 && (
                        <span
                          onClick={() =>
                            handleAddRemoveQuestion("REMOVE", question.id)
                          }
                        >
                          <BsFillPatchMinusFill className="icon-remove" />
                        </span>
                      )}
                    </div>
                  </div>

                  {question.answers &&
                    question.answers.length > 0 &&
                    question.answers.map((answer, index) => {
                      return (
                        <div key={answer.id} className="answers-content mt-3">
                          <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={(event) =>
                              handleAnswerOnChange(
                                "CHECKBOX",
                                question.id,
                                answer.id,
                                event.target.checked
                              )
                            }
                          />
                          <div className="form-floating answers-des">
                            <input
                              type="type"
                              className="form-control"
                              id="floatingInput"
                              placeholder="name@example.com"
                              onChange={(event) =>
                                handleAnswerOnChange(
                                  "ANSWER",
                                  question.id,
                                  answer.id,
                                  event.target.value
                                )
                              }
                            />
                            <label htmlFor="floatingInput">
                              Answers {index + 1}
                            </label>
                          </div>
                          <div className="btn-group">
                            <span
                              onClick={() =>
                                handleAddRemoveAnswers("ADD", question.id, "")
                              }
                            >
                              <FaPlusSquare className="icon-add" />
                            </span>
                            {question.answers.length > 1 && (
                              <span
                                onClick={() =>
                                  handleAddRemoveAnswers(
                                    "REMOVE",
                                    question.id,
                                    answer.id
                                  )
                                }
                              >
                                <FaMinusSquare className="icon-remove" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>
      {isPreviewImage === true && (
        <Lightbox
          image={previewImage.url}
          title={previewImage.title}
          onClose={() => setIsPreviewImage(false)}
        ></Lightbox>
      )}
      <div
        className="btn btn-warning mx-3"
        onClick={() => SubmitAnswer(questions)}
      >
        Save Change
      </div>
    </>
  );
};

export default Questions;
