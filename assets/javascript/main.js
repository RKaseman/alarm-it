

// Initialize Firebase
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
 

var name = "John Doe";
var inTime; //the user input directly from the type="time" button on setup
var farrTime; // a formatted version of arrTime that will work in the moment syntax
var arrTime; //supplied by use in set up on.click
var timeToGo; //this is the total time from start of app to the arrival time
var timeOuttheDoor= 0;  // this is the timeToGo minus travel time
var timeStarted; //the actual time user started the countdown
var timeTravel = 0;  //this is the travel time received from the map api
var timeSinceStart = 0;  //this is the time the app was started, used to time frequence of messages
var homeAddress;
var destAddress;
var frequency;  //this is the frequency of messages the use asked for in the setup
var IntervalID;
var clockRunning = false;
var lastText = 0;  //used in alertIt.count to make sure don't generate the message more than once
var textToVoice = "I have nothing to say right now."
var arrTextFill = [ 
                    {ontime: "Hey ",                 close:"Getting Close ",           late: "Oh no! "},
                    {ontime: "Well ",                close:"Don't dilly dally ",       late: "Uh oh! "},
                    {ontime: "Lookin good ",         close:"Time's getting close ",    late: "Too Late! "},
                    {ontime: "Nice day ",            close:"Don't panic, but ",         late: "Now were'r in trouble! "},
                    {ontime: "Hows it going ",       close:"Time to get with it ",     late: "This is not good! "},
                    {ontime: "So ",                  close:"Not much time ",           late: "I hate to tell you this! "}
                ];

var getInput;
var timeToGoTest;
var IntervalPeriod = (10 * 1000); //sets the time before checking status again 


$(document).ready(function(){
   
var alertIt = {

    setUp: function() {

        $("#add-info").on("click", function(event){
            event.preventDefault();
        
            // get user input values
        
           getInput = {
                name: $("#name-in").val().trim(),
                inTime: $("#arrTime-in").val().trim(),
                homeAddress: $("#homeAddress-in").val().trim(),
                destAddress: $("#destAddress-in").val().trim(),
                frequency: parseInt($("#frequency-in").val().trim())
            }
        // start the countdown!
        
        $("#start-alert").on("click", function(event){
            event.preventDefault();
            alertIt.start(); 
        });
        
        // this is the end of the add-info click event
        });
    },

    calcTimes: function() {
        arrTime = moment().hour(parseInt(getInput.inTime.charAt(0) + getInput.inTime.charAt(1))).minute(parseInt(getInput.inTime.charAt(3) + getInput.inTime.charAt(4)));
        farrTime = arrTime.format("HH:mm");
        timeToGo = arrTime.diff(moment(),"minutes");
        //timeTravel = 60;  // map api gets this number
        timeTravel = alertIt.getTimeTravel();
        timeOuttheDoor = timeToGo - timeTravel;  //timeTravle not found yet  from map api
        timeSinceStart = moment().diff(timeStarted, "minutes");

    },

    start: function() {
        
        timeStarted = moment();
        $("#startTime-display").text(moment().format("hh:mm A"));
        $("#curTime-display").text(moment().format("hh:mm A"));
        // $("#arrTime-display").text(farrTime);
        // $("#timeToGo-display").text(timeToGo);

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

        $("#sincestartTime-display").text(timeSinceStart);
        $("#curTime-display").text(moment().format("hh:mm A"));
        $("#arrTime-display").text(farrTime);
        $("#timeToGo-display").text(timeToGo); // till arrival at destination
        $("#travelTime-display").text(timeTravel);
        $("#leaveTime-display").text(timeOuttheDoor); // time till you need to be out the door
       },

    generateMessage: function() {

        textToVoice = ""
        var lng = arrTextFill.length;

        if (timeOuttheDoor < 0){   //they are too late now

            var greetText = arrTextFill[Math.floor(Math.random() * lng)].late;
            var nameText = getInput.name  + ", ";
            var midText = " you should have been out the door ";
            var endText = " minutes ago. Let's try it again tomorrow!";
            var timeOuttheDoor = Math.abs(timeOuttheDoor);
            clearInterval(intervalId);

        } else if (timeOuttheDoor < 15) {  // it's getting real close

            var greetText = arrTextFill[Math.floor(Math.random() * lng)].close;
            var nameText = getInput.name + ", ";
            var midText = " you only have ";
            var endText = " minutes until you need to be out the door!";

        } else {   //still plenty of time

            var greetText = arrTextFill[Math.floor(Math.random() * lng)].ontime;
            var nameText = getInput.name + ", ";
            var midText = " you still have ";
            var endText = " minutes until you need to be out the door.";
        }

            textToVoice = greetText + nameText + midText + timeOuttheDoor + endText;
            console.log(textToVoice);
       },
  
       getTimeTravel: function() {
        //input from the map api goes here
        return timeTravel = 10;  //a placeholder

       }
 //alertIt
};
 
alertIt.setUp();

//doc ready
});
