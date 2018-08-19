
$(document).ready(function () {

// accepted ajax GET address format:
// 1555 Blake St, Denver, CO 80202
// 39.8427548 || 39.842736599999995
// -104.96166260000001 || 104.9616483

    var apiKey = "FX1GGwHVna3hSW5VqqYNR8FOjqQhDdlM";

    var deviceLatitude = 39.8427;
    var deviceLongitude = -104.9616;
    console.log(deviceLatitude);
    console.log(deviceLongitude);
    var origin = "2105+Coronado+Pkwy+N,Denver,CO";
    var dest = "1901+East+Asbury+Avenue,Denver,CO";

    var reverseGeocode = "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + apiKey + "&location=" + deviceLatitude + "," + deviceLongitude + "&includeRoadMetadata=true&includeNearestIntersection=true";
    console.log("reverseGeocode : " + reverseGeocode);

    var route = "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + origin + "&to=" + dest + "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false";
    console.log("route : " + route);

    var routePed = "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + origin + "&to=" + dest + "&outFormat=json&ambiguities=ignore&routeType=pedestrian&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false";
    console.log("routePed : " + routePed);

    // var fromStr = topicArr[i].split("+").join(" ");



    // if device geolocation exists
    if (navigator.geolocation) {
        // grab device latitude and longitude
        navigator.geolocation.getCurrentPosition(function (position) {
            deviceLatitude = position.coords.latitude;
            deviceLongitude = position.coords.longitude;
            console.log(deviceLatitude);
            console.log(deviceLongitude);
            doAjax()
        });
        // else warn and offer manual entry
        }
        else {
            $("#home_location_input").attr("placeholder", "Geolocation is not available on this device. Enter current address.");
        };
    // ^ device geolocation



    function doAjax() {
        if (deviceLatitude && deviceLongitude) {
            $.ajax({
                url: reverseGeocode,
                method: "GET"
            }).then(function (response) {
                deviceLocation = response.results[0].locations[0].street + "," + response.results[0].locations[0].adminArea5 + "," + response.results[0].locations[0].adminArea3 + response.results[0].locations[0].postalCode;
                $("#home_location_input").val(deviceLocation);
                console.log("deviceLocation : " + deviceLocation);
            });

            $.ajax({
                url: route,
                method: "GET"
            }).then(function (response) {
                timeEstimate = response.route.legs[0].formattedTime;
                console.log("timeEstimate : " + timeEstimate);
            });

            $.ajax({
                url: routePed,
                method: "GET"
            }).then(function (response) {
                timeEstimatePed = response.route.legs[0].formattedTime;
                console.log("timeEstimatePed : " + timeEstimatePed);
            });
        };
    };



    $("#add-information-btn").on("click", function (event) {
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
        console.log(event);
    });



        $("form")[0].reset();



    // function callMeWhenDone() {
    //     console.log("finished");
    // }

    // function doLongProcessWithCallback(param1, param2, callback) {
    //     //somelong operation
    //     // finished
    //     callMeWhenDone();
    // }

    // doLongProcessWithCallback("stringInput", 34, callMeWhenDone);

    // // ------------------------

    // var x = myFunction(4, 3);    // Function is called, return value will end up in x
    // console.log(x); // +
    // function myFunction(a, b) {
    //     return a * b;            // Function returns the product of a and b
    // }

});

