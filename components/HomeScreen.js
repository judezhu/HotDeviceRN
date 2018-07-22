import React from 'react';
import { StyleSheet, Text, Button, View , Image} from 'react-native';
import { logo } from '../assets/eth.png'
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
        {/* <img  src={require('../assets/logo.png')} width="100" height="50" /> */}
        <Image source={require('../assets/eth.png')} style={styles.stretch} />
        <Button   
          onPress={() =>
            navigate('Wallet')
          }
          title="My Account"
          color="#841584"
          accessibilityLabel="Learn more about this purple button">My Wallet</Button>
        <Button   
          onPress={() =>
            navigate('Transaction')
          }
          title="Create Transaction"
          color="#841584"
          accessibilityLabel="Learn more about this purple button">Create Transaction</Button>
        <Button   
          onPress={() =>
            navigate('Broadcast')
          }
          title="Broadcast Transaction"
          color="#841584"
          accessibilityLabel="Learn more about this purple button">Broadcast Transaction</Button>
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
  },
  stretch: {
    width: 100,
    height: 100
  }
});
