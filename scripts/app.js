// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var info = $('#info');
var map = $('#map');
var earthquakes;


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
  var source = $('#earthquake-data').html();
  var template = Handlebars.compile(source);

  $.get(weekly_quakes_endpoint,function(data){
    var earthquakes = data.features.map(function(earthquake) {
      return {
        title: earthquake.properties.title,
        time: earthquake.properties.time
      }
    })
    var earthquakeData = template({ earthquake : earthquakes})
    $('#info').append(earthquakeData);

  })

});
