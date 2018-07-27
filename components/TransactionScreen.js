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
        value: '0x0500',
        valueText: '0',
        gasPrice: '0x04185e72a000',
        gasLimit: '0x30010',
        nounce: '0x00',
        devices: '1 2 3',
        qrCodeValue: '',
    }

    static navigationOptions = {
        title: 'Create Transaction',
      };
    
    convertEthToWei = (n, web3) => new web3.BigNumber(web3.toWei(n, 'ether'))

    getHexValue = (text, web3) => {
        this.setState({value: '0x' + this.convertEthToWei(parseFloat(text), web3).toString(16)});
        this.setState({valueText: text});
    }
    
    componentDidMount() {
        const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/${network.key}`;
        const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS);
        this.web3 = new Web3(web3Provider);

        this.web3.eth.getTransactionCount("0x3e61Ae965b3be2f521e0E50875f1Dc58914367FB",(err, number) => {
            const hexString = '0x' + number.toString(16);
            alert(hexString);
            this.setState({ nounce: hexString })
        });

    }

    generateQrCode = () => {
        console.log(this.state)
        const qrCodeString =
            `{"to":"${this.state.toAddress}",
            "value":"${this.state.value}",
            "gasPrice":"${this.state.gasPrice}",
            "gasLimit":"${this.state.gasLimit}",
            "devices":"${this.state.devices}",
            "nounce":"${this.state.nounce}"}`
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
                {/* <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.getHexValue(text,this.web3)}
                    value={this.state.valueText}
                    placeholder="Value"
                /> */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ devices: text })}
                    value={this.state.devices}
                    placeholder="Devices"
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