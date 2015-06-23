var moment = require('moment');

module.exports = function validate(props, propName, componentName, location) {
  var propValue = props[propName];
  if (! moment.isMoment(propValue)) {
    var propType = typeof propValue;
    return new Error(
      `Invalid ${location} \`${propName}\` of type \`${propType}\` ` +
      `supplied to \`${componentName}\`, expected \`Moment\`.`
    );
  }
  return null;
},
