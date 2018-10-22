import React from 'react';
import persistence from '../../utils/persistence/persistence';
import Answers from '../answers/answers';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };

    this.onComplete = this.onComplete.bind(this);
    this.getDimensionsScores = this.getDimensionsScores.bind(this);
  }

  renderAnswers() {
    return (
      <Answers
        questions={this.state.questions}
        dimensions={this.props.dimensionsSerial}
        onComplete={this.onComplete}
      />
    );
  }

  setQuestionsIfNeeded(props) {
    if (!this.state.questions.length) { this.setQuestions(props); }
  }

  setQuestions(props) {
    let questions = [];
    const dimensions = props.dimensionsSerial || [];
    const answers = props.answersSerial || [];

    if (!(dimensions.length && answers.length)) {
      return;
    }

    questions = this.buildQuestions(props);
    this.setState({ questions });
  }

  buildQuestions(props) {
    return this.buildDimQuestionsY(props);
  }

  buildDimQuestionsY(props) {
    const lengthLoopsY = props.dimensionsSerial.length;
    let questions = [];

    for (let i = 0; i < lengthLoopsY; i++) {
      const dimQuestions = this.buildDimQuestionsX(i, props);
      questions = questions.concat(dimQuestions);
    }

    return this.sortArrayRandomically(questions);
  }

  buildDimQuestionsX(indexDimY, props) {
    const questions = [];

    let answers = props.answersSerial,
        dimensions = props.dimensionsSerial,
        lengthLoopsX = dimensions.length - 1,
        dimensionLoopYId = dimensions[indexDimY].id;

    for (let i = 0; i < lengthLoopsX; i++) {
      questions.push(
        this.buildQuestion(
          i,
          answers,
          dimensionLoopYId,
          dimensions,
        ),
      );
    }

    return questions;
  }

  buildQuestion(indexDimX, answers, dimensionLoopYId, dimensions) {
    const dimensionLoopXId = dimensions[indexDimX].id;

    const questionAnswers = this.getQuestionAnswers(
      answers,
      dimensionLoopYId,
      dimensionLoopXId,
    );

    const questionId = this.getQuestionId(questionAnswers);

    const question = {
      answers: this.sortArrayRandomically(questionAnswers),
      id: questionId,
    };

    return question;
  }

  getQuestionAnswers(answers, dimensionLoopYId, dimensionLoopXId) {
    const firstAnswer = answers.find(e => {
      return (e.dimension_id === dimensionLoopYId) && (!e.is_taken);
    });

    firstAnswer.is_taken = true;
    let secondAnswer = null;

    if (dimensionLoopXId < dimensionLoopYId) {
      secondAnswer = answers.find(e => (
        ((e.dimension_id * 1) === (dimensionLoopYId - dimensionLoopXId))
          && (!e.is_taken)
      ));
    } else {
      const secondAnswerId = ((10 * dimensionLoopXId) + dimensionLoopYId);
      secondAnswer = answers[secondAnswerId - 1];
    }

    secondAnswer.is_taken = true;
    return [firstAnswer, secondAnswer];
  }

  getQuestionId(answers) {
    return null;
  }

  sortArrayRandomically(array) {
    return array.sort((a, b) => 0.5 - Math.random());
  }

  onComplete(pickedAnswers) {
    const newDimensions = this.getDimensionsScores(pickedAnswers);
    persistence.save(pickedAnswers, newDimensions);
    this.props.updateDimensions(newDimensions);
    window.location.href = '/result';
  }

  getDimensionsScores(pickedAnswers) {
    const dimensions = this.props.dimensionsSerial;
    const lengthAnswers = pickedAnswers.length;

    for (let i = 0; i < lengthAnswers; i++) {
      const answer = pickedAnswers[i];
      const dimension = dimensions.find(e => e.id === answer.dimension_id);
      dimension.score++;
    }

    return dimensions;
  }

  componentWillReceiveProps(nextProps) {
    this.setQuestionsIfNeeded(nextProps);
  }

  render() {
    return (
      <div className="questions">
        <p>
          Pick the answer that describes you best:
        </p>

        {this.renderAnswers()}
      </div>
    );
  }
}

export default Questions;
