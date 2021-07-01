import React from 'react';
import { SafeAreaView, ScrollView, Linking, Alert, StatusBar } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import colors from '../constants/colors';
import { RowItem, RowSeparator } from '../components/RowItem';

const openUrl = (url) => {
  return Linking.openURL(url).catch(() => {
    Alert.alert('Invalid URL');
  });
};

export default () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
        <RowItem
          onPress={() => alert('New themes coming soon!')}
          text='Themes'
          rightIcon={<Entypo name='chevron-right' size={20} color={colors.blue} />}
        />

        <RowSeparator />

        <RowItem
          onPress={() =>
            openUrl(
              'https://learn.handlebarlabs.com/p/react-native-basic-build-a-currency-converter'
            )
          }
          text='React Native Basics'
          rightIcon={<Entypo name='export' size={20} color={colors.blue} />}
        />

        <RowSeparator />

        <RowItem
          onPress={() => openUrl('https://reactnativebyexample.com')}
          text='React Native by Example'
          rightIcon={<Entypo name='export' size={20} color={colors.blue} />}
        />

        <RowSeparator />

        <RowItem
          onPress={() => openUrl('https://azbitco.in/')}
          text='AZ Bitcoin Website'
          rightIcon={<Entypo name='export' size={20} color={colors.blue} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
