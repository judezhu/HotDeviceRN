import {
	createStackNavigator,
  } from 'react-navigation';
  import HomeScreen from './components/HomeScreen'
  import WalletConfigScreen from './components/WalletConfigScreen'
  import TransactionScreen from './components/TransactionScreen'
  import BroadcastScreen from './components/BroadcastScreen'
  
  const App = createStackNavigator({
	Home: { screen: HomeScreen },
	WalletConfig: { screen: WalletConfigScreen },
	Transaction: { screen: TransactionScreen },
	Broadcast: { screen: BroadcastScreen },
  });
  
export default App;