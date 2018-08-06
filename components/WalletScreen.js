import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import WalletConfig from './common/WalletConfig'
import { BarCodeScanner, Permissions } from 'expo';
import MyWallet from './common/MyWallet';
import { FileSystem } from 'expo';

class WalletScreen extends React.Component {
    static navigationOptions = {
        title: 'Wallet'
    };

    state = {
        walletExist: false,
        hasCameraPermission: null,
        wallet: { address: '0x88' }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        let wallet = null;
        try {
            wallet = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + '/wallet')
        } catch (err) {
            console.log(`wallet file not exists.`)
        }
        if (wallet) {
            this.setState({ walletExist: true });
            this.setState({ wallet: JSON.parse(wallet) });
        }
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { navigate } = this.props.navigation;
        const isImported = this.props.navigation.getParam('isImported', false);
        if (isImported) this.setState({walletExist : true});
        return (
            <View style={styles.container}>
                {this.state.walletExist ? <MyWallet /> : <WalletConfig />}
                {this.state.walletExist ? <Button
                    title="Create New Address"
                    color="primary"
                    onPress={async () => {
                        try {
                            await FileSystem.deleteAsync(FileSystem.documentDirectory + '/wallet');
                            // navigate('Wallet');
                            this.setState({walletExist : false});
                        } catch (err) {
                            alert(err.message);
                        }
                    }}
                    color="#841584"
                ></Button> : <Button
                    title="Import Account"
                    color="primary"
                    onPress={() =>
                        navigate('Barcode')
                    }
                    color="#841584"
                ></Button>}
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

export default WalletScreen;