import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/apiServices";

const DetailQuiz = (props) => {
  const param = useParams();
  const quizId = param.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    const res = await getQuizById(quizId);
    console.log(1);
    console.log(res);
  };

  return <div className="detail-quiz-container">DetailQuiz</div>;
};

export default DetailQuiz;
