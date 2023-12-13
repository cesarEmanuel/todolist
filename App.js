import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import CrearTarea from './screens/CrearTarea';
import Listartareas from './screens/Listartareas';
import EditarTarea from './screens/EditarTarea';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CrearTarea" component={CrearTarea} />
        <Stack.Screen name="Listartareas" component={Listartareas} />
        <Stack.Screen name="EditarTarea" component={EditarTarea} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
