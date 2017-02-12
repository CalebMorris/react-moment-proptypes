import { expect } from 'chai';

import moment from 'moment';

import { isValidMoment } from '../src/moment-validation-wrapper';

describe('moment-validation-wrapper', () => {

  describe('isValidMoment', () => {

    it('should fail on invalid', () => {

      expect(isValidMoment(null)).to.be.false;
      expect(isValidMoment(undefined)).to.be.false;
      expect(isValidMoment({})).to.be.false;
      expect(isValidMoment(function() {})).to.be.false;

    });

    it('should pass on valid moment', () => {

      expect(isValidMoment(moment())).to.be.true;

    });

  });

});
