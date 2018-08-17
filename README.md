# on-time

Here is the pseudo code starter:


//initialize the app ********************
 connect to db
 connect to text to voice api
 connect to google map api


//set user input ************************

Set up Screen  (form)  before first use



what is your name [name]
what is your home location (lat.lon)  [home]
what is your destination location (lat.lon)  [dest]
what is the desired arrival time  [arrTime]
what is your mode of transportation  walk bus drive  [mode]
how often do you want to be reminded  [interval]

Submit button

//start alarm it for the day  ************************************

user "Wakes up application by pushing start button 

check google api
    set [home]
    set [dest]
    set [mode]
    get [travelTime]

set [interval]
start setinterval  loop here 
In the interval loop ********************************************


check google api
    get [travelTime]

calc [totalTime] till arrival time  ([now] - [arrTime])
calc [leaveTime]  ([now] - travelTime)


    Generate Voice message:

            if 1st message: 
                    get up greeting
                        [generate text]:
                                        Good morning!"
                                        you have [totalTime] until you need to be at [dest]
                                        you need to [be on the bus, start walking, start driving] in [time to leave] minutes
                                        "I'll give you an update every [interval] minutes

                        play voice message              

            else if (reminder message)

                        [generate text]:

                                    [random interim text arr:   Hope your feeling good today,
                                                                I'm sure you're going to have a good day today.]

                                    [name] + it's now [currentTime] + you now have about [leaveTime]
                        play voice message


    update UI
                current time:
                time till leave:
                time to travel 


if [now] < [arrTime]
        loop to next interval  ********************

    else 
        trigger final message  (Hope you arrived on time, glad to be with you this morning.  Have a good day!)


//  