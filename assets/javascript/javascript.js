
$(document).ready(function () {

// accepted ajax GET address format:
// 1555 Blake St, Denver, CO 80202

    var apiKey = "FX1GGwHVna3hSW5VqqYNR8FOjqQhDdlM";

    var deviceLatitude = 39.8335904;
    var deviceLongitude = -104.95641979999999;
    var origin = "2105+Coronado+Pkwy+N,Denver,CO";
    var originStAddress = "2105+Coronado+Pkwy+N,Denver,CO";
    var originCity = "2105+Coronado+Pkwy+N,Denver,CO";
    var originState = "2105+Coronado+Pkwy+N,Denver,CO";
    var originZipCode = "2105+Coronado+Pkwy+N,Denver,CO";
    var dest = "1901+East+Asbury+Avenue,Denver,CO";
    var destStAddress = "1901+East+Asbury+Avenue,Denver,CO";
    var destCity = "1901+East+Asbury+Avenue,Denver,CO";
    var destState = "1901+East+Asbury+Avenue,Denver,CO";
    var destZipCode = "1901+East+Asbury+Avenue,Denver,CO";

    var reverseGeocode = "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + apiKey + "&location=" + deviceLatitude + "," + deviceLongitude + "&includeRoadMetadata=true&includeNearestIntersection=true";
    console.log("reverseGeocode : " + reverseGeocode);

    var route = "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + origin + "&to=" + dest + "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false";
    console.log("route : " + route);

    var altRoutes = "http://www.mapquestapi.com/directions/v2/alternateroutes?key=" + apiKey + "&from=" + origin + "&to=" + dest + "&maxRoutes=2&timeOverage=100";
    // console.log("altRoutes : " + altRoutes);

    var optRoute = "http://www.mapquestapi.com/directions/v2/optimizedroute?key=" + apiKey + "&json={'locations':['Denver,CO','Westminster,CO','Boulder,CO']}";
    // console.log("optRoute : " + optRoute);

    // var trafficDelays = "http://www.mapquestapi.com/traffic/v2/incidents?key=" + apiKey + "&boundingBox=39.95,-105.25,39.52,-104.71&filters=construction,incidents";

    // var fromStr = topicArr[i].split("+").join(" ");

// if device geolocation exists populate current address
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    // else warn and offer manual entry
    } else {
        $("#home_location_input").attr("placeholder", "Geolocation is not available on this device. Enter current address.");
    }
// grab device latitude and longitude
function showPosition (position) {
    deviceLatitude = position.coords.latitude;
    deviceLongitude = position.coords.longitude;
    $("#home_location_input").attr("placeholder", "Latitude: " + deviceLatitude + " Longitude: " + deviceLongitude);
    console.log(deviceLatitude);
    console.log(deviceLongitude);
}
// ^ device geolocation ]

$.ajax({
    url: reverseGeocode,
    method: "GET"
}).then(function (response) {
    geoLocation = response.results[0].locations[0].street + ", " + response.results[0].locations[0].adminArea5 + ", " + response.results[0].locations[0].adminArea3 + " " + response.results[0].locations[0].postalCode;
    console.log(geoLocation);
    console.log(response);
});

$.ajax({
    url: route,
    method: "GET"
}).then(function (response) {
    // console.log(response);
    // console.log(response.route);
});

$.ajax({
    url: altRoutes,
    method: "GET"
}).then(function (response) {
    // console.log(response);
    // console.log(response.info);
    // console.log(response.route);
});

$.ajax({
    url: optRoute,
    method: "GET"
}).then(function (response) {
    // console.log(response);
    // console.log(response);
});

$("#add-information-btn").on("click", function (event) {
    console.log(event);
    event.preventDefault();
    name = $("#name_input").val().trim();
    home = $("#home_location_input").val().trim();
    destination = $("#destination_input").val().trim();
    destCity = $("#inputCity").val().trim();
    destState = $("#inputState").val().trim();
    destZip = $("#inputZip").val().trim();
    console.log("name : " + name);
    console.log("home : " + home);
    console.log("destination : " + destination);
    console.log("destCity : " + destCity);
    console.log("destState : " + destState);
    console.log("destZip : " + destZip);
});

    $("form")[0].reset();

});

