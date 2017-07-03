var moment = require('moment');
var momentValidationWrapper = require('./moment-validation-wrapper');
var core = require('./core');

moment.createFromInputFallback = function(config) {
  config._d = new Date(config._i);
};

module.exports = {

  momentObj : core.createMomentChecker(
    'object',
    function(obj) {
      return typeof obj === 'object';
    },
    function isValid(value) {
      return momentValidationWrapper.isValidMoment(value);
    },
    'Moment'
  ),

  momentString : core.createMomentChecker(
    'string',
    function(str) {
      return typeof str === 'string';
    },
    function isValid(value) {
      return momentValidationWrapper.isValidMoment(moment(value));
    },
    'Moment'
  ),

  momentDurationObj : core.createMomentChecker(
    'object',
    function(obj) {
      return typeof obj === 'object';
    },
    function isValid(value) {
      return moment.isDuration(value);
    },
    'Duration'
  ),

  /**
   * Creates a React validator for the Moment Duration type.
   * See http://momentjs.com/docs/#/durations/creating/ for more details
   * For the multi-value case such as Duration(1, 'year') apply an array
   */
  durationPrimitive: core.createMomentChecker(
    'object, number, string or [number, string]',
    function checkType(durationValue) {
      if (Array.isArray(durationValue)) {
        return durationValue.length === 2 &&
          typeof durationValue[0] === 'number' && typeof durationValue[1] === 'string';
      }
      var durationValueType = typeof durationValue;
      return durationValueType === 'object' ||
        durationValueType === 'string' ||
        durationValueType === 'number';
    },
    function isValid(durationValue) {
      var duration;
      if (Array.isArray(durationValue)) {
        duration = moment.duration.apply(null, durationValue);
      } else {
        duration = moment.duration.call(null, durationValue);
      }
      return momentValidationWrapper.isValidDuration(duration);
    },
    'Duration'
  ),

};
