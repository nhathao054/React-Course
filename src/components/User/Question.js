import _ from "lodash";

const Question = (props) => {
  const { data, index } = props;

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckBox = (event, aId, qId) => {
    // console.log(">>> check", event.target.checked);
    props.handleCheckBoxProp(aId, qId);
  };

  return (
    <>
      <div className="q-image">
        {data.image && <img src={`data:image/jpeg;base64,${data.image}`} />}
      </div>
      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answers">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <div key={`q-${index}`} className="a-child">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={a.isSelected}
                  onChange={(event) =>
                    handleCheckBox(event, a.id, data.questionId)
                  }
                />
                <label className="form-check-label">{a.description}</label>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
