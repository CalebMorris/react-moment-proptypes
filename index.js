var moment = require('moment');

function momentObj(props, propName, componentName, location) {
  var propValue = props[propName];
  if (! moment.isMoment(propValue)) {
    var propType = typeof propValue;
    return new Error(
      'Invalid ' + location + '`' + propName + '` of type `' + propType + '` ' +
      'supplied to `' + componentName + '`, expected `Moment`.'
    );
  }
  return null;
};

function momentString(props, propName, componentName, location) {
  var propValue = props[propName];
  if (moment.utc(propValue).format() === 'Invalid date') {
    var propType = typeof propValue;
    return new Error(
      'Invalid ' + location + '`' + propName + '` of type `' + propType + '` ' +
      'supplied to `' + componentName + '`, expected `Moment`.'
    );
  }
  return null;
};

module.exports = {
  momentObj : momentObj,
  momentString : momentString,
};

