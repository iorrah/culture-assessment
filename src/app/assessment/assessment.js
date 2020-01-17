import React from 'react';
import './assessment.css';
import rawDimensions from '../../data/dimensions/dimensions';
import Questions from '../questions/questions';

class Assessment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions_serial: [],
      answers_serial: [],
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.setSerials(rawDimensions);
  }

  setSerials(data) {
    const dimensions = this.buildDimensionsSerial(data);
    const answers = this.buildAnswersSerial(data, dimensions);

    this.setState({
      dimensions_serial: dimensions,
      answers_serial: answers,
    });
  }

  buildDimensionsSerial(data) {
    return data.map((e, i) => ({
      id: i + 1,
      name: e.name,
      score: 0,
    }));
  }

  buildAnswersSerial(data, dimensions) {
    const lengthDims = dimensions.length;
    let i, serial = [];

    for (i = 0; i < lengthDims; i++) {
      const { answers } = data[i],
            dimensionId = dimensions[i].id,
            utils = this.buildAnswerUtils(answers, dimensionId, i),
            currDimAnswers = this.getAnswersFromDim(utils);

      serial = serial.concat(currDimAnswers);
    }

    return serial;
  }

  buildAnswerUtils(answers, dimensionId, index) {
    return {
      answers: answers,
      dimension_id: dimensionId,
      id_to_start: ((index * 10) + 1),
    };
  }

  getAnswersFromDim(utils) {
    const lengthAnswers = utils.answers.length;
    let j, answers = [];

    for (j = 0; j < lengthAnswers; j++)
      answers.push(this.buildAnswer(utils, j));

    return answers;
  }

  buildAnswer(utils, index) {
    return {
      id: utils.id_to_start++,
      text: utils.answers[index],
      dimension_id: utils.dimension_id,
      is_taken: false,
    };
  }

  updateDimensions(dimensions) {
    this.setState({
      dimensions_serial: dimensions,
    });
  }

  render() {
    return (
      <div className="assessment">
        <h1>
          Do you know yourself?
        </h1>

        <Questions
          dimensionsSerial={this.state.dimensions_serial}
          answersSerial={this.state.answers_serial}
          updateDimensions={this.updateDimensions}
        />
      </div>
    );
  }
}

export default Assessment;
