import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Enterprise Cold Wallet</Text>
        <Button   
          onPress={() =>
            navigate('WalletConfig')
          }
          title="Config Wallet"
          color="#841584"
          accessibilityLabel="Learn more about this purple button">Config Wallet</Button>
        <Button   
          onPress={() =>
            navigate('Transaction')
          }
          title="Create Transaction"
          color="#841584"
          accessibilityLabel="Learn more about this purple button">Create Transaction</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  }
});
