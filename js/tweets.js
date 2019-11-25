$( document ).ready(function() {
    loadTweets();
});


function loadTweets(){

    $.ajax({
            type:"GET",
            url: "https://www.googleapis.com/download/storage/v1/b/api-project-jpge/o/tweets.json?alt=media",
            dataType:"json",
            success: parseTweets
});

}

function parseTweets(data) {
  var tempPath = data["tweets"];
  var html = "";
  var text = "";
  var profileImage = [];

  for (var i=0, len=tempPath.length; i<len; ++i) {
    tweets.push(tempPath[i]);

    html += '<div class="profile"><img src=' + [i]["profileImage"] + ' /><h3>' + [i]["screenName"] +'</h3></div>';
    html += '<p class="textoftweets">' + [i]["text"] + '<p>';
}

$("#tweets").html(html);

}
