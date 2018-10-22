import React from 'react';
import { shallow, mount } from 'enzyme';
import Assessment from './assessment';
import hasOnlyUniqueIds from '../../utils/has-only-unique-ids';

it('renders without crashing', () => {
  shallow(<Assessment />);
});

it('should have valid state', () => {
  const wrapper = mount(<Assessment />);
  expect(typeof wrapper.state()).toEqual('object');
});

/*
  Testing the Dimensions
  array after it has gone
  through our serializer.
*/

it('should have valid dimension length', () => {
  const wrapper = mount(<Assessment />);
  expect(wrapper.state().dimensions_serial.length).toEqual(6);
});

it('should have a valid dimension in each element', () => {
  const wrapper = mount(<Assessment />),
        dimensions = wrapper.state().dimensions_serial,
        lengthDims = dimensions.length;

  for (let i = 0; i < lengthDims; i++) {
    let currDim = dimensions[i],
        prevDim = dimensions[i - 1] || {};

    expect(typeof currDim).toEqual('object');
    expect(currDim.id).toBeGreaterThanOrEqual(prevDim.id || 0);
    expect(typeof currDim.name).toEqual('string');
    expect(isNaN(currDim.score)).toBeFalsy();
  }
});

it('should contain dimensions with unique ids', () => {
  const wrapper = mount(<Assessment />),
        dim = wrapper.state().dimensions_serial;

  expect(hasOnlyUniqueIds(dim)).toBeTruthy();
});

/*
  Testing the Answers
  array after it has gone
  through our serializer.
*/

it('should have valid answer length', () => {
  const wrapper = mount(<Assessment />);
  expect(wrapper.state().answers_serial.length).toEqual(60);
});

it('should have a valid answer in each element', () => {
  const wrapper = mount(<Assessment />),
        answers = wrapper.state().answers_serial,
        lengthAnswers = answers.length;

  for (let i = 0; i < lengthAnswers; i++) {
    let currAnswer = answers[i],
        prevAnswer = answers[i - 1] || {};

    expect(typeof currAnswer).toEqual('object');
    expect(currAnswer.id).toBeGreaterThanOrEqual(prevAnswer.id || 0);
    expect(typeof currAnswer.text).toEqual('string');
    expect(currAnswer.is_taken).toBeTruthy();
    expect(isNaN(currAnswer.dimension_id)).toBeFalsy();
  }
});

it('should contain answers with unique ids', () => {
  const wrapper = mount(<Assessment />),
        ans = wrapper.state().answers_serial;

  expect(hasOnlyUniqueIds(ans)).toBeTruthy();
});
