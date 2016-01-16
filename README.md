# react-moment-proptypes

[![Build
Status](https://travis-ci.org/CalebMorris/react-moment-proptypes.svg?branch=master)](https://travis-ci.org/CalebMorris/react-moment-proptypes)
[![Coverage Status](https://coveralls.io/repos/CalebMorris/react-moment-proptypes/badge.svg?branch=master&service=github)](https://coveralls.io/github/CalebMorris/react-moment-proptypes?branch=master)

A React Proptype Validator to check if passed prop is a moment.js construct

# Example

``` javascript
var momentPropTypes = require('react-moment-proptypes');

var TestClass = React.createClass({
  propTypes : {
    dateThing : momentPropTypes.momentObj,
    stringThing : momentPropTypes.momentString,
  },

  render : function() {
    return null
  },
});

// Class Use
<TestClass dateThing={moment()}
           stringThing={'12-12-2014'} />

```

# Tests

Tests were approached with `jsdom` and React's test utility renderer

- `npm test` for running unit tests
- `npm run coverage` for current test coverage
