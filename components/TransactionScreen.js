import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import QRCode from 'react-native-qrcode';
 /* @flow */
 import 'babel-preset-react-native-web3/globals';
 import Web3 from 'web3';
 import truffleConfig from '../truffle';
 const network = truffleConfig.networks.ropsten;

class TransactionScreen extends React.Component {
    state = {
        toAddress: '0x4858e6E0991C3eb852D0e3c10E9Ce1ed4aB88BFc',
        fromAddress: '',
        value: '0x00',
        gasPrice: '0x09184e72a000',
        gasLimit: '0x2710',
        nounce: '0x00',
        qrCodeValue: '',
    }

    static navigationOptions = {
        title: 'Create Transaction',
      };
    
    convertEthToWei = n => new web3.BigNumber(web3.toWei(n, 'ether'))

    getHexValue = text => {
        this.setState({value: this.convertEthToWei(parseFloat(text).toString(16))});
    }
    
    componentDidMount() {
        const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/${network.key}`;
        const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS);
        this.web3 = new Web3(web3Provider);

        this.web3.eth.getTransactionCount("0x4858e6E0991C3eb852D0e3c10E9Ce1ed4aB88BFc",(err, number) => {
            alert(number);
            const hexString = number.toString(16);
            this.setState({ nounce: hexString })
            alert(hexString);
            console.log(hexString);
        });

    }

    generateQrCode = () => {
        console.log(this.state)
        const qrCodeString =
            `{"toAddress":"${this.state.walletName}",
            "value":${this.state.value},
            "gasPrice":${this.state.gasPrice},
            "gasLimit":${this.state.gasLimit},
            "gasLimit":${this.state.gasLimit},
            "nounce":${this.state.nounce}}`
        this.setState({ qrCodeValue: qrCodeString })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Please enter transaction details: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ toAddress: text })}
                    value={this.state.toAddress}
                    placeholder="To"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.getHexValue(text)}
                    value={this.state.value}
                    placeholder="Value"
                />
                <Button 
                    title="Generate QR"
                    color="primary"
                    onPress={this.generateQrCode}
                    color="#841584"
                ></Button>
                <QRCode
                    value={this.state.qrCodeValue}
                    size={200}
                    bgColor='purple'
                    fgColor='white' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
});

export default TransactionScreen;