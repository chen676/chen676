Version 0.10
------------

`Dennis Moon`  
`Tuesday, October 7, 2014`

Notes
> Hey guys, I figured out a much easier way for each of us to fiddle around with our own code. 
 Go to the Facebook developers page and navigate to Apps > getlikes  
 On the side is a tab called `Test Apps`  
 Create your own test app and store the appId  
 
> Now on GitHub, branch from the master as `{yourname}`  
 On your OS terminal, run `git branch `{yourname}`   
 Then switch to the branch with `git checkout {yourname}`   
 First, change the appId in `/js/fb.js` to your test appId (comment out mine and master)
 Now you can make whatever changes you wish here  
 When you want to save this change, go through the usual `git add -A` and `git commit -m`  
 Uploading is `git push origin {yourname}` syncing it to your branch and not master

> Now go to the Facebook developers page.
 
Facebook App
>Added new test app "getlikes - Dennis"  
 Set "getlikes - Dennis" siteURL as "http://www-scf.usc.edu/~bohuimoo/"

Added
>Arbitrary Version number  
 Whole number for major reworks, tenths for feature addition, hundreths for bug fixes.  
 README should only contain newest version features  
 changelog.txt is to be compilation of all version features  
 /js folder under /static  
 /fb.js file under /js  
 fb.js file now uses "getlikes - Dennis" appId  
 PERSONAL: code to hide USC disclaimer at bottom of website  
	
Removed:
> js from index.html

Todo:
>Front-end cookie to store data: does not re-parse every time
 Front-end parsing to add calculation of photo, video, and all posts
 Previously logged in users see "Show Me!" instead of "Login"

Bugs:
>`#results` flash problem in showTime()