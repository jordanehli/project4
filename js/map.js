var map;
var zion = {lat: 37.200197, lng: -112.986891};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: zion,
    zoom: 14,
  });

  var marker = new google.maps.Marker({position: zion, map: map});
}
