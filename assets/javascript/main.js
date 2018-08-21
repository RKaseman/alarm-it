



$(document).ready(function(){
 
    
    var config = {
        apiKey: "AIzaSyAsMpacVJ5ctV3xuIrprApLxsnM1KEfa8Y",
        authDomain: "alert-it.firebaseapp.com",
        databaseURL: "https://alert-it.firebaseio.com",
        projectId: "alert-it",
        storageBucket: "alert-it.appspot.com",
        messagingSenderId: "28982527602"
      };
      firebase.initializeApp(config);
    
    
        var database = firebase.database();
        
        var name;
        var inTime;
        var mode;
        var frequency;
    
        var startName;
        var startAddress;
        var startCity;
        var startState;
        var startZip;
    
        var endName;
        var endAddress;
        var endCity;
        var endState;
        var endZip;
    
        var inTime; //the user input directly from the type="time" button on setup
        var farrTime; // a formatted version of arrTime that will work in the moment syntax
        var arrTime; //supplied by use in set up on.click
        var timeToGo; //this is the total time from start of app to the arrival time
        var timeOuttheDoor= 0;  // this is the timeToGo minus travel time
        var timeStarted; //the actual time user started the countdown
        var timeTravel = 0;  //this is the travel time received from the map api
        var timeSinceStart = 0;  //this is the time the app was started, used to time frequence of messages
        var IntervalID;
        var clockRunning = false;
        var lastText = 0;  //used in alertIt.count to make sure don't generate the message more than once
        var textToVoice = "I have nothing to say right now."

        var arrTextFill = [ 
            {ontime: "Hey ",                 close:"Getting Close ",           late: "Oh no! "},
            {ontime: "Well ",                close:"Don't dilly dally ",       late: "Uh oh! "},
            {ontime: "Lookin good ",         close:"Time's getting close ",    late: "Too Late! "},
            {ontime: "Looks like a nice day ", close:"Don't panic yet, but ",         late: "Now were'r in trouble! "},
            {ontime: "Hows it going ",       close:"Time to get with it ",     late: "This is not good! "},
            {ontime: "So ",                  close:"Not much time ",           late: "I hate to tell you this! "}
        ];

        var arrMidText = [
            {ontime: " we're looking at  ",                 close:" I'm getting a little concerned here because we're down to only "},
            {ontime: " we still have  ",                 close:" It's almost time to panic because we only have  "},
            {ontime: " we don't have to rush because we still have  ",   close:" stop messing with your hair! We only have  "},
            {ontime: " easy does it, we still have   ",                 close:" we don't want to be late! We only have  "},
        ];

        var arrEndText = [
            {ontime: " minutes before time to leave.  ",                 close:" minutes before we gotta go! "},
            {ontime: " minutes before it's time to go.  ",                 close:" minutes before we have to hit the road! "},
            {ontime: " minutes until we need to be out the door.  ",                 close:" minutes before it's too late to make it on time! "},
            {ontime: " minutes before we need to go.  ",                 close:" minutes to get going if we're going to be on time! "},
        ];
    
        var getInput;
        var IntervalPeriod = (10 * 1000); //sets the time interval in seconds for checking status again 
        var setUpComplete = false;
        var firstMessage = false;
        var speakNow;
        var timeToLeave;
        var formattedTimeToLeave;


var alertIt = {

    setUp: function() {


        var apiKey = "FX1GGwHVna3hSW5VqqYNR8FOjqQhDdlM";
        var deviceLatitude;
        var deviceLongitude;
        var deviceLocSearchStr;
        var destSearchStr;

        // if device geolocation exists
        if (navigator.geolocation) {
            // grab device latitude and longitude
            navigator.geolocation.getCurrentPosition(function (position) {
                // navigator.geolocation.watchPosition(function (position) {
                deviceLatitude = position.coords.latitude;
                deviceLongitude = position.coords.longitude;
                doAjaxGl();
            })
            // else warn and offer manual entry
        }
        else {
            $("#home_location_input").attr("placeholder", "Geolocation is not available on this device. Enter current address.");
        }
// ^ device geolocation

        function doAjaxGl() {

            if (deviceLatitude && deviceLongitude) {
                $.ajax({
                    url: "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + apiKey + "&location=" + deviceLatitude + "," + deviceLongitude + "&includeRoadMetadata=true&includeNearestIntersection=true",
                    method: "GET"
                }).then(function (response) {
                    var shortZip = response.results[0].locations[0].postalCode.split("-");
                    deviceLocation = response.results[0].locations[0].street + "," + response.results[0].locations[0].adminArea5 + "," + response.results[0].locations[0].adminArea3 + shortZip[0];
                    $("#start_address_input").val(response.results[0].locations[0].street);
                    $("#start_city_input").val(response.results[0].locations[0].adminArea5);
                    $("#start_state_input").val(response.results[0].locations[0].adminArea3);
                    $("#start_zip_input").val(response.results[0].locations[0].postalCode);
                    deviceLocSearchStr = deviceLocation.replace(/\s/g, "+");
                    console.log("ok : ", deviceLatitude);
                    console.log("ok : ", deviceLongitude);
                    console.log("ok : ", deviceLocSearchStr);

                })
            } // end doAjaxGl if
        } // end doAjaxGl

        function doAjaxRt() {
            $.ajax({
                url: "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + deviceLocSearchStr + "&to=" + destSearchStr + "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false",
                method: "GET"
            }).then(function (response) {
                timeEstimate = response.route.legs[0].formattedTime;
                console.log("deviceLocSearchStr : ", deviceLocSearchStr);
                console.log("timeEstimate : " + timeEstimate);
                console.log("destSearchStr : " + destSearchStr);
                console.log(response);
            })
        } // end .then doAjaxRt

        function doAjaxPed() {
            $.ajax({
                url: "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + deviceLocSearchStr + "&to=" + destSearchStr + "&outFormat=json&ambiguities=ignore&routeType=pedestrian&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false",
                method: "GET"
            }).then(function (response) {
                timeEstimatePed = response.route.legs[0].formattedTime;
                console.log("timeEstimatePed : " + timeEstimatePed);
            })
        } // end .then doAjaxPed

        $("#add-info").on("click", function(event){
            event.preventDefault();
        
            // get user input values
           setUpComplete = false; 

           getInput = {

                name: $("#name_input").val().trim(),
                inTime: $("#arrive_time").val().trim(),
                mode: $('input:radio[name="modeOption"]:checked').val(),
                frequency: parseInt($("#frequency_input").val().trim()),

                startName: $("#start_name_input").val().trim(),
                startAddress: $("#start_address_input").val().trim(),
                startCity: $("#start_city_input").val().trim(),
                startState: $("#start_state_input").val().trim(),
                startZip: $("#start_zip_input").val().trim(),

                endName: $("#end_name_input").val().trim(),
                endAddress: $("#end_address_input").val().trim(),
                endCity: $("#end_city_input").val().trim(),
                endState: $("#end_state_input").val().trim(),
                endZip: $("#end_zip_input").val().trim()
            }

            // validate user input
       function checker() {
        var invalidArray = []
         for (var key in getInput) {

             if (!getInput[key]) {
                 invalidArray.push(key);
             }
         }
             // alert if user inputs are invalid
         if(invalidArray.length) {
             var field_alert = "";
             for (let i = 0; i < invalidArray.length; i++) {
                 field_alert += ", " + invalidArray[i];

             }
             alert("these inputs are invalid: " + field_alert);
             return false;
         } else {
             return true;
         }

     }
            
//*********** check to see that the input form has been completed before allowing start-aler button to be pushed

                //if (name = "empty")
                if(checker()) {
                    setUpComplete = true;
                    alertIt.startCountDown()
                } 


                console.log(getInput.startAddress);
                console.log(getInput.endAddress);
                console.log(getInput.endCity);
                console.log(getInput.endState);
                console.log(getInput.endZip);
                streetStr = getInput.endAddress.replace(/\s/g, "+");
                destSearchStr = streetStr + "," + getInput.endCity + "," + getInput.endState + getInput.endZip;
                console.log(destSearchStr);
                console.log(streetStr);
                doAjaxRt();
                doAjaxPed();


            // reset form fields
            $("form")[0].reset();

        // start the countdown!
        
        });
    },

   startCountDown: function() {

    $("#start-alert").on("click", function(event){
        event.preventDefault();

        if (setUpComplete) { 
            alertIt.start();
        } else {
            alert("Please complete all parts of the set up form and submit it.");
            alertIt.setUp();
        }
        $("#form-show").hide();
        $("#start-alert").hide();
        $("#current_time_display").text("Hello!"); 

        alertIt.calcTimes();

        firstMessage = true;
        alertIt.generateMessage();
         
    });
   },

    calcTimes: function() {
        arrTime = moment().hour(parseInt(getInput.inTime.charAt(0) + getInput.inTime.charAt(1))).minute(parseInt(getInput.inTime.charAt(3) + getInput.inTime.charAt(4)));
        farrTime = arrTime.format("hh:mm A");
        timeToGo = arrTime.diff(moment(),"minutes");
        timeTravel = alertIt.getTimeTravel();
        timeOuttheDoor = timeToGo - timeTravel;  //timeTravle not found yet  from map api
        timeSinceStart = moment().diff(timeStarted, "minutes");
        timeToLeave = arrTime.subtract(timeTravel,"minutes");
        formattedTimeToLeave = timeToLeave.format("hh:mm A");

    },

    start: function() {
        
        timeStarted = moment();

    //start the countdown!
        if (!clockRunning) {
          intervalId = setInterval(alertIt.count, IntervalPeriod);  //this can be once every 30 or 60 seconds once it all works
          clockRunning = true;
        }
      },

    count: function() {
            alertIt.calcTimes();


    // Check to see if it is time to generate a reminder
        if (timeSinceStart > 0 && timeSinceStart % getInput.frequency == 0 && timeSinceStart != lastText) {
            alertIt.generateMessage();
        } 

        lastText = moment().diff(timeStarted, "minutes");

            alertIt.updateUI();

       },

    updateUI: function(){

        $("#current_time_display").text("The current time is: " + moment().format("hh:mm A"));
        $("#arrival_time_display").text("Your planned arrival time at " + getInput.endName + " is: " + farrTime);
        $("#travel_time_display").text("Travel time by " + getInput.mode + " today is " + timeTravel + " minutes.");
        $("#leave_time_display").text("You need to leave here by: " + formattedTimeToLeave);

        $("#leave_minutes_display").text("You need to leave in " + timeOuttheDoor + " minutes."); 
       },

    generateMessage: function() {

        textToVoice = ""
        var lng = arrTextFill.length;

        if (firstMessage) {

            textToVoice = "Good morning " + getInput.name + ", I'll look forward to spending time with you today. Based on a travel time of " + timeTravel + " minutes if you " + getInput.mode +  ", you will need to leave  here at " + formattedTimeToLeave + " to make it to " + getInput.endName + " by " + farrTime + ". That's "+ timeOuttheDoor + " minutes from now. It will be cloudy with a high of 75 today and a chance for rain this afternoon. I'll give you a few moments to brush your teeth and then I'll be back.";

            console.log("text to voice first message: " + textToVoice);
            

            firstMessage = false;

            $("#alert_display").text(textToVoice);

            alertIt.makeVoice();

        } else {

                if (timeOuttheDoor < 0){   //they are too late now

                     greetText = arrTextFill[Math.floor(Math.random() * arrTextFill.length)].late;
                     nameText = getInput.name  + ", ";
                     midText = " we're not going to make it on time are we? We should have been out the door ";
                     endText = " minutes ago. Let's try it again tomorrow!";
                        timeOuttheDoor = Math.abs(timeOuttheDoor);
                    clearInterval(intervalId);

                } else if (timeOuttheDoor < 15) {  // it's getting real close

                     greetText = arrTextFill[Math.floor(Math.random() * arrTextFill.length)].close;
                     nameText = getInput.name + ", ";
                     midText = arrMidText[Math.floor(Math.random() * arrMidText.length)].close;
                     endText = arrEndText[Math.floor(Math.random() * arrEndText.length)].close;

                } else {   //still plenty of time

                     greetText = arrTextFill[Math.floor(Math.random() * arrTextFill.length)].ontime;
                     nameText = getInput.name + ", ";
                     midText = arrMidText[Math.floor(Math.random() * arrMidText.length)].ontime;
                     endText = arrEndText[Math.floor(Math.random() * arrEndText.length)].ontime;
                }

                    textToVoice = greetText + nameText + midText + timeOuttheDoor + endText;
                    $("#alert_display").text(textToVoice);
                    alertIt.makeVoice();
                
                    }
       },
  
       makeVoice: function(){
        var audioClip;
        var queryUrl ="http://api.voicerss.org/?key=6d2a15e828bf429d94e8584c50d4accd&hl=en-us&b64=true&";
        var setWord= "src=" + textToVoice;
        var speekNow= queryUrl + setWord;
                $.ajax({
                url:speekNow,
                method:"get",
 
          }).then(function(response) {
              audioClip = document.createElement("audio");
              audioClip.setAttribute("src", response);
              audioClip.play();
 
        });
        console.log(textToVoice);
        console.log(speekNow);
        console.log(setWord);
       },


       getTimeTravel: function() {
        //input from the map api goes here  

        if (getInput.mode == "drive") {
            timeTravel = 25;
        } else if (getInput.mode == "bus") {
            timeTravel = 45;
        } else {
            timeTravel = 75;
        }

        return timeTravel;  //a placeholder

       }
 //alertIt
};
 
alertIt.setUp();

//doc ready
});
