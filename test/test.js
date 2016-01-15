import React from 'react';
import TestUtils from 'react-addons-test-utils';
import moment from 'moment';
import { expect } from 'chai';

const warningRegex = /^Warning/;

import MomentPropTypes from '../index';

describe('ProptypeTests', () => {

  let oldConsole;
  let warnings = [];
  let TestClass;

  before(() => {

    oldConsole = console.error;

    console.error = function() {
      for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[ i ];
        if (warningRegex.test(arg)) {
          warnings.push(arg);
        }
      }
    };

  });

  afterEach(() => {

    warnings = [];
    TestClass = null;

  });

  after(() => {

    console.error = oldConsole;

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

      const testElement = <TestClass/>;
      TestUtils.renderIntoDocument(testElement);

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);
      expect(warnings[0]).to.contain('Required prop');
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

    it('should have no warnings for Missing optinal moment obj', (done) => {

      const testElement = <TestClass/>;
      TestUtils.renderIntoDocument(testElement);

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

  });

  describe('Wrong type optional object', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          testWrongObject : MomentPropTypes.momentObj,
        },
        render() {
          return null;
        },
      });

    });

    it('should have no warnings for optinal moment obj being wrong type', (done) => {

      const testElement = <TestClass testWrongObject={1} />;
      TestUtils.renderIntoDocument(testElement);

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);
      expect(warnings[0]).to.contain('Invalid input type');
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

      const testElement = <TestClass />;
      TestUtils.renderIntoDocument(testElement);

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);
      expect(warnings[0]).to.contain('Required prop');
      done();

    });

  });

  describe('Missing optional string', () => {

    beforeEach(() => {

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

      const testElement = <TestClass />;
      TestUtils.renderIntoDocument(testElement);

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

    it('should have no warnings for undefined input', (done) => {

      const testElement = <TestClass testOptionalString={undefined} />;
      TestUtils.renderIntoDocument(testElement);

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

    it('should have no warnings for null input', (done) => {

      const testElement = <TestClass testOptionalString={null} />;
      TestUtils.renderIntoDocument(testElement);

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

  });


  describe('Invalid moment string/raw', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          testWrongString : MomentPropTypes.momentString,
        },
        render() {
          return null;
        },
      });

    });

    it('should have invalid prop for invalid moment string', (done) => {

      const testElement = <TestClass testWrongString={'test'} />;
      TestUtils.renderIntoDocument(testElement);

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);
      expect(warnings[0]).to.contain('Invalid prop');
      done();

    });

  });

  describe('Correct Optional Input', () => {

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          testValidString : MomentPropTypes.momentString,
          testValidObject : MomentPropTypes.momentObj,
        },
        render() {
          return null;
        },
      });

    });

    it('should have no warnings for the optional moment string', (done) => {

      const testElement = <TestClass testValidString={'12-12-2015'} testValidObject={moment()} />;
      TestUtils.renderIntoDocument(testElement);

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

  });

});
