import React from 'react';
import { View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { Constants } from 'expo';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import store from './src/store';
import LoginForm from './src/screens/LoginForm';
import EmployeeListScreen from './src/screens/EmployeeListScreen';
import EmployeeCreateScreen from './src/screens/EmployeeCreateScreen';
import EmployeeEditScreen from './src/screens/EmployeeEditScreen';

console.ignoredYellowBox = ['Setting a timer'];

export default class App extends React.Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyD8g-SWv4eiIOAq7wSNFAiKtWSUe613jyQ',
      authDomain: 'employees-5ecdf.firebaseapp.com',
      databaseURL: 'https://employees-5ecdf.firebaseio.com',
      projectId: 'employees-5ecdf',
      storageBucket: 'employees-5ecdf.appspot.com',
      messagingSenderId: '374290633205'
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const employeeHomeScreen = createStackNavigator({
  empList: EmployeeListScreen,
  empCreate: EmployeeCreateScreen,
  empEdit: EmployeeEditScreen
});
const MainNavigator = createSwitchNavigator({
  loginForm: LoginForm,
  main: employeeHomeScreen
});

const styles = {
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : Constants.statusBarHeight, 
  },
};
