import { expect } from 'chai';

import React from 'react/addons';

const TestUtils = React.addons.TestUtils;

const warningRegex = /^Warning/;

describe('ProptypeTests', () => {

  let shallowRenderer;
  let oldConsole;
  let warnings = [];

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

  });

  after(() => {

    console.warn = oldConsole;

  });

  describe('Example', () => {

    let TestClass;

    before(() => {

      TestClass = React.createClass({
        propTypes : {
          test : React.PropTypes.string.isRequired,
        },
        render() {
          return null;
        },
      });

    });

    it('should have a warning for the missing prop', () => {

      shallowRenderer.render(
        React.createElement(TestClass, null, null)
      );

      expect(warnings).to.be.an('array');
      expect(warnings.length).to.equal(1);

    });

  });


});
