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

function createMomentChecker(validator) {

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

    if (typeof propValue === 'undefined') {
      return null;
    }

    if (validator(propValue)) {
      var propType = typeof propValue;
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

  momentObj : createMomentChecker(function(value) {
    return !moment.isMoment(value);
  }),

  momentString : createMomentChecker(function isMomentString(value) {
    return moment.utc(value).format() === 'Invalid date';
  }),

};
