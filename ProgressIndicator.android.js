"use strict";

var ProgressBar = require('ProgressBarAndroid')
var React = require("react-native");

var {
    Component,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} = React;

class ProgressIndicator extends Component {

    render() {
      return (
        <View>
          <ProgressBar
                styleAttr="Large"
                indeterminate={true}
              />
        </View>
      );
    }
};

var styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

module.exports = ProgressIndicator;
