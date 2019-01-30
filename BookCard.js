import React, { Component } from 'react';
import { FlatList, Dimensions, TouchableOpacity, Platform, StyleSheet, Text, View, Image, Linking } from 'react-native';
import { Card } from 'react-native-elements'

class BookCard extends Component {

  state = {
    width:0,
    height:0
  }

  componentDidMount = async () => {
    await Image.getSize(this.props.photo, (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get('window').width
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      this.setState(() => {
        return ({
          width: screenWidth,
          height: imageHeight
        })
      })
    })
  }

  render() {
    return (
      <View>
      <Image style={{width: this.state.width, height:this.state.height }} source={{uri:this.props.photo}} />
      <Text>{this.props.post}</Text></View>
    )
  }
}

export default BookCard
