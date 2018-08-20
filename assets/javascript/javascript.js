
// $(document).ready(function () {

// accepted ajax GET address format:
// 1555 Blake St, Denver, CO 80202
// 39.8427548 || 39.842736599999995
// -104.96166260000001 || -104.9616483

    var apiKey = "FX1GGwHVna3hSW5VqqYNR8FOjqQhDdlM";

    // var deviceLatitude = 39.8427;
    // var deviceLongitude = -104.9616;
    // console.log(deviceLatitude);
    // console.log(deviceLongitude);
    // var deviceLocSearchStr;
    // console.log(deviceLocSearchStr);
    var origin = "2105+Coronado+Pkwy+N,Denver,CO80229";
    var dest = "1901+East+Asbury+Avenue,Denver,CO";

    // var reverseGeocode = "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + apiKey + "&location=" + deviceLatitude + "," + deviceLongitude + "&includeRoadMetadata=true&includeNearestIntersection=true";
    // console.log("reverseGeocode : " + reverseGeocode);

    // var route = "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + origin + "&to=" + dest + "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false";
    // console.log("route : " + route);

    // var routePed = "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + origin + "&to=" + dest + "&outFormat=json&ambiguities=ignore&routeType=pedestrian&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false";
    // console.log("routePed : " + routePed);

    // if device geolocation exists
    if (navigator.geolocation) {
        // grab device latitude and longitude
        navigator.geolocation.getCurrentPosition(function (position) {
        // navigator.geolocation.watchPosition(function (position) {
            deviceLatitude = position.coords.latitude;
            deviceLongitude = position.coords.longitude;
            console.log(deviceLatitude);
            console.log(deviceLongitude);
            if (deviceLatitude && deviceLongitude) {
            doAjax()
            };
        });
        // else warn and offer manual entry
        }
        else {
            $("#home_location_input").attr("placeholder", "Geolocation is not available on this device. Enter current address.");
        };
    // ^ device geolocation

    function doAjax() {
            $.ajax({
                url: "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + apiKey + "&location=" + deviceLatitude + "," + deviceLongitude + "&includeRoadMetadata=true&includeNearestIntersection=true",
                method: "GET"
            }).then(function (response) {
                deviceLocation = response.results[0].locations[0].street + "," + response.results[0].locations[0].adminArea5 + "," + response.results[0].locations[0].adminArea3 + response.results[0].locations[0].postalCode;
                $("#start_address_input").val(response.results[0].locations[0].street);
                $("#start_city_input").val(response.results[0].locations[0].adminArea5);
                $("#start_state_input").val(response.results[0].locations[0].adminArea3);
                $("#start_zip_input").val(response.results[0].locations[0].postalCode);
                deviceLocSearchStr = deviceLocation.replace(/\s/g, "+");
                console.log("deviceLocSearchStr : " + deviceLocSearchStr);
                return(deviceLocSearchStr);
            });

            $.ajax({
                url: "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + origin + "&to=" + dest + "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false",
                method: "GET"
            }).then(function (response) {
                timeEstimate = response.route.legs[0].formattedTime;
                console.log("timeEstimate : " + timeEstimate);
            });

            $.ajax({
                url: "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + origin + "&to=" + dest + "&outFormat=json&ambiguities=ignore&routeType=pedestrian&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false",
                method: "GET"
            }).then(function (response) {
                timeEstimatePed = response.route.legs[0].formattedTime;
                console.log("timeEstimatePed : " + timeEstimatePed);
            });

    };

    $("#add-info").on("click", function (event) {
        event.preventDefault();
        name = $("#name_input").val().trim();
        home = $("#start_address_input").val().trim();
        destination = $("#end_address_input").val().trim();
        destCity = $("#end_city_input").val().trim();
        destState = $("#end_state_input").val().trim();
        destZip = $("#end_zip_input").val().trim();
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

// });

