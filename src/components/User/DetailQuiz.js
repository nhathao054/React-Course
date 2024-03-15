import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuizById } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
const DetailQuiz = (props) => {
  const param = useParams();
  const quizId = param.id;
  const location = useLocation();

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  console.log(location);
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
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <div className="question">Question 1: hihi</div>
          <div className="answers">
            <div className="a-child">A. adsas</div>
            <div className="b-child">B. asdfadsf</div>
            <div className="c-child">C. asdfasd</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-primary">Prev</button>
          <button className="btn btn-secondary">Next</button>
        </div>
      </div>
      <div className="right-container">Right content</div>
    </div>
  );
};

export default DetailQuiz;
