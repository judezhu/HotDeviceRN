import React from 'react';
import { FileSystem } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class BarcodeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;
    

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

   _handleBarCodeRead = ({ type, data }) => {
    const { navigate } = this.props.navigation;
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
     
    //  alert();
     FileSystem.writeAsStringAsync(FileSystem.documentDirectory+'/test', data).then(function(){
       alert('Import Wallet Success');
       navigate('Wallet');
     });
  }
}
