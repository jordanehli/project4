$( document ).ready(function() {
  console.log("running")
    loadData();
});



function loadData(){
console.log('loadData')
    $.ajax({
            type:"GET",
            url:"https://www.googleapis.com/download/storage/v1/b/api-project-jpge/o/tweets.json?alt=media",
            dataType:"json",
            success: parseData
});

}

function parseData(data){
  console.log(data);
  $("#data-area").html(data);
  }
