import { expect } from 'chai';

import React from 'react/addons';

const TestUtils = React.addons.TestUtils;
const warningRegex = /^Warning/;

import MomentPropTypes from '../index';

describe('ProptypeTests', () => {

  let shallowRenderer;
  let oldConsole;
  let warnings = [];
  let TestClass;

  before(() => {

    oldConsole = console.warn;

    console.warn = function() {
      for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[ i ];
        if (warningRegex.test(arg)) {
          warnings.push(arg);
        }
      }

      oldConsole.apply(console, arguments);
    };

    shallowRenderer = TestUtils.createRenderer();

  });

  afterEach(() => {

    warnings = [];
    TestClass = null;

  });

  after(() => {

    console.warn = oldConsole;

  });

  describe('Missing required', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          test : MomentPropTypes.momentObj.isRequired,
        },
        render() {
          return null;
        },
      });

    });

    it('should have a warning for the missing moment obj', () => {

      shallowRenderer.render(
        React.createElement(TestClass, null, null)
      );

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);

    });

  });

  describe('Missing optional', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          test : MomentPropTypes.momentObj,
        },
        render() {
          return null;
        },
      });

    });

    it('should have no warnings for optinal moment obj', () => {

      shallowRenderer.render(
        React.createElement(TestClass, null, null)
      );

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);

    });

  });

  describe('Missing required', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          test : MomentPropTypes.momentString.isRequired,
        },
        render() {
          return null;
        },
      });

    });

    it('should have a warning for the missing moment string', () => {

      shallowRenderer.render(
        React.createElement(TestClass, null, null)
      );

      console.log('momentString', Object.keys(MomentPropTypes.momentString), MomentPropTypes.momentString.isRequired);

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);

    });

  });

  describe('Missing optional', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          test : MomentPropTypes.momentString,
        },
        render() {
          return null;
        },
      });

    });

    it('should have no warnings for the optional moment string', () => {

      shallowRenderer.render(
        React.createElement(TestClass, null, null)
      );

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);

    });

  });

});
