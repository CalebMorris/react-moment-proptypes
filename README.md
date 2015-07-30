# react-moment-proptypes

[![Build
Status](https://api.shippable.com/projects/55b07d2aedd7f2c052802265/badge?branchName=master)](https://app.shippable.com/projects/55b07d2aedd7f2c052802265/builds/latest)
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
