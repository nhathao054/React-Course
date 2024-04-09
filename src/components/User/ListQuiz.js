import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getListQuiz } from "../../services/apiServices";
import "../User/ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
  const [ListQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    handleGetListQuiz();
  }, []);

  const handleGetListQuiz = async () => {
    const res = await getListQuiz();

    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="list-quiz-container container">
      {ListQuiz &&
        ListQuiz.length > 0 &&
        ListQuiz.map((quiz, index) => {
          return (
            <Card key={`${index}-quiz`} style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${quiz.image}`}
              />
              <Card.Body>
                <Card.Title>Quiz No. {index + 1}</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    });
                  }}
                >
                  Do quiz now
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      {ListQuiz && ListQuiz.length === 0 && <div>You don't have any quiz</div>}
    </div>
  );
};

export default ListQuiz;
