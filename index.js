'use strict';

var React = require('react'),
    createSideEffect = require('react-side-effect');

var _serverStatus = 200;
var _serverLocation = null;

function getCurrentPropsFromPropsList(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  return innermostProps || {};
}

var NestedStatus = createSideEffect(function handleChange(propsList) {
  var props = getCurrentPropsFromPropsList(propsList);
  _serverStatus = props.code || 200;
  _serverLocation = props.location || '';
}, {
  displayName: 'NestedStatus',

  propTypes: {
    code: React.PropTypes.number.isRequired,
    location: React.PropTypes.string
  },

  statics: {
    peek: function () {
      return {
        code: _serverStatus,
        location: _serverLocation
      };
    },

    rewind: function () {
      var status = _serverStatus;
      var location = _serverLocation;
      this.dispose();
      return {
        code: status,
        location: location
      };
    }
  }
});

module.exports = NestedStatus;
