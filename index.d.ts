import moment from 'moment';
import * as PropTypes from 'prop-types';

declare module 'react-moment-proptypes';

export const momentObj: ReactMomentProptypes.Validator<moment.Moment>;
export const momentString: ReactMomentProptypes.Validator<string>;
export const momentDurationObj: ReactMomentProptypes.Validator<moment.Duration>;

/**
 * Constructs specific to 'react-moment-proptypes' that are not top-level, but need to be exposed.
 */
export namespace ReactMomentProptypes {

  /**
   * A prop-type that can be marked as required, have an evaluation predicate attached, or both.
   */
   export interface Validator<T> extends PropTypes.Validator<T | undefined | null> {
    isRequired: PredicatableValidator<NonNullable<T>>;
    withPredicate(isValidMoment: ValidMomentPredicate): PropTypes.Requireable<T>,
  }

  /**
   * A prop-type validator that can have an evaluation predicate attached.
   */
  export interface PredicatableValidator<T> extends PropTypes.Validator<T | undefined | null> {
    withPredicate(isValidMoment: ValidMomentPredicate): PropTypes.Validator<T>,
  }

  /**
   * Predicate to determine if the specific Moment is valid according to our desired characteristics
   *
   * @param moment The moment being validated
   * @returns true if the Moment is valid
   */
  type ValidMomentPredicate = (moment: moment.Moment) => boolean;

}
