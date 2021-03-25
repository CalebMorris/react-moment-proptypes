import moment from 'moment';
import * as PropTypes from 'prop-types';

declare module 'react-moment-proptypes';

export const momentObj: PropTypes.Requireable<moment.Moment>;
export const momentString: PropTypes.Requireable<string>;
export const momentDurationObj: PropTypes.Requireable<moment.Duration>;
