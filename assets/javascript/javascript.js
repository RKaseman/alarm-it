
// accepted ajax GET address format:
// 1555 Blake St, Denver, CO 80202

// var apiKey = "FX1GGwHVna3hSW5VqqYNR8FOjqQhDdlM";

// var deviceLatitude;
// var deviceLongitude;
// var deviceLocSearchStr;
// var destSearchStr;
// var origin;
// var origin = "2105+Coronado+Pkwy+N,Denver,CO80229";
// var dest;
// var dest = "1901+East+Asbury+Avenue,Denver,CO";
// var dest = "2105+Coronado+Pkwy+N,Denver,CO80229";

// // if device geolocation exists
// if (navigator.geolocation) {
//     // grab device latitude and longitude
//     navigator.geolocation.getCurrentPosition(function (position) {
//         // navigator.geolocation.watchPosition(function (position) {
//         deviceLatitude = position.coords.latitude;
//         deviceLongitude = position.coords.longitude;
//         console.log("ok: ", deviceLatitude);
//         console.log("ok: ", deviceLongitude);
//         doAjax();
//     })
//     // else warn and offer manual entry
// }
// else {
//     $("#home_location_input").attr("placeholder", "Geolocation is not available on this device. Enter current address.");
// }
// // ^ device geolocation

// function doAjax() {

//     if (deviceLatitude && deviceLongitude) {

//         $.ajax({
//             url: "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + apiKey + "&location=" + deviceLatitude + "," + deviceLongitude + "&includeRoadMetadata=true&includeNearestIntersection=true",
//             method: "GET"

//         }).then(function (response) {

//             var shortZip = response.results[0].locations[0].postalCode.split("-");
//             deviceLocation = response.results[0].locations[0].street + "," + response.results[0].locations[0].adminArea5 + "," + response.results[0].locations[0].adminArea3 + shortZip[0];
//             $("#start_address_input").val(response.results[0].locations[0].street);
//             $("#start_city_input").val(response.results[0].locations[0].adminArea5);
//             $("#start_state_input").val(response.results[0].locations[0].adminArea3);
//             $("#start_zip_input").val(response.results[0].locations[0].postalCode);
//             deviceLocSearchStr = deviceLocation.replace(/\s/g, "+");
//             console.log("ok : ", deviceLatitude);
//             console.log("ok : ", deviceLongitude);
//             console.log("ok : ", deviceLocSearchStr);
//             console.log("? : ", origin);

//         }).then(function () {

//             $.ajax({
//                 url: "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + deviceLocSearchStr + "&to=" + destSearchStr + "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false",
//                 method: "GET"
//             }).then(function (response) {
//                 timeEstimate = response.route.legs[0].formattedTime;
//                 console.log("timeEstimate : " + timeEstimate);
//             }).then(function () {
//                 console.log("deviceLocSearchStr : ", deviceLocSearchStr);
//                 console.log("destSearchStr : " + destSearchStr);

//                 $.ajax({
//                     url: "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + deviceLocSearchStr + "&to=" + destSearchStr + "&outFormat=json&ambiguities=ignore&routeType=pedestrian&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false",
//                     method: "GET"
//                 }).then(function (response) {
//                     timeEstimatePed = response.route.legs[0].formattedTime;
//                     console.log("timeEstimatePed : " + timeEstimatePed);
//                 })
//             })
//         })
//     }
// }

// $("#add-info").on("click", function (event) {
//     event.preventDefault();
//     name = $("#name_input").val().trim();
//     home = $("#start_address_input").val().trim();
//     destination = $("#end_address_input").val().trim();
//     destCity = $("#end_city_input").val().trim();
//     destState = $("#end_state_input").val().trim();
//     destZip = $("#end_zip_input").val().trim();
//     streetStr = destination.replace(/\s/g, "+");
//     destSearchStr = streetStr + "," + destCity + "," + destState + destZip;
//     console.log("name : " + name);
//     console.log("home : " + home);
//     console.log("destination : " + destination);
//     console.log("destCity : " + destCity);
//     console.log("destState : " + destState);
//     console.log("destZip : " + destZip);
//     // console.log("destSearchStr : " + destSearchStr);
// })

// $("form")[0].reset();

// 2105 Coronado Pkwy N