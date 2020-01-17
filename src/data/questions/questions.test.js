import React from 'react';
import { shallow, mount } from 'enzyme';
import questions from './questions';

it('should have valid type', () => {
  expect(typeof questions).toEqual('object');
});

it('should check have valid length', () => {
  expect(questions.length).toEqual(30);
});

it('should have defined id', () => {
  let firstChild = questions[0];
  expect(firstChild.id).toBeDefined();
});

it('should have answers', () => {
  let firstChild = questions[0];
  expect(firstChild.answers).toBeTruthy();
});

it('should contain valid-type answers', () => {
  let firstChild = questions[0];
  expect(typeof firstChild.answers).toEqual('object');
});

it('should contain 2x answers in each element', () => {
  let lengthQuestions = questions.length;

  for (let i = 0; i < lengthQuestions; i++) {
    let question = questions[i];
    expect(question.answers.length).toEqual(2);
  }
});

it('should contain valid answers in each element', () => {
  let lengthQuestions = questions.length;

  for (let i = 0; i < lengthQuestions; i++) {
    let question = questions[i],
        { answers } = question,
        lengthAnswers = answers;

    for (let j = 0; j < lengthAnswers; j++) {
      let answer = answers[j];
      expect(answer).toBeTruthy();
    }
  }
});
