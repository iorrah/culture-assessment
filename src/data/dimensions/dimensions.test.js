import React from 'react';
import { shallow, mount } from 'enzyme';
import dimensions from './dimensions';

it('should have valid type', () => {
  expect(typeof dimensions).toEqual('object');
});

it('should check have valid length', () => {
  expect(dimensions.length).toEqual(6);
});

it('should have name', () => {
  let firstChild = dimensions[0];
  expect(firstChild.name).toBeTruthy();
});

it('should have answers', () => {
  let firstChild = dimensions[0];
  expect(firstChild.answers).toBeTruthy();
});

it('should contain valid-type answers', () => {
  let firstChild = dimensions[0];
  expect(typeof firstChild.answers).toEqual('object');
});

it('should contain 10x answers in each element', () => {
  let lengthDims = dimensions.length;

  for (let i = 0; i < lengthDims; i++) {
    let dim = dimensions[i];
    expect(dim.answers.length).toEqual(10);
  }
});

it('should contain valid answers in each element', () => {
  let lengthDims = dimensions.length;

  for (let i = 0; i < lengthDims; i++) {
    let dim = dimensions[i],
        { answers } = dim,
        lengthAnswers = answers;

    for (let j = 0; j < lengthAnswers; j++) {
      let answer = answers[j];
      expect(answer).toBeTruthy();
    }
  }
});
