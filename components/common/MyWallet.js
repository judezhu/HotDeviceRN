import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode';
import Web3 from 'web3';
import truffleConfig from '../../truffle';
const network = truffleConfig.networks.ropsten;
import { FileSystem } from 'expo';

class MyWallet extends React.Component {
    state = {
        isLoading: true,
        wallet: { address: '' },
        balance: 0,
    }

    generateQrCode = () => {
        console.log(this.state)
        const qrCodeString =
            `{"walletName":"${this.state.walletName}","entropy":"${this.state.entropy}","numShares":${this.state.numShares},"threshold":${this.state.threshold}}`
        this.setState({ qrCodeValue: qrCodeString })
    }

    componentDidMount() {
        var that = this;
        FileSystem.readAsStringAsync(FileSystem.documentDirectory + '/wallet').then(function (walletString) {
            let wallet = JSON.parse(walletString);
            const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/${network.key}`;
            const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS);
            this.web3 = new Web3(web3Provider);
            this.web3.eth.getBalance(wallet["address"], (err, number) => {
                that.setState({ wallet: wallet })
                that.setState({ isLoading: false });
                let ethValue = this.web3.fromWei(number, 'ether');
                that.setState({ balance: ethValue.toString(10) });
            });
        }).catch(err => { alert(err) });
    }

    render() {
        return (
            <View>
                {
                    this.state.isLoading ? (<Text> still loding </Text>) :
                        (<View><Text>Your Ethereum Address is </Text>
                            <Text> {this.state.wallet.address} </Text>
                            <QRCode
                                value={this.state.wallet.address}
                                size={200}
                                bgColor='purple'
                                fgColor='white' />
                            <Text>Your Balance is {this.state.balance} eth </Text>
                        </View>
                        )
                }
            </View>);
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