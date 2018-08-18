
$(document).ready(function () {

// accepted ajax GET address format:
// 1555 Blake St, Denver, CO 80202

var apiKey = "FX1GGwHVna3hSW5VqqYNR8FOjqQhDdlM";

var deviceLatitude;
var deviceLongitude;
var from = "2105+Coronado+Pkwy+N,Denver,CO";
var to = "1901+East+Asbury+Avenue,Denver,CO";

var altRoutes = "http://www.mapquestapi.com/directions/v2/alternateroutes?key=" + apiKey + "&from=" + from + "&to=" + to + "&maxRoutes=2&timeOverage=100";
console.log("altRoutes : " + altRoutes);

var optRoute = "http://www.mapquestapi.com/directions/v2/optimizedroute?key=" + apiKey + "&json={'locations':['Denver,CO','Westminster,CO','Boulder,CO']}";
console.log("optRoute : " + optRoute);

var route = "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + from + "&to=" + to + "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false";
console.log("route : " + route);

var reverseGeocode = "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + apiKey + "&location=30.333472,-81.470448&includeRoadMetadata=true&includeNearestIntersection=true";
console.log("reverseGeocode : " + reverseGeocode);

// var trafficDelays = "http://www.mapquestapi.com/traffic/v2/incidents?key=" + apiKey + "&boundingBox=39.95,-105.25,39.52,-104.71&filters=construction,incidents";

// var fromStr = topicArr[i].split("+").join(" ");

// if device geolocation exists populate current address
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    // else manual entry
    } else {
        $("#home_location_input").attr("placeholder", "Geolocation is not available on this device. Enter current address.");
    }

function showPosition(position) {
    $("#home_location_input").attr("placeholder", "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
    deviceLatitude = position.coords.latitude;
    deviceLongitude = position.coords.longitude;
    console.log(deviceLatitude);
    console.log(deviceLongitude);
}
// ^ geolocation ]

$.ajax({
    url: altRoutes,
    method: "GET"
}) // end $.ajax
    .then(function (responseAr) {
        console.log(responseAr);
        // console.log(responseAr.info);
        // console.log(responseAr.route);
    }); //end .then

$.ajax({
    url: optRoute,
    method: "GET"
}) // end $.ajax
    .then(function (responseOr) {
        // console.log(responseOr);
        // console.log(responseOr);
    }); //end .then

$.ajax({
    url: route,
    method: "GET"
}) // end $.ajax
    .then(function (response) {
        // console.log(response);
        // console.log(response.route);
    }); //end .then

$("#add-information-btn").on("click", function (event) {
    console.log(event);
    event.preventDefault();
    name = $("#name_input").val().trim();
    home = $("#home_location_input").val().trim();
    destination = $("#destination_input").val().trim();
    destCity = $("#inputCity").val().trim();
    destState = $("#inputState").val().trim();
    destZip = $("#inputZip").val().trim();
    // arrival = $("#arrival_time").val().trim();
    console.log("name : " + name);
    console.log("home : " + home);
    console.log("destination : " + destination);
    console.log("destCity : " + destCity);
    console.log("destState : " + destState);
    console.log("destZip : " + destZip);
    // console.log("arrival : " + arrival);
});

    $("form")[0].reset();

// var geocode = "http://www.mapquestapi.com/geocoding/v1/address?key=" + apiKey + "&location=" + from + "&thumbMaps=false";
// console.log("geocode : " + geocode);

// $.ajax({
    // url: geocode,
    // method: "GET"
// }) // end $.ajax
    // .then(function (responseGc) {
        // console.log(responseGc);
        // console.log(responseGc.results[0].locations);
    // }); //end .then

});

