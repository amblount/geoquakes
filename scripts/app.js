// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var info = $('#info');
var map = $('#map');
var stuff;
var earthquakes;

var map;
var latLong = { lat: 37.78, lng: -122.44};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: latLong,
    zoom: 8
  });
};
// send source to handlebars function


// earthquake data
// var earthquakeData = template({ earthquake : earthquakes})

// What is the structure of the data? object
// How many earthquakes does it list? 80
// How would you grab the first earthquake?
// earthquakes.features[0];
// How would you grab it's title? earthquakes.features[0].properties.title
// earthquakes.features[0].properties.place;
// How would you grab it's geological coordinates:
// earthquakes.features[0].geometry.coordinates
// latitude? unsure earthquakes.features[0].properties
// longitude?
// When did it happen? earthquakes.features[0].properties.time
// How many hours ago is that?

$(document).on("ready", function() {
  initMap();
  var source = $('#earthquake-data').html();
  var template = Handlebars.compile(source);

  $.get(weekly_quakes_endpoint,function(data){
    stuff = data;
    var earthquakes = data.features.map(function(earthquake) {
      return {
        title: earthquake.properties.title,
        time: earthquake.properties.time,
        latLong: {
          lat: earthquake.geometry.coordinates[0],
          lng: earthquake.geometry.coordinates[1]
        }
      }
    })

    earthquakes.forEach(function(q){
      var marker = new google.maps.Marker({
        position: q.latLong,
        map: map
      })
    })
          console.log(earthquakes);
    var earthquakeData = template({ earthquake : earthquakes})
    $('#info').append(earthquakeData);
  });


});
