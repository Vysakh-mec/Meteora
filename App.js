import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/screens/HomeScreen"
import { StatusBar } from 'expo-status-bar';
import MoreScreen from './src/screens/MoreScreen';
import Color from './src/constant/Color';

export default function App() {

  const Stack = createStackNavigator()
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        animation:"fade"
      }} >
        <Stack.Screen name='home' component={HomeScreen} options={{
          headerShown:false
        }} />
        <Stack.Screen name='more' component={MoreScreen}  options={{
          headerTitle:"Next 7 Days",
          headerStyle:{
            backgroundColor:Color.background
          },
          headerTintColor:Color.primaryText,
          headerTitleAlign:"center"
        }} />
      </Stack.Navigator>
      <StatusBar style='light' />
    </NavigationContainer>
  );
}
