import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import QRCode from 'react-native-qrcode';
import Web3 from 'web3';
import truffleConfig from '../../truffle';
const network = truffleConfig.networks.ropsten;

class MyWallet extends React.Component {
    state = {
        walletName: '',
        entropy: '',
        numShares: '',
        threshold: '',
        qrCodeValue: '',
    }

    generateQrCode = () => {
        console.log(this.state)
        const qrCodeString =
            `{"walletName":"${this.state.walletName}","entropy":"${this.state.entropy}","numShares":${this.state.numShares},"threshold":${this.state.threshold}}`
        this.setState({ qrCodeValue: qrCodeString })
    }

    componentDidMount() {
        const { wallet } = this.props;
        const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/${network.key}`;
        const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS);
        this.web3 = new Web3(web3Provider);

        this.web3.eth.getTransactionCount("0x4858e6E0991C3eb852D0e3c10E9Ce1ed4aB88BFc",(err, number) => {
            const hexString = '0x' + number.toString(16);
            alert(hexString);
            this.setState({ nounce: hexString })
        });
    }

    render() {
        const { user, dashboard, translations } = this.props;
        return (
            <View>
                <Text>Your Ethereum Address is: </Text>
                <Text> {this.state.address} </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ walletName: text })}
                    value={this.state.walletName}
                    placeholder="Wallet Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ entropy: text })}
                    value={this.state.entropy}
                    placeholder="Entropy"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ numShares: text })}
                    value={this.state.numShares}
                    placeholder="Num of Shares"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ threshold: text })}
                    value={this.state.threshold}
                    placeholder="Threshhold"
                />
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

export default MyWallet;