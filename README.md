# react-moment-proptypes

A React Proptype Validator to check if passed prop is a momemnt.js construct

# Example

``` javascript
var momentPropType = require('react-moment-proptypes');

module.exports = React.createClass({
  propTypes : {
    dateThing : momentPropType,
  },

  render : function() {
    return null
  },
});
```
