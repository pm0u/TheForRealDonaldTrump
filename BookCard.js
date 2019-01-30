import React, { Component } from 'react';
import { FlatList, TouchableOpacity, Platform, StyleSheet, Text, View, Image, Linking } from 'react-native';
import { Card } from 'react-native-elements'

class BookCard extends Component {

  render() {
    return (
      <View>
      <Image style={{width: 300, height: 300}} source={{uri:this.props.photo}} />
      <Text>{this.props.post}</Text></View>
    )
  }
}

export default BookCard
