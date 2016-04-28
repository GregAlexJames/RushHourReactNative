"use strict";

var React = require("react-native");

var {
    Component,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    ListView,
    ActivityIndicatorIOS,
    //Navigator,
    TouchableOpacity,
} = React;

var ProgressIndicator = require('./ProgressIndicator')
var TrainStationService = require('./TrainStationService');
//var HospitalDetailView = require('./HospitalDetailView');

var Router = require('react-native-router-flux')

var allTrainStationsView = React.createClass({

  getInitialState: function() {
      var tempds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });

      return {
          dataSource: tempds.cloneWithRows(TrainStationService.trainStationList),
          isLoading: true
      };
    },

    componentDidMount: function() {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            var initialPosition = JSON.stringify(position);
            this.setPositionAndRefresh(initialPosition);
            this.setState({isLoading: false});
        },
        (error) => {
            this.setPositionAndRefresh({coords: {latitude: -31.9522, longitude: 115.8589}});
            this.setState({isLoading: false});
        },
        {enableHighAccuracy: false, timeout: 5000, maximumAge: 1000}
        );
    },

    render: function() {
      if (this.state.isLoading) {
            return (
              <View style={styles.frame}>
                <ProgressIndicator style={styles.activityIndicator} />
              </View>
              );

      }

      return (
          <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderTrainStations}
                  style={styles.listView}
              />
      );
    },

    renderTrainStations: function(station) {
          return (
          <TouchableHighlight key={station.identifier} onPress={() => this.showTrainStationDetails(station)} >
            <View style={styles.container}>
              <View style={styles.leftContainer}>
                <Text style={styles.name}>{station.name}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.name}>{station.distance.toFixed(1)}km</Text>
              </View>
            </View>
          </TouchableHighlight>
      );
    },

    renderLoadingView: function(){
      return (
        <ActivityIndicatorIOS
                style={styles.activityIndicator}
                size="large"
              />
      );
    },

    showTrainStationDetails: function(station){
      //Router.Actions.HospitalDetailView({hospital: hospital});
    },
    
    setPositionAndRefresh: function(position) {
      var lat = position.coords.latitude; 
      var long = position.coords.longitude;

      TrainStationService.setDistance(lat, long);
    },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    leftContainer: {
        flex: 7,
    },
  rightContainer: {
        flex: 3,
    },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  phone: {
    textAlign: 'center',
  },
  frame: {
    paddingTop: 64,
      flex: 1
  },
  listView: {
    paddingTop: 64,
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navigationContainer: {
      flex: 1
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,

  }
});

module.exports = allTrainStationsView;