$( document ).ready(function() {
    loadTweets();
});


function loadTweets(){

    $.ajax({
            type:"GET",
            url: "https://www.googleapis.com/download/storage/v1/b/api-project-jpge/o/tweets.json?alt=media",
            dataType:"text",
            success: parseTweets
});

}

function parseTweets(data) {
  // var tempPath = data["tweets"];
  // var html = "";
  // var text = "";
  // var profileImage = [];

  for (var i=0, len=tempPath.length; i<len; ++i) {
    dataObj = $.parseJSON(tweets);
    // tweets.push(tempPath[i]);

    html += '<div class="profile"><img src=' + dataObj[i]["profileImage"] + ' /><h3>' + dataObj[i]["screenName"] +'</h3></div>';
    html += '<p class="textoftweets">' + dataObj[i]["text"] + '<p>';
}

$("#tweets").html(html);

}
