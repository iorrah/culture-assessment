import React from 'react';
import { FaAngleRight } from 'react-icons/lib/fa';

class Answer extends React.Component {
  render() {
    const { answer, questionId } = this.props;
    const answerId = answer.id;
    const naming = `answer-${answerId}`;

    return (
      <li className="answer" key="naming">
        <label
          htmlFor={naming}
          className="lbl"
        >
          <input
            type="checkbox"
            name={naming}
            id={naming}
            className="chk"
            onChange={e => this.props.onChange(e, answer, questionId)}
          />

          <div className="text">
            {answer.text}
          </div>

          <span className="action">
            <FaAngleRight />
          </span>
        </label>
      </li>
    );
  }
}

export default Answer;
