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
    Navigator,
    TouchableOpacity,
} = React;

var ProgressIndicator = require('./ProgressIndicator')
var TrainStationService = require('./TrainStationService');

class stationView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            station: TrainStationService.getStationById(this.props.id),
            isLoading: true,
        };
    }
    
     componentDidMount() {
         var that = this;
         
        TrainStationService.getTrainsForStation(this.state.id, function(foundTrains){

            var tempds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            });

            that.setState({
                isLoading: false, 
                dataSource: tempds.cloneWithRows(foundTrains)}
                );
        });
     }
     
     getTitle() {
         return "Hello World";
     }

    render() {
      if (this.state.isLoading) {
            return (
              <View style={styles.frame}>
                <ProgressIndicator style={styles.activityIndicator} />
              </View>
              );

      }
      return <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderTrainStations}
                  style={styles.listView}
              />
      
    }
    
    renderTrainStations(train) {
          return (
          <TouchableHighlight >
            <View style={styles.container}>
              <View style={styles.leftContainer}>
                <Text style={styles.name}>{train.line}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.distance}>{train.minutesToTrain}min</Text>
              </View>
            </View>
          </TouchableHighlight>
      );

    }
}


var styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingTop:10,
    paddingBottom:10,
    paddingRight:20,
    paddingLeft:20,
  },
  frame: {
    paddingTop: 44,
      flex: 1
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,

  },
  leftContainer: {
        flex: 7,
    },
  rightContainer: {
        flex: 3,
    },
  name: {
    fontSize: 20,
    textAlign: 'left',
  },
  distance: {
    textAlign: 'right',
  },
  listView: {
    paddingTop: 44,
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
});

module.exports = stationView;