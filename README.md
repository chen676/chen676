Version 0.10
------------

`Dennis Moon`  
`Tuesday, October 7, 2014`

Facebook App:
> Added new test app "getlikes - Dennis"  
> Set "getlikes - Dennis" siteURL as "http://www-scf.usc.edu/~bohuimoo/"

Added:

	* Arbitrary Version number
    * Whole number for major reworks, tenths for feature addition, hundreths for bug fixes.
    * README should only contain newest version features
    * changelog.txt is to be compilation of all version features
	* /js folder under /static
	* /fb.js file under /js
	* fb.js file now uses "getlikes - Dennis" appId
	* PERSONAL: code to hide USC disclaimer at bottom of website
	
Removed:

	* js from index.html

Todo:

	* Front-end cookie to store data: does not re-parse every time
	* Front-end parsing to add calculation of photo, video, and all posts
	* Previously logged in users see "Show Me!" instead of "Login"

Bugs:

	* results flash problem in showTime()