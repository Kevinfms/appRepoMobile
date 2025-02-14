import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';



import Home from './src/pages/Home/home';
import DetalhesCliente from './src/pages/DetalhesCliente/detailsClients';
import NovoCliente from './src/pages/NovoCliente/newClient';
import TodosClientes from './src/pages/TodosCliente/allClients';
import EditarCliente from './src/pages/EditarCliente/editClients';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider styles={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>


          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              title: 'Contatos'
            }}
           
          />

          <Stack.Screen
            name='DetalhesCliente'
            component={DetalhesCliente}
            options={{
              title: 'Destalhes Cliente'
            }}
          />

          <Stack.Screen
            name='NovoCliente'
            component={NovoCliente}
            options={{
              title: 'Novo Cliente',
              
             
              
            }}
          />

          <Stack.Screen
            name='TodosClientes'
            component={TodosClientes}
            options={{
              title: 'Exibir clientes'
            }}
          />


          <Stack.Screen
            name='EditarCliente'
            component={EditarCliente}
            options={{
              title: 'Editar cliente'
            }}
          />



        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
