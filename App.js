import {
	createStackNavigator,
  } from 'react-navigation';
  // import Main from './src/Main'
  import HomeScreen from './components/HomeScreen'
  import WalletScreen from './components/WalletScreen'
  import TransactionScreen from './components/TransactionScreen'
  import BroadcastScreen from './components/BroadcastScreen'
  import BarcodeScreen from './components/BarcodeScreen'
  
  const App = createStackNavigator({
	Home: { screen: HomeScreen },
	Wallet: { screen: WalletScreen },
	Transaction: { screen: TransactionScreen },
  Broadcast: { screen: BroadcastScreen },
  Barcode: { screen: BarcodeScreen}
  });
  
export default App;