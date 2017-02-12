import React from 'react';
import moment from 'moment';
import sinon from 'sinon';
import { expect } from 'chai';
import {
  constructWarningsMessage,
  createComponentSnapshot,
} from './util';

const warningRegex = /^Warning/;

import MomentPropTypes from '../src/index';

describe('ProptypeTests', () => {

  let warnings = [];
  let consoleErrorStub;

  beforeEach(() => {

    consoleErrorStub = sinon.stub(console, 'error', function recordWarnings() {
      for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[ i ];
        if (warningRegex.test(arg)) {
          warnings.push(arg);
        }
      }
    });

  });

  afterEach(() => {

    warnings = [];

    if (consoleErrorStub) {
      consoleErrorStub.restore();
    }

  });

  describe('Missing required object', () => {

    it('should have a warning for the missing moment obj', (done) => {

      const TestClass = React.createClass({
        propTypes : {
          testRequiredObject : MomentPropTypes.momentObj.isRequired,
        },
        render() {
          return null;
        },
      });
      const snapshot = createComponentSnapshot(TestClass);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);
      expect(warnings[0]).to.contain('Required prop');
      done();

    });

  });

  describe('Missing optional object', () => {

    it('should have no warnings for Missing optional moment obj', (done) => {

      const TestClass = React.createClass({
        propTypes : {
          testOptionalObject : MomentPropTypes.momentObj,
        },
        render() {
          return null;
        },
      });
      const snapshot = createComponentSnapshot(TestClass);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

  });

  describe('Wrong type optional object', () => {

    it('should have warnings for optional moment and duration objects being wrong type', (done) => {

      const TestClass = React.createClass({
        propTypes : {
          testWrongObject : MomentPropTypes.momentObj,
          testWrongDuration : MomentPropTypes.momentDurationObj,
        },
        render() {
          return null;
        },
      });
      const testProps = {
        testWrongObject: 1,
        testWrongDuration: moment(),
      };
      const snapshot = createComponentSnapshot(TestClass, testProps);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(2);
      expect(warnings[0]).to.include('Invalid input type');
      expect(warnings[1]).to.include('Invalid prop');
      expect(warnings[1]).to.include('Duration');
      done();

    });

  });

  describe('Missing required string', () => {

    it('should have a warning for the missing moment string', (done) => {

      const TestClass = React.createClass({
        propTypes : {
          testRequiredString : MomentPropTypes.momentString.isRequired,
        },
        render() {
          return null;
        },
      });
      const snapshot = createComponentSnapshot(TestClass);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);
      expect(warnings[0]).to.contain('Required prop');
      done();

    });

  });

  describe('Missing optional string', () => {

    let TestClass;

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

      const snapshot = createComponentSnapshot(TestClass);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

    it('should have no warnings for undefined input', (done) => {

      const testProps = { testOptionalString : undefined };
      const snapshot = createComponentSnapshot(TestClass, testProps);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

    it('should have no warnings for null input', (done) => {

      const testProps = { testOptionalString : null };
      const snapshot = createComponentSnapshot(TestClass, testProps);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(0);
      done();

    });

  });


  describe('Invalid moment string/raw', () => {

    it('should have invalid prop for invalid moment string', (done) => {

      const TestClass = React.createClass({
        propTypes : {
          testWrongString : MomentPropTypes.momentString,
        },
        render() {
          return null;
        },
      });
      const testProps = { testWrongString : 'not a date' };
      const snapshot = createComponentSnapshot(TestClass, testProps);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array', constructWarningsMessage(warnings));
      expect(warnings.length).to.equal(1, constructWarningsMessage(warnings));
      expect(warnings[0]).to.contain('Invalid prop', constructWarningsMessage(warnings));
      done();

    });

  });

  describe('Correct Optional Input', () => {

    it('should have no warnings for the optional moment string', (done) => {

      const TestClass = React.createClass({
        propTypes : {
          testValidString : MomentPropTypes.momentString,
          testValidObject : MomentPropTypes.momentObj,
          testValidDuration : MomentPropTypes.momentDurationObj,
        },
        render() {
          return null;
        },
      });
      const testProps = {
        testValidString : '12-12-2015',
        testValidObject : moment(),
        testValidDuration : moment.duration(0),
      };
      const snapshot = createComponentSnapshot(TestClass, testProps);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array', constructWarningsMessage(warnings));
      expect(warnings.length).to.equal(0, constructWarningsMessage(warnings));
      done();

    });

  });

  describe('Correct Required Input', () => {

    it('should have no warnings for the optional moment string', (done) => {

      const TestClass = React.createClass({
        propTypes : {
          testValidString : MomentPropTypes.momentString.isRequired,
          testValidObject : MomentPropTypes.momentObj.isRequired,
          testValidDuration : MomentPropTypes.momentDurationObj.isRequired,
        },
        render() {
          return null;
        },
      });
      const testProps = {
        testValidString : '12-12-2015',
        testValidObject : moment(),
        testValidDuration : moment.duration(0),
      };
      const snapshot = createComponentSnapshot(TestClass, testProps);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array', constructWarningsMessage(warnings));
      expect(warnings.length).to.equal(0, constructWarningsMessage(warnings));
      done();

    });

  });

  describe('Proptype Predicate', () => {

    it('should throw for momentObj invalid predicate', () => {

      let propValidator;
      expect(() => {
        propValidator = MomentPropTypes.momentObj.withPredicate(null);
      }).to.throw(Error);
      expect(propValidator).to.be.undefined;

    });

    it('should have warning for momentObj named predicate', (done) => {
      function isUTC(m) {
        return false;
      }

      const TestClass = React.createClass({
        propTypes : {
          testObjectNamedPredicate : MomentPropTypes.momentObj.withPredicate(isUTC),
        },
        render() {
          return null;
        },
      });
      const testProps = { testObjectNamedPredicate : moment() };
      const snapshot = createComponentSnapshot(TestClass, testProps);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array', constructWarningsMessage(warnings));
      expect(warnings.length).to.equal(1, constructWarningsMessage(warnings));
      expect(warnings[0]).to.contain('Failed to succeed with predicate `' + isUTC.name + '`');
      done();

    });

    it('should have warning for momentObj anonymous predicate', (done) => {

      const TestClass = React.createClass({
        propTypes : {
          testObjectAnonPredicate : MomentPropTypes.momentObj
            .withPredicate(
              function() {
                return false;
              }
            ),
        },
        render() {
          return null;
        },
      });
      const testProps = { testObjectAnonPredicate : moment() };
      const snapshot = createComponentSnapshot(TestClass, testProps);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array', constructWarningsMessage(warnings));
      expect(warnings.length).to.equal(1, constructWarningsMessage(warnings));
      expect(warnings[0]).to.contain('Failed to succeed with predicate');
      expect(warnings[0]).to.not.contain('isUTC');
      done();

    });

    it('should have warning for momentObj required predicate', (done) => {

      function isUTC(m) {
        return false;
      }

      const TestClass = React.createClass({
        propTypes : {
          testObjectRequiredPredicate : MomentPropTypes.momentObj
            .withPredicate(isUTC).isRequired,
        },
        render() {
          return null;
        },
      });

      const testProps = { testObjectRequiredPredicate : moment() };
      const snapshot = createComponentSnapshot(TestClass, testProps);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array', constructWarningsMessage(warnings));
      expect(warnings.length).to.equal(1, constructWarningsMessage(warnings));
      expect(warnings[0]).to.contain('Failed to succeed with predicate `' + isUTC.name + '`');
      done();

    });

    it('should succeed with each momentObj variation', (done) => {

      function namedPredicate(m) {
        return true;
      }

      const TestClass = React.createClass({
        propTypes : {
          testObjectNamedPredicate : MomentPropTypes.momentObj.withPredicate(namedPredicate).isRequired,
          testObjectAnonPredicate : MomentPropTypes.momentObj.withPredicate(() => true).isRequired,
          testObjectRequiredNamedPredicate : MomentPropTypes.momentObj.withPredicate(namedPredicate).isRequired,
          testObjectRequiredAnonPredicate : MomentPropTypes.momentObj.withPredicate(() => true).isRequired,
        },
        render() {
          return null;
        },
      });
      const testProps = {
        testObjectNamedPredicate : moment(),
        testObjectAnonPredicate : moment(),
        testObjectRequiredNamedPredicate : moment(),
        testObjectRequiredAnonPredicate : moment(),
      };
      const snapshot = createComponentSnapshot(TestClass, testProps);

      expect(snapshot).to.be.null;
      expect(warnings).to.be.an('array', constructWarningsMessage(warnings));
      expect(warnings.length).to.equal(0, constructWarningsMessage(warnings));
      done();

    });

  });

});
