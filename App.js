/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import CardFormScreen from './src/Screens/CardFormScreen';
import AndroidPayScreen from './src/Screens/AndroidPay';
import ApplePayScreen from './src/Screens/ApplePayScreen';
import stripe from 'tipsi-stripe';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

stripe.setOptions({
  publishableKey: 'pk_test_V2CZyaN77u7THZZj3asS87LF',
  merchantId: 'MERCHANT_ID', // Optional
  androidPayMode: 'test' // Android only
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    renderScene: 'card'
  };

  handleScene = scene => {
    switch (scene) {
      case 'card':
        this.setState({ renderScene: 'card' });
        break;
      case 'android_pay':
        this.setState({ renderScene: 'android_pay' });
        break;
      case 'apple_pay':
        this.setState({ renderScene: 'apple_pay' });
        break;
      default:
        break;
    }
  };

  showScene = () => {
    switch (this.state.renderScene) {
      case 'card':
        return <CardFormScreen />;
      case 'android_pay':
        return <AndroidPayScreen />;
      case 'apple_pay':
        return <ApplePayScreen />;
      default:
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Button onPress={() => this.handleScene('card')} title="Fill card number" style={{ margin: 5 }} />
          <Button onPress={() => this.handleScene('android_pay')} title="Android pay" style={{ margin: 5 }} />
          <Button onPress={() => this.handleScene('apple_pay')} title="Apple pay" style={{ margin: 5 }} />
        </View>
        <View>{this.showScene()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
