"use strict";

var React = require("react-native");

var {
    Component,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    ActivityIndicatorIOS,
} = React;

class ProgressIndicator extends Component {

    render() {
      return (
        <ActivityIndicatorIOS
                style={styles.activityIndicator}
                size="large"
              />
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
