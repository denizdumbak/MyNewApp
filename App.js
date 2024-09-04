import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/components/LoginScreen';
import SignupScreen from './src/components/SignupScreen';
import ToDoScreen from './src/components/ToDoScreen';
import UserScreen from './src/components/UserScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AddUser from './src/components/AddUser';
import UserProfile from './src/components/UserProfileScreen';
import UpdateUser from './src/components/UpdateUser';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='login' component={LoginScreen} />
          <Stack.Screen name='signup' component={SignupScreen} />
          <Stack.Screen name='todo' component={ToDoScreen} />
          <Stack.Screen name='user' component={UserScreen} />
          <Stack.Screen name='addUser' component={AddUser} />
          <Stack.Screen name='userProfile' component={UserProfile} />
          <Stack.Screen name='updateUser' component={UpdateUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

