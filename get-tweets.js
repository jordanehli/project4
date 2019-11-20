const Twitter = require('twitter');
const config = require('./config.js');
const fs = require('fs');
const path = require('path');
const T = new Twitter(config);
const {Storage} = require('@google-cloud/storage');
const gc = new Storage({
  keyFilename: path.join(__dirname, '487ehlingergmproject-8bfa8927b9ce.json'),
  projectId: 'ehlingergmproject'
});

// gc.getBuckets().then(x => console.log(x));

const stream     = require('stream'),
      dataStream = new stream.PassThrough(),
      gcFile     = gc.bucket('api-project-jpge').file('tweets.json')


// name of GCS bucket
const storageBucket = gc.bucket('api-project-jpge');
//console.log(storageBucket);


console.log("Launching twitter-bot script");

// Set up your search parameters
const params = {
  q: '#zion national park',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

// Initiate your search using the above paramaters
T.get('search/tweets', params, (err, data, response) => {
  // If there is no error, proceed
  if(err){
    return console.log(err);
  }

  // Loop through the returned tweets
  const tweetsId = data.statuses
    .map(tweet => ({ id: tweet.id_str }));


  var tweets = [];
  for (var i=0; i<data.statuses.length; i++){
    console.log(data.statuses[i].text);

    tweets.push({id: data.statuses[i].id_str, screenName: data.statuses[i].user.screen_name, profileImage: data.statuses[i].user.profile_image_url_https, text: data.statuses[i].text});
    // var id = {id: data.statuses[i].id_str}

  };

  console.log(tweets);
  completeData=JSON.stringify(tweets);
  // fs.writeFileSync('tweets.json', completeData);
  console.log(completeData);
  console.log("----- saved as tweets.json -----");

  //saving file to GCS
  dataStream.push(completeData)
  dataStream.push(null)

  function saveFile(){
    console.log('saving file...');
  return new Promise((resolve, reject) => {
    dataStream.pipe(gcFile.createWriteStream({
      resumable  : false,
      validation : false,
      metadata   : {'Cache-Control': 'public, max-age=31536000'}
    }))

    })
    }


    saveFile();
    console.log("saved to GCS");
    console.log("https://storage.cloud.google.com/teaching-api/tweets.json");

  // tweetsId.map(tweetId => {
  //   T.post('favorites/create', tweetId, (err, response) => {
  //     if(err){
  //       return console.log(err[0].message);
  //     }
  //
  //     const username = response.user.screen_name;
  //     const favoritedTweetId = response.id_str;
  //     console.log(`Favorited: https://twitter.com/${username}/status/${favoritedTweetId}`);
  //
  //   });
  // });


})
