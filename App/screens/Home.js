import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { format } from 'date-fns';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../constants/colors';
import { ConversionInput } from '../components/ConversionInput';
import { Button } from '../components/Button';
import { KeyboardSpacer } from '../components/KeyboardSpacer';
import { ConversionContext } from '../util/ConversionContext';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    flex: 1,
  },
  content: {
    paddingTop: screen.height * 0.1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoBackgound: {
    width: screen.width * 0.45,
    height: screen.width * 0.5,
  },
  logo: {
    position: 'absolute',
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  textHeader: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
    textAlign: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
  header: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
  },
});

export default ({ navigation }) => {
  const [value, setValue] = useState('');
  const {
    baseCurrency,
    quoteCurrency,
    swapCurrencies,
    date,
    rates,
    isLoading,
  } = useContext(ConversionContext);

  const conversionRate = rates[quoteCurrency];

  console.log(conversionRate);

  const [scrollEnabled, setScrollEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <StatusBar barStyle='light-content' backgroundColor={colors.blue} />

        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={() => navigation.push('Options')}>
            <Entypo name='cog' size={32} color={colors.white} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/background.png')}
              style={styles.logoBackgound}
            />
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode='contain'
            />
          </View>

          <Text style={styles.textHeader}>Currency Converter</Text>

          {isLoading ? (
            <ActivityIndicator color={colors.white} size='large' />
          ) : (
            <>
              <ConversionInput
                text={baseCurrency}
                value={value}
                onButtonPress={() =>
                  navigation.push('CurrencyList', {
                    title: 'Base Currency',
                    isBaseCurrency: true,
                  })
                }
                onChangeText={(text) => setValue(text)}
                keyboardType='numeric'
              />

              <ConversionInput
                text={quoteCurrency}
                value={value && `${(parseFloat(value) * conversionRate).toFixed(3)}`}
                onButtonPress={() =>
                  navigation.push('CurrencyList', {
                    title: 'Quote Currency',
                    isBaseCurrency: false,
                  })
                }
                editable={false}
              />

              <Text style={styles.text}>
                {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${date &&
                  format(new Date(date), 'yyyy-MM-dd')}`}
              </Text>

              <Button text='Reverse Currencies' onPress={() => swapCurrencies()} />
            </>
          )}

          <KeyboardSpacer
            onToggle={(keyboardIsVisible) => setScrollEnabled(keyboardIsVisible)}
          />
        </View>
      </ScrollView>
    </View>
  );
};
