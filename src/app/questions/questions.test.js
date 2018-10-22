import React from 'react';
import { shallow, mount } from 'enzyme';
import Questions from './questions';
import Assessment from '../assessment/assessment';

let getMountedAssessment = () => {
  return mount(<Assessment />);
}

let getMountedQuestions = (assessment) => {
  const dimensionsSerial = assessment.state().dimensions_serial;
  const answersSerial = assessment.state().answers_serial;

  return mount(
    <Questions
      dimensionsSerial={dimensionsSerial}
      answersSerial={answersSerial}
    />
  );
}

let getQuestionsComponent = () => {
  const assessment = getMountedAssessment();
  return getMountedQuestions(assessment);
}

it('renders without crashing', () => {
  shallow(<Questions />);
});

it('should be defined', () => {
  const questions = getQuestionsComponent();
  expect(questions).toBeDefined();
});

it('should receive serialized dimensions', () => {
  const questions = getQuestionsComponent();
  expect(questions.props().dimensionsSerial.length).toEqual(6);
});

it('should receive serialized answers', () => {
  const questions = getQuestionsComponent();
  expect(questions.props().answersSerial.length).toEqual(60);
});

it('should have valid state', () => {
  const questions = getQuestionsComponent();
  expect(typeof questions.state()).toEqual('object');
});

it('should have called the lifecycle method', () => {
  const lifecycle = 'componentWillReceiveProps';
  spyOn(Questions.prototype, lifecycle);
  const questions = getQuestionsComponent();
  expect(Questions.prototype[lifecycle]).toHaveBeenCalledTimes(1);
});
