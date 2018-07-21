import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import QRCode from 'react-native-qrcode';

class WalletConfigScreen extends React.Component {
    state = {
        walletName: '',
        entropy: '',
        numShares: '',
        threshold: '',
        qrCodeValue: '',
    }

    static navigationOptions = {
        title: 'Wallet Config',
      };

    generateQrCode = () => {
        console.log(this.state)
        const qrCodeString =
            `{"walletName":"${this.state.walletName}","entropy":"${this.state.entropy}","numShares":${this.state.numShares},"threshold":${this.state.threshold}}`
        this.setState({ qrCodeValue: qrCodeString })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Please enter the configuration of your wallet: </Text>
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

export default WalletConfigScreen;