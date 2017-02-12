import React from 'react';
import ReactRenderer from 'react-test-renderer';

import { expect } from 'chai';

export function constructWarningsMessage(warnings) {
  var message = '';
  try {
    message = 'warnings: ' + JSON.stringify(warnings);
  } catch (err) {
    console.log('Error creating test message', err.stack);
  }

  return message;
}

export function createComponentSnapshot(reactComponent, propsObject = {}) {
  expect(reactComponent).to.be.an('function');
  expect(propsObject).to.be.an('object');

  const component = ReactRenderer.create(
    React.createElement(reactComponent, propsObject)
  );

  return component.toJSON();
}
