$(document).ready(function(){
    /*
     * Instance Variables 
     *
     * Required in the parsing
     */
<<<<<<< HEAD
    var userID, loggedIn = false, distribution = [];
    
    
=======
    var userID;
    var loggedIn = false;
    var distribution = new Array();
    
    
    $("div").get(-1).style.display = "none";
    
>>>>>>> Dennis
    /* ======= FACEBOOK SDK LOAD =========== */
    
    /**
     * Method fbAsyncInit
     * Usage: auto run
     * --------------------------
     * Implements the facebook JS SDK asynchronously.
     * Further details in the code
     */
    window.fbAsyncInit = function() 
    {
        /**
         * Method: FB.init()
         * Usage: auto run
         * --------------------------
         * Inits the current SDK with 'getlikes' app
         * by using its appID, cookies, and FB SDK version
         */
        FB.init({
            //appId      : '1557277457835280', //Master
            appId      : '1558391657723860', //Dennis
            cookie     : true,
            xfbml      : true,
            version    : 'v2.1'
        });

        /**
         * Event: authResponseChange
         * --------------------------
         * Fired when the state of current user's auth changes.
         * If auth was changed so that user is now logged in:
         *
         * 
         * Else if not logged in:
         *      
         *
         * Else logged in but not granted app permission:
         *      
         */
        FB.Event.subscribe('auth.authResponseChange', function(response)
        {
            if (response.status === "connected")
            {
                
            }
            else if (response.status === "not_authorized")
            {
                
            }
            else
            {
                
            }
        });
    };
    
    // Load the SDK asynchronously
    (function(d, s, id) 
    {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    
    
    /* ======= PAGE/FACEBOOK RELATED METHODS ======== */
    
    /**
     * Event: #login_button -> click
     * --------------------------
     * Fired when #login_button is clicked.
     * If user is not loggedIn, log user in
     * otherwise, do the opposite.
     */
    $("#login_button").click(function(event){
        if (!loggedIn) login();
        else logout();
    });    
    
    /**
     * Method: login
     * Usage: if(!loggedIn) login();
     * --------------------------
     * Uses FB.login() to log user in
     * The permssions scope includes:
     *      read_stream
     *
     * Callback func switches state of loggedIn to true
     * and calls switchButton() to show "Logout" now
     */
    function login()
    {
        FB.login(function(response)
        {
            if (response.authResponse)
            {
                loggedIn = true;
                switchButton();
                
                calcTime();
                showTime();
            }
            else
                console.log("User canceled login or error occurred");
            
        }, {scope:"read_stream"});
    }
    
    /**
     * Method: logout
     * Usage: if(loggedIn) logout();
     * --------------------------
     * Calls FB.logout() to log user out
     * After logout is handled, callback func reloads the page
     */
    function logout()
    {
        FB.logout(function(){
            document.location.reload();   
        });
    }
    
    /**
     * Method: switchButton
     * Usage: switchButton()
     * --------------------------
     * Hides "Login" and shows "Logout" labels
     * NOTE: Should be called when user logs in successfully
     */
    function switchButton()
    {
        $("#login_label").css("display", "none");
        $("#logout_label").css("display", "block");
    }
        
        
    /* =========== CALCULATION METHODS ========== */

    /**
     * Method: addZeroInfront
     * Usage: newStr = addZeroInfront(5);
     * --------------------------
     * Given an int value,
     * converts it into a string 
     * and returns it with a placeholder 0
     * if its not 2 digits
     * 
     * @param intVal - integer to convert
     * @return newVal - string value with placeholder 0
     */
    function addZeroInfront(intVal)
    {
        var newVal = intVal.toString();
        if (newVal.length == 1)
            return "0" + newVal;
        return newVal; 
    }

    /**
     * Method: convertTimestamp
     * Usage: timeStr = convertTimestamp(timestamp)
     * --------------------------
     * Given a FB format timestamp,
     * rounds to the nearest 30min interval
     * and returns the time without ":"
     * ex) "0100" for 1 AM
     * 
     * @param timestamp - long string form of time "2014-09-10T22:34:05+0000"
     * @return converted - simplified form of time "0100"
     */
    function convertTimestamp(timestamp)
    {
        //ex) "2014-09-10T22:34:05+0000"
        var hourStr = timestamp.substring(11,13);
        var minStr  = timestamp.substring(14,16);

        var hour = parseInt(hourStr);
        var min = parseInt(minStr);

        if (0 <= min && min <= 15)
            min = 0;
        else if (15 < min && min <45)
            min = 30;
        else
        {
            min = 0;
            hour += 1;
        }
        //"05" -> 5 -> "5" -> "05" 

        var converted = addZeroInfront(hour) + ":" + addZeroInfront(min);
        return converted;
    }

    /**
     * Method: calcTime
     * Usage: calcTime()
     * --------------------------
     * Once called,
     * calls FB api to count plot the number of avg. likes
     * over a certain nearest time stamp.
     * 
     * Traverses over the repsonse object given by FB
     * to convert the timestamp of every post.
     * Each timestamp (timeStr) becomes a key value
     * for the distrubution dictionary.
     * If any timestamp does not have a cell (undefined),
     * it is initiallized to an object containing 3 fields:
     *      total, count, and average
     * Then it proceeds to add the number of likes on that post
     * to the total and increments count.
     *
     * Once the traversal is complete, 
     * go through the dictionary to calculate average likes.
     * Find the max average likes and store the timestamp 
     * in which that is stored as the bestTime.
     * 
     * Pass on bestTime to showTime()
     */
    function calcTime()
    {
        FB.api("/me/statuses", function(response)
        {
            if (response && !response.error)
            {
                for (var i=0; i<response.data.length; i++)
                {
                    var timeStr = convertTimestamp(response.data[i].updated_time);
                    
                    if (distribution[timeStr] == undefined)
                        distribution[timeStr] = {"total":0, "count":0, "average":0};
                    distribution[timeStr].total += response.data[i].likes.data.length;
                    distribution[timeStr].count += 1;
                }
                
                var bestTime;
                var max = 0;
                for (var key in distribution)
                    if (distribution.hasOwnProperty(key))
                    {
                        var currAvg = distribution[key].total / distribution[key].count;
                        distribution[key].average = currAvg;
                        if (currAvg > max)
                        {
                            max = currAvg;
                            bestTime = key;
                        }
                    }
                
                showTime(bestTime);
            }
        });
    }
    
    /**
     * Method: showTime
     * Usage: showTime(dispTime);
     * --------------------------
     * Given the calculated bestTime,
     * shows it on the page using jQuery. 
     * NOTE: animations so that it seems like calcuations actually take longer
     * 
     * First, #results is set to "calculating..."
     * immediately, the dialong fades in through 1 second.
     * After 2 seconds, #results is hidden and swapped to 
     * now contain the calculated time.
     * After another 0.5 seconds, #results fades back in through 0.5 s
     * 
     * @param dispTime - time to show
     */
    function showTime(dispTime)
    {
        $("#results").html("calculating...");
        
        $("#results_container").fadeIn(1000);
        
        setTimeout(function(){
            $("#results").css("display", "none").html(dispTime);
        }, 2000);
        
        setTimeout(function(){
            $("#results").fadeIn(500);
        }, 2500);
    }
});