var moment = require('moment');

function isValidMoment(testMoment) {
  if (! moment.isMoment(testMoment)) {
    return false;
  }

  if (typeof testMoment.isValid === 'function') {
    // moment 1.7.0+
    return testMoment.isValid();
  }

  return ! isNaN(testMoment);
}

module.exports = {
  isValidMoment : isValidMoment,
};
