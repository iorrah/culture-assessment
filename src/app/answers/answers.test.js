import React from 'react';
import { shallow, mount } from 'enzyme';
import questions from '../../data/questions/questions';
import dimensions from '../../data/dimensions/dimensions';
import Answers from './answers';

it('renders without crashing', () => {
  shallow(<Answers />);
});

it('should have valid state', () => {
  const answers = mount(<Answers />);
  expect(typeof answers.state()).toEqual('object');
});

let getAnswersComponent = () => {
  return mount(
    <Answers
      questions={questions}
      dimensions={dimensions}
    />
  );
}

it('should be defined', () => {
  const answers = getAnswersComponent();
  expect(answers).toBeDefined();
});

it('should have valid state', () => {
  const answers = getAnswersComponent();
  expect(typeof answers.state()).toEqual('object');
});

it('should render answers set 30x times', () => {
  const renderMethod = 'renderAnswersSet';
  spyOn(Answers.prototype, renderMethod);
  const questions = getAnswersComponent();
  expect(Answers.prototype[renderMethod]).toHaveBeenCalledTimes(30);
});
