/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const confusedWordsUnfiltered = require('./test.js')
const trump2k9 = require('./trump2009')
const commonWords = require('./commonWords.js')
const data = confusedWordsUnfiltered.filter(word => {
  return !commonWords.includes(word)
})


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component < Props > {

  state = {
    trumpTweets: [],
    trumpPhotos: []
  }

  getTrumpPhotoURLS = async () => {
    const trumpPhotosResponse = await fetch('https://www.googleapis.com/customsearch/v1?q=donald+trump+confused&cx=014195217728273069114%3Aerlm-4jgava&searchType=image&key=AIzaSyDZDSAQmP6vPHqT-gWncAytCOVuLVpod54')
    const trumpJson = await trumpPhotosResponse.json()
    const trumpPhotoURLS = trumpJson.items.map(trumpPhotoItem => {
      return trumpPhotoItem.link
    })
    return trumpPhotoURLS
  }

  setTrumpsData = async () => {
    const trumpPhotos = await this.getTrumpPhotoURLS()
    const trumpTweets = trump2k9.reduce((tweets, tweet) => {
      data.some(word => {
        if (tweet.text.split(' ').includes(word)) {
          tweets.push(tweet)
        }
      })
      return tweets
    }, [])

    this.setState(prevState => {
      return ({
        trumpTweets,
        trumpPhotos
      })
    })
  }

  componentDidMount = async () => {
    this.setTrumpsData()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
