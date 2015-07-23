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
    };


  });

  beforeEach(() => {

    shallowRenderer = TestUtils.createRenderer();

  });

  afterEach(() => {

    warnings = [];
    TestClass = null;
    shallowRenderer = null;

  });

  after(() => {

    console.warn = oldConsole;

  });

  describe('Missing required object', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          testRequiredObject : MomentPropTypes.momentObj.isRequired,
        },
        render() {
          return null;
        },
      });

    });

    it('should have a warning for the missing moment obj', (done) => {

      shallowRenderer.render(
        React.createElement(TestClass, null, null)
      );

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);
      done();

    });

  });

  describe('Missing optional object', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          testOptionalObject : MomentPropTypes.momentObj,
        },
        render() {
          return null;
        },
      });

    });

    it('should have no warnings for optinal moment obj', (done) => {

      shallowRenderer.render(
        React.createElement(TestClass, null, null)
      );

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

  });

  describe('Missing required string', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          testRequiredString : MomentPropTypes.momentString.isRequired,
        },
        render() {
          return null;
        },
      });

    });

    it('should have a warning for the missing moment string', (done) => {

      shallowRenderer.render(
        React.createElement(TestClass, null, null)
      );

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);
      done();

    });

  });

  describe('Missing optional string', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          testOptionalString : MomentPropTypes.momentString,
        },
        render() {
          return null;
        },
      });

    });

    it('should have no warnings for the optional moment string', (done) => {

      shallowRenderer.render(
        React.createElement(TestClass, null, null)
      );

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

  });

});
