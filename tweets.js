$( document ).ready(function() {
    loadTweets();
});


function loadTweets(){

    $.ajax({
            type:"GET",
            url:"js/tweets.json",
            dataType:"json",
            success: parseTweets
});

}

function parseTweets(data) {
  var tweets = [];
  var tempPath = data["tweets"];
  var html = "";
  var text = "";
  var profileImage = [];

  for (var i=0, len=tempPath.length; i<len; ++i) {
    tweets.push(tempPath[i]);

    html += '<div class="profile"><img src=' + tweets[i]["profileImage"] + ' /><h3>' + tweets[i]["screenName"] +'</h3></div>';
    html += '<p class="textoftweets">' + tweets[i]["text"] + '<p>';
}

$("#tweets").html(html);

}
