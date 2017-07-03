var moment = require('moment');

function isValidMoment(testMoment) {
  if (typeof moment.isMoment === 'function' && !moment.isMoment(testMoment)) {
    return false;
  }

  /* istanbul ignore else  */
  if (typeof testMoment.isValid === 'function') {
    // moment 1.7.0+
    return testMoment.isValid();
  }

  /* istanbul ignore next */
  return !isNaN(testMoment);
}

function isValidDuration(testDuration) {
  if (typeof moment.isDuration === 'function' && !moment.isDuration(testDuration)) {
    return false;
  }

  /* istanbul ignore else  */
  if (typeof testDuration.isValid === 'function') {
    // moment 2.1.1+
    return testDuration.isValid();
  }

  /* istanbul ignore next */
  return !isNaN(testDuration);
}

module.exports = {
  isValidMoment: isValidMoment,
  isValidDuration: isValidDuration,
};
