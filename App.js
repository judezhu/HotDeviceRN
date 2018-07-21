import {
	createStackNavigator,
  } from 'react-navigation';
//   import HomeScreen from './components/HomeScreen'
//   import WalletConfigScreen from './components/WalletConfigScreen'
  import TransactionScreen from './components/TransactionScreen'
  
  const App = createStackNavigator({
	// Home: { screen: HomeScreen },
	// WalletConfig: { screen: WalletConfigScreen },
	Transaction: { screen: TransactionScreen },
  });
  
export default App;