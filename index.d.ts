import moment from 'moment';
import * as PropTypes from 'prop-types';

declare module 'react-moment-proptypes';

export const momentObj: ReactMomentProptypes.RequireableValidator<moment.Moment>;
export const momentString: ReactMomentProptypes.RequireableValidator<string>;
export const momentDurationObj: ReactMomentProptypes.RequireableValidator<moment.Duration>;

/**
 * Constructs specific to 'react-moment-proptypes' that are not top-level, but need to be exposed.
 */
export namespace ReactMomentProptypes {

  /**
   * A prop-type validator with can be extended with a validation predicate.
   */
  export interface Validator<T> extends PropTypes.Validator<T | undefined | null> {
    withPredicate(isValidMoment: ValidMomentPredicate): Validator<T>,
  }

  /**
   * A prop-type validator that allows for forcing requirement of the corresponding prop.
   */
  export interface RequireableValidator<T> extends Validator<T> {
    isRequired: Validator<NonNullable<T>>;
  }

  /**
   * Predicate to determine if the specific Moment is valid according to our desired characteristics
   *
   * @param moment The moment being validated
   * @returns true if the Moment is valid
   */
  type ValidMomentPredicate = (moment: moment.Moment) => boolean;

}
