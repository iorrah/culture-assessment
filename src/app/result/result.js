import React from 'react';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

import persistence from '../../utils/persistence/persistence';
import './result.css';

class Result extends React.Component {
  showAnswers() {
    const list = document.querySelector('.answers-container');
    list.className += ' opened';
    const action = document.querySelector('.shower');
    action.classList.remove('shower');
    const p = document.querySelector('.shower-container');
    p.className += ' hidden';
  }

  render() {
    if (!persistence.isAssessed()) {
      window.location.href = '/';
    }

    const dimensions = persistence.dimensions();
    const answers = persistence.pickedAnswers();

    const chartData = dimensions.map(dimension => ({
      subject: dimension.name,
      score: dimension.score,
    }));

    return (
      <main className="result">
        <div className="wrapper">
          <div className="line">
            <div className="fit fit-2 fit-hidden-xs">
              &nbsp;
            </div>

            <div className="fit fit-6">
              <h1>Result</h1>

              <p>
                Based on the ipsative assessment process
                that you have just gone through, the outcome
                can be found below.
              </p>

              <div className="picked-answers">
                <p className="shower-container">
                  Click&nbsp;

                  <span
                    className="shower"
                    onClick={this.showAnswers}
                  >
                    here
                  </span>

                  &nbsp;to see your answers.
                </p>

                <ul className="answers-container">
                  {answers.map(answer => (<li key={answer.id}>
                    {answer.text}
                  </li>))}
                </ul>
              </div>

              <RadarChart
                cx={300}
                cy={250}
                outerRadius={150}
                data={chartData}
                width={600}
                height={600}
                className="result-chart"
              >

                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />

                <Radar
                  name="result"
                  dataKey="score"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </div>

            <div className="fit fit-2 fit-hidden-xs">
              &nbsp;
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Result;
