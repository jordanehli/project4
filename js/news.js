$( document ).ready(function() {
    loadData();
});



function loadData(){

    $.ajax({
            type:"GET",
            url:"https://newsapi.org/v1/sources",
            dataType:"json",
            success: parseData
});

// https://newsapi.org/v1/articles?source=the-verge&apiKey=8acf7f9ae33e4667bf4b29d1aad52657

}

function parseData(data){
  console.log(data);
  var sources = [];
  var tempPath = data["sources"];
  var html = "";

  for (var i=0, len=tempPath.length; i<len; ++i) {
    sources.push(tempPath[i]);
    console.log(sources[0]["name"]);

    html += '<li><a href="#" onclick="loadArticles(\'' + sources[i]["id"] + '\')">' + sources[i]["name"] + '</a></li>';

    // html += '<li class="nav-item"><a class="nav-link" href="#" onclick="loadArticles(\'' + sources[i]["id"] + '\')">' + sources[i]["name"] + '</a></li>';
  }

$("#sources-area").html(html);

}

function loadArticles(source) {
  console.log(source);

  $.ajax({
    type:"GET",
    url:"https://newsapi.org/v1/articles?source=" + source + "&apiKey=8acf7f9ae33e4667bf4b29d1aad52657",
    dataType:"json",
    success: parseArticles,
  });

}

function parseArticles(data) {
  var articles = [];
  var tempPath = data["articles"];
  var html = "";

  for (var i=0, len=tempPath.length; i<len; ++i) {
    articles.push(tempPath[i]);
    console.log(articles[i]["title"]);
    console.log(tempPath[i]["title"]);



    html += '<div><a href="' + articles[i]["url"] + '"><h3>' + articles[i]["title"] + '</a></h3></div>';
    html += '<p>' + articles[i]["description"] + '<p>'
    // html += '<li><a href="#" onclick="loadArticles(\'' + articles[i]["id"] + '\')">' + articles[i]["title"] + '</a></li>';
}

$("#feed-area").html(html);

}

//https://newsapi.org/v1/articles?source=techcrunch&apiKey=b33a41de4be74829a057f2248c0a40dc
//b33a41de4be74829a057f2248c0a40dc
