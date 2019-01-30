/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import BookCard from './BookCard'

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
    trumpPhotos: [],
    trumpPosts: []
  }

  getTrumpPhotoURLS = async () => {
    const trumpPhotosResponse = await fetch('https://www.googleapis.com/customsearch/v1?q=donald+trump+confused&cx=014195217728273069114%3Aerlm-4jgava&searchType=image&key=AIzaSyDZDSAQmP6vPHqT-gWncAytCOVuLVpod54')
    const trumpJson = await trumpPhotosResponse.json()
    const trumpPhotoURLS = trumpJson.items.map(trumpPhotoItem => {
      return trumpPhotoItem.link
    })
    return trumpPhotoURLS
  }

  makePosts = () => {
    const tweets = this.state.trumpTweets
    const photos = this.state.trumpPhotos
    const posts = []

    this.state.trumpPhotos.forEach( nada => {
      let randPhotoInd = Math.floor(Math.random()*photos.length)
      let randTweetInd = Math.floor(Math.random()*tweets.length)

      posts.push({photo: photos.splice(randPhotoInd,1)[0], post: tweets.splice(randTweetInd,1)[0].text})

    })
    return posts
  }

  setPosts = async () => {
    const trumpPosts = this.makePosts()
    console.log(trumpPosts)

    this.setState(prevState => {
      return ({
        trumpPosts
      })
    })
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
    }, this.setPosts)
  }

  componentDidMount = async () => {
    this.setTrumpsData()
  }

  render() {
    return (
      <View style={{padding:10}}>
      <FlatList data={this.state.trumpPosts}
        renderItem={({item}) => <BookCard {...item} />}
        keyExtractor={post => post.post.toString()}
        />
      </View>
    );
  }
}
