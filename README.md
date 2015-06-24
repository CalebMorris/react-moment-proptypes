# react-moment-proptypes

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
