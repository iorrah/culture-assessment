import React from 'react';
import './answers.css';
import Answer from './answer/answer';

class Answers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picked_answers: [],
    };

    this.onChangeChk = this.onChangeChk.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
  }

  onChangeChk(event, answer, questionId) {
    this.disableElement(event.target);
    this.saveAnswer(answer, this.checkProgress);
    this.fadeQuestionOut(questionId);
  }

  saveAnswer(answer, checkProgress) {
    this.setState({
      picked_answers: [...this.state.picked_answers, answer],
    }, checkProgress);
  }

  fadeQuestionOut(questionId) {
    const selector = `question-${questionId}`;
    const element = document.getElementById(selector);
    element.className = 'out';

    setTimeout(() => {
      element.style.display = 'none';
    }, 250);
  }

  disableElement(e) {
    e.disabled = true;
  }

  checkProgress() {
    const pickedAnswers = this.state.picked_answers;
    const lenghPicked = pickedAnswers.length;
    const lengthTotal = this.props.questions.length;

    if (lenghPicked === lengthTotal) {
      this.notifyParent(pickedAnswers);
    }
  }

  notifyParent(pickedAnswers) {
    this.props.onComplete(pickedAnswers);
  }

  renderAnswersSet(question, questionId) {
    return (
      <ul id={`question-${questionId}`} key={questionId}>
        {question.answers.map((answer) => {
          const dimensions = this.props.dimensions || [];

          const dimension = dimensions.find(e => e.id === answer.dimension_id);

          return (<Answer
            answer={answer}
            dimension={dimension}
            questionId={questionId}
            key={answer.id}
            onChange={this.onChangeChk}
          />);
        })}
      </ul>
    );
  }

  render() {
    const questions = this.props.questions || [];
    const total = questions.length;
    const picked = this.state.picked_answers.length + 1;

    return (
      <div className="answers">
        <div className="answer-container">
          {questions.map((question, i) => {
            const questionId = i + 1;
            return this.renderAnswersSet(question, questionId);
          })}
        </div>

        <div className="btn-container">
          <button className="btn">
            Submit
          </button>
        </div>

        <div className="counter">
          {picked}/{total}
        </div>
      </div>
    );
  }
}

export default Answers;
