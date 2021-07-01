import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import Home from '../screens/Home';
import Options from '../screens/Options';
import CurrencyList from '../screens/CurrencyList';
import colors from '../constants/colors';
import { ConversionContextProvider } from '../util/ConversionContext';

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
    <MainStack.Screen name='Options' component={Options} />
  </MainStack.Navigator>
);

const ModalStack = createStackNavigator();
const ModalStackScreen = () => (
  <ModalStack.Navigator mode='modal'>
    <ModalStack.Screen
      name='Main'
      component={MainStackScreen}
      options={{ headerShown: false }}
    />
    <ModalStack.Screen
      name='CurrencyList'
      component={CurrencyList}
      options={({ route, navigation }) => ({
        title: route.params.title,
        headerLeft: null,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Entypo
              name='cross'
              size={30}
              color={colors.blue}
              style={{ paddingHorizontal: 10 }}
            />
          </TouchableOpacity>
        ),
      })}
    />
  </ModalStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <ConversionContextProvider>
      <ModalStackScreen />
    </ConversionContextProvider>
  </NavigationContainer>
);
