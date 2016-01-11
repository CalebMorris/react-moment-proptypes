var moment = require('moment');
moment.createFromInputFallback = function(config) {
  config._d = new Date(config._i);
};

var ANONYMOUS = '<<anonymous>>';

var ReactPropTypeLocationNames = {
  prop : 'prop',
  context : 'context',
  childContext : 'child context',
};

function createMomentChecker(type, typeValidator, validator) {

  function propValidator(isRequired, props, propName, componentName, location, propFullName) {

    if (isRequired) {
      var locationName = ReactPropTypeLocationNames[ location ];
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      return new Error(
        'Required ' + locationName + ' `' + propFullName +
        '` was not specified in `' +
        componentName + '`.'
      );
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

    if (validator(propValue)) {
      return new Error(
        'Invalid ' + location + ' `' + propName + '` of type `' + propType + '` ' +
        'supplied to `' + componentName + '`, expected `Moment`.'
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
    (obj) => typeof obj === 'object',
    function(value) {
      return typeof value === 'object' && !moment.isMoment(value);
    }
  ),

  momentString : createMomentChecker(
    'string',
    (str) => typeof str === 'string',
    function isMomentString(value) {
      return typeof value === 'string' && moment.utc(value).format() === 'Invalid date';
    }
  ),

};
