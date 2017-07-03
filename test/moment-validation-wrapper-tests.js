import { describe } from 'mocha';
import { expect } from 'chai';

import moment from 'moment';
import { isValidMoment, isValidDuration } from '../src/moment-validation-wrapper';

describe('moment validation', () => {

  describe('isValidMoment', () => {

    it('returns false for ', () => {
      const wrongTypeTestValues = [undefined, null, [], 123, ''];
      for (let testValue of wrongTypeTestValues) {
        expect(isValidMoment(testValue)).to.equal(false, JSON.stringify(testValue));
      }
    });

    it('returns false for invalid moment', () => {
      const wrongTypeTestValues = [
        moment('not a moment'),
      ];
      for (let testValue of wrongTypeTestValues) {
        expect(isValidMoment(testValue)).to.equal(false, JSON.stringify(testValue));
      }
    });

    it('returns true for valid moment', () => {
      const testValue = moment('2012-12-31');
      expect(isValidMoment(testValue)).to.equal(true, JSON.stringify(testValue));
    });

  });

  describe('isValidDuration', () => {

    it('returns false for wrong type', () => {
      const wrongTypeTestValues = [undefined, null, [], 123, ''];
      for (let testValue of wrongTypeTestValues) {
        expect(isValidDuration(testValue)).to.equal(false, JSON.stringify(testValue));
      }
    });

    it('returns false for invalid moment', () => {
      // Durations are incredibly hard to force invalid. The force function is only in later ver.
      if (typeof moment.duration.invalid === 'function') {
        const testValue = moment.duration.invalid();
        expect(isValidDuration(testValue)).to.equal(false, JSON.stringify(testValue));
      }
    });

    it('returns true for valid moment', () => {
      const testValue = moment.duration(0);
      expect(isValidDuration(testValue)).to.equal(true, JSON.stringify(testValue));
    });

  });

});
