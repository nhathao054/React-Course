import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuizById } from "../../services/apiServices";
import _, { result } from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
const DetailQuiz = (props) => {
  const param = useParams();
  const quizId = param.id;
  const location = useLocation();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const handlePrev = () => {
    if (index <= 0) return;
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (data && data.length > index + 1) setIndex(index + 1);
  };

  const handleCheckBoxProp = (answerId, questionId) => {
    let dataQuiz = _.cloneDeep(data); // hook doesn't merge state like react class
    let question = dataQuiz.find((item) => +item.questionId === +questionId);
    if (question && question.answers) {
      console.log("q", question);
      let b = question.answers.map((item) => {
        if (+item.id === answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answers = b;
    }
    let index = dataQuiz.findIndex((item) => +questionId === +item.questionId);
    if (index > -1) {
      setData(dataQuiz);
    }
  };

  const fetchQuestions = async () => {
    const res = await getQuizById(quizId);
    if (res && res.EC === 0) {
      let data = res.DT;
      let result = _.chain(data)
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let image,
            questionDescription = null;

          value.forEach((item, index) => {
            if (index === 0) {
              image = item.image;
              questionDescription = item.description;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return {
            questionId: key,
            answers,
            image,
            questionDescription,
          };
        })
        .value();
      setData(result);
      console.log(result);
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-container">
        <div className="title">
          Quiz{quizId} : {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body"></div>
        <div className="q-content">
          <Question
            index={index}
            data={data && data.length > 0 ? data[index] : []}
            handleCheckBoxProp={handleCheckBoxProp}
          />
        </div>
        <div className="footer">
          <button className="btn btn-primary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-secondary" onClick={() => handleNext()}>
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleNext()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-container">Right content</div>
    </div>
  );
};

export default DetailQuiz;
