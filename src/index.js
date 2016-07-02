var moment = require('moment');
var momentValidationWrapper = require('./moment-validation-wrapper');

moment.createFromInputFallback = function(config) {
  config._d = new Date(config._i);
};

var ANONYMOUS = '<<anonymous>>';

var ReactPropTypeLocationNames = {
  prop : 'prop',
  context : 'context',
  childContext : 'child context',
};

function createMomentChecker(type, typeValidator, validator, momentType) {

  function propValidator(isRequired, props, propName, componentName, location, propFullName) {

    if (isRequired) {
      var locationName = ReactPropTypeLocationNames[ location ];
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (!props.hasOwnProperty(propName)) {
        return new Error(
          'Required ' + locationName + ' `' + propFullName +
          '` was not specified in `' +
          componentName + '`.'
        );
      }
    }

    var propValue = props[ propName ];
    var propType = typeof propValue;

    if (typeof propValue === 'undefined' || propValue === null) {
      return null;
    }

    if (typeValidator && !typeValidator(propValue)) {
      return new Error(
        'Invalid input type: `' + propName + '` of type `' + propType + '` ' +
        'supplied to `' + componentName + '`, expected `' + type + '`.'
      );
    }

    if (! validator(propValue)) {
      return new Error(
        'Invalid ' + location + ' `' + propName + '` of type `' + propType + '` ' +
        'supplied to `' + componentName + '`, expected `' + momentType + '`.'
      );
    }

    return null;

  }

  var requiredPropValidator = propValidator.bind(null, false);
  requiredPropValidator.isRequired = propValidator.bind(null, true);

  return requiredPropValidator;

}

module.exports = {

  momentObj : createMomentChecker(
    'object',
    function(obj) {
      return typeof obj === 'object';
    },
    function isValid(value) {
      return momentValidationWrapper.isValidMoment(value);
    },
    'Moment'
  ),

  momentString : createMomentChecker(
    'string',
    function(str) {
      return typeof str === 'string';
    },
    function isValid(value) {
      return momentValidationWrapper.isValidMoment(moment(value));
    },
    'Moment'
  ),

  momentDurationObj : createMomentChecker(
    'object',
    function(obj) {
      return typeof obj === 'object';
    },
    function isValid(value) {
      return moment.isDuration(value);
    },
    'Duration'
  ),

};
