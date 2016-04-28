/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import 
{
  Actions, 
  Scene, 
  Router
} from 'react-native-router-flux';

var allTrainsView = require('./allTrainsView')
var stationView = require('./stationView')

class RushHourReactNative extends Component {
  render() {
        return <Router>
            <Scene key="root" navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle}>
                <Scene key="allTrainsView" component={allTrainsView} title="Rush Hour React Native" initial={true}/>
                <scene key="stationView" component={stationView} title="Station" />
            </Scene>
        </Router>
  };
}



const styles = StyleSheet.create({
  navigationBarStyle:{
    backgroundColor: '#008635'
  },
  titleStyle:{
    color: '#ffffff'
  },
});

AppRegistry.registerComponent('RushHourReactNative', () => RushHourReactNative);
