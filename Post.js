import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const profileImageSize = 36;
const padding = 12;

export default class Post extends React.Component {
  state = {
    width: 0,
    height: 0
  };

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
    }, err => console.log(err))
  }


  render() {
    const { post, photo } = this.props;
    const { width, height } = this.state

    // Reduce the name to something

    return (
      <View>
        <Header image={ require('./trump_profile.jpg') } name='TheForRealDonaldTrump' />
          <Image style={{width:500, height:500 }} source={{uri:this.props.photo}} />
        <Metadata name='TheForRealDonaldTrump' description={post} />
      </View>
    );
  }
}

const Metadata = ({ name, description }) => (
  <View style={{paddingLeft:5, paddingRight: 5}}>
    <IconBar />
    <Likes />
    <Text><Text style={styles.text}>{name} </Text><Text style={styles.subtitle}>{description}</Text></Text>
    <Comments />
    <Time />
  </View>
);

const Header = ({ name, image }) => (
  <View style={[styles.row, styles.padding]}>
    <View style={styles.row}>
      <Image style={styles.avatar} source={image} />
      <Text style={styles.text}>{name}</Text>
    </View>
    <FAIcon name="ellipsis-v" />
  </View>
);

const FAIcon = ({ name }) => (
  <Icon style={{ marginRight: 8 }} name={name} size={26} color="black" />
);

const IconBar = () => (
  <View style={styles.row}>
    <View style={styles.row}>
      <FAIcon name="heart-o" />
      <FAIcon name="comment-o" />
      <FAIcon name="send-o" />
    </View>
    <FAIcon name="bookmark-o" />
  </View>
);
const Time = () => {
  const time = Math.floor(Math.random()*50) + 10
  return (<Text style={styles.time}>{time} MINUTES AGO</Text>)

}

const Comments = () => {
  const comments = Math.floor(Math.random()*10000) + 10000
  return (<Text style={styles.comments}>View all {comments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} comments</Text>)
}

const Likes = () => {
  const likes = Math.floor(Math.random()*20000) + 10000
  return (<Text style={styles.text}>{likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} likes</Text>)
}

const styles = StyleSheet.create({
  text: { fontWeight: '600', color: 'black' },
  subtitle: {
    color: 'black'
  },
  comments: {
    opacity: 0.8
  },
  time: {
    opacity: 0.8,
    fontSize: 10,
    paddingBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5
  },
  padding: {
    padding,
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: '#D8D8D8',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: 'cover',
    marginRight: padding,
  },
});
