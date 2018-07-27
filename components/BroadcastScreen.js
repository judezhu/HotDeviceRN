import React from 'react';
import { FileSystem } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Web3 from 'web3';
import truffleConfig from '../truffle';
const network = truffleConfig.networks.ropsten;


export default class BroadcastScreen extends React.Component {
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
    const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/${network.key}`;
     const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS);
     this.web3 = new Web3(web3Provider);

     alert(data);
     this.web3.eth.sendRawTransaction(data, function(err, hash) {
        if (!err)
          alert(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
        else 
          alert(err);
      });
  }
}
