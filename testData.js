const unfilteredData = require('./test.js')
const trump2k9 = require('./trump2009')
const commonWords = require('./commonWords.js')
const fetch = require('node-fetch')




const data = unfilteredData.filter(word => {
  return !commonWords.includes(word)
})
const getTrumpPhotoURLS = async () => {
  const trumpPhotosResponse = await fetch('https://www.googleapis.com/customsearch/v1?q=donald+trump+confused&cx=014195217728273069114%3Aerlm-4jgava&searchType=image&key=AIzaSyDZDSAQmP6vPHqT-gWncAytCOVuLVpod54')
  const trumpJson = await trumpPhotosResponse.json()
  const trumpPhotoURLS = trumpJson.items.map(trumpPhotoItem => {
    return trumpPhotoItem.link
  })
  return trumpPhotoURLS
}

const confusedArray = trump2k9.reduce((tweets, tweet) => {
  data.some(word => {
    if (tweet.text.split(' ').includes(word)) {
      tweets.push(tweet)
    }
  })
  return tweets
}, [])

console.log(confusedArray)

getTrumpPhotoURLS().then(data => console.log(data))
