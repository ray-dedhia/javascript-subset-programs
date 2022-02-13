module.exports = function(ms, print_when_done=false) {
    /****************************************************
    * Pause for ms milliseconds
    ****************************************************/
    var date;
    date = Date.now();
    var curr_date;
    curr_date = null;
    while (curr_date - date < ms) {
        curr_date = Date.now();
    }
    if (print_when_done) {
        console.log("Done");
    }
}
