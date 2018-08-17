
// accepted ajax GET address format:
// 1555 Blake St, Denver, CO 80202

var apiKey = "FX1GGwHVna3hSW5VqqYNR8FOjqQhDdlM";

// var from = "2105+Coronado+Pkwy+N,Denver,CO";
var from = "2105+Coronado+Pkwy+N,Denver,CO";
var to = "1901+East+Asbury+Avenue,Denver,CO";

var altRoutes = "http://www.mapquestapi.com/directions/v2/alternateroutes?key=" + apiKey + "&from=" + from + "&to=" + to + "&maxRoutes=2&timeOverage=100";
console.log("altRoutes : " + altRoutes);

var optRoute = "http://www.mapquestapi.com/directions/v2/optimizedroute?key=" + apiKey + "&json={'locations':['Denver,CO','Westminster,CO','Boulder,CO']}";
console.log("optRoute : " + optRoute);

var geocode = "http://www.mapquestapi.com/geocoding/v1/address?key=" + apiKey + "&location=" + to + "&thumbMaps=false";
console.log("geocode : " + geocode);

var route = "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + from + "&to=" + to + "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false";
console.log("route : " + route);

// var trafficDelays = "http://www.mapquestapi.com/traffic/v2/incidents?key=" + apiKey + "&boundingBox=39.95,-105.25,39.52,-104.71&filters=construction,incidents";

// console.log("optRoute : " + optRoute);

var fromStr = topicArr[i].split("+").join(" ");

$.ajax({
    url: altRoutes,
    method: "GET"
}) // end $.ajax
    .then(function (responseAr) {
        console.log(responseAr);
        // console.log(response.route);
    }); //end .then

$.ajax({
    url: optRoute,
    method: "GET"
}) // end $.ajax
    .then(function (responseOr) {
        console.log(responseOr);
        // var print = JSON.stringify(responseOr);
        // document.getElementById("test").innerHTML = JSON.stringify(responseOr);
    }); //end .then

$.ajax({
    url: geocode,
    method: "GET"
}) // end $.ajax
    .then(function (responseGc) {
        console.log(responseGc);
        // console.log(responseGc.info);
    }); //end .then

$.ajax({
    url: route,
    method: "GET"
}) // end $.ajax
    .then(function (response) {
        console.log(response);
        // console.log(response.route);
    }); //end .then

$("#add-information-btn").on("click", function (event) {
    console.log(event);
    event.preventDefault();
    name = $("#name_input").val().trim();
    home = $("#home_location_input").val().trim();
    destination = $("#destination_input").val().trim();
    arrival = $("#arrival_time").val().trim();
    console.log("name : " + name);
    console.log("home : " + home);
    console.log("destination : " + destination);
    console.log("arrival : " + arrival);
});

$("form")[0].reset();

