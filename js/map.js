var map;
var chapelHill = {lat: 35.9132, lng: -79.0558};
var house = {lat: 35.918485, lng: -79.048911};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: chapelHill,
    zoom: 14,
  });

  var marker = new google.maps.Marker({position: chapelHill, map: map});
  var marker = new google.maps.Marker({position: house, map: map});
}
