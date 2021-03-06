var sleep;
sleep = require("./sleep.js");

function time_to_secs(time_string) {
    /****************************************************
    * Convert time strings in the format HH:MM:SS and MM:SS 
    * to seconds
    ****************************************************/
    // check if time_string format is valid
    var hhmmss;
    hhmmss = /^(\d\d:\d\d:\d\d)$/;
    var mmss;
    mmss = /^(\d\d:\d\d)$/;
    if (!(hhmmss.test(time_string) || mmss.test(time_string))) {
        return -1;
    }

    // get hours, minutes and seconds
    var time_list;
    time_list = time_string.split(":");
    var hrs;
    var mins;
    var secs;
    if (time_list.length == 3) {
        hrs = parseFloat(time_list[0]);
        mins = parseFloat(time_list[1]);
        secs = parseFloat(time_list[2]);
    } else {
        hrs = 0;
        mins = parseFloat(time_list[0]);
        secs = parseFloat(time_list[1]);
    }
    return hrs*3600 + mins*60 + secs;
}

function print_time(time_string, seconds_left) {
    /****************************************************
    * Print time
    ****************************************************/
    console.clear();
    console.log("Total time = " + time_string);
    var date;
    date = new Date(null);
    date.setSeconds(seconds_left);
    var time_passed;
    time_passed = date.toISOString().substr(11, 8);
    console.log("Time left = " + time_passed);
}

var timer;
timer = function(time_string) {
    /****************************************************
    * Timer
    ****************************************************/
    var secs;
    secs = time_to_secs(time_string);
    if (secs == -1) {
        return "Error: Invalid format. Parameter time_string must be in the format HH:MM:SS or MM:SS";
    }
    var s;
    s = 0;
    while (s < secs+1) {
        print_time(time_string, secs-s);
        s = s + 1;
        sleep(1000, true);
    }
    console.log("Timer over");
}

module.exports = { timer };
