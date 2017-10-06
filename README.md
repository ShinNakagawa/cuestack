This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start mySideMenu sidemenu
```

Then, to run it, cd into `mySideMenu` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

===============================================
CueStack insation:
## Install Firebase after creating a new project in Firebase
$ npm install --save firebase angularfire2
$ npm install promise-polyfill --save-exact

add Firebase_confing in app.module.ts from firebase project

## Parse, validate, manipulate, and display dates and times in JavaScript.
$ npm install --save moment

## chart
$ npm install --save chart.js
===============================================
problem notes:
1. fix duplicate list/card showing after adding an item.
  the location to clear cards=[]; is important.
  this clear logic should be in last nested 'subscribe'
  because only this 'subscribe' runs after adding item.

2. input element with 'image' shows "submit"
  --> fixed. Renames to 'imageUrl' solved it.

3. ion-select has no option to set default value.
  --> Yes, the default value needs to set like [(ngModel)]="card.front.rate".  
===============================================
questions:
1. rate with timestamp:
  timestamp should be updated whenever changing rate 'good', 'bad', and so on.
  Now timestamp is not updated. could have an option whether if time is updated or not when changing the rate.
2. rate:
  need to know how the rate should work.
3. data structure:
   + user
   + stack
   + cue

  or
   + user
   |--+ stack
   |--+ cue
4. report:
   show chart stack 'favorite-study-all' cue 'good-bad-never'
===============================================
Publish to Heroku:
1. Go to .gitignore file and remove the mentions of www/ so git picks it up and add these two lines so platforms browsers folder is picked up
platforms/*
!platforms/browser/
!platforms/browser/www
!platforms/browser/www/plugins

2. Add these 2 libraries to your package.json (don't forget to run npm install)
"connect": "^3.5.0",
"serve-static": "^1.11.1"

3. Add a start to your npm scripts in package.json
"start": "node server.js"
Add server.js to your project folder with the following code:
----------------------------------
var connect = require('connect'),
serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("platforms/browser/www"))
app.listen(process.env.PORT || 5000);
----------------------------------

Run Bash:
> heroku login
> heroku create 'cuestack'
https://cuestack.herokuapp.com/ | https://git.heroku.com/cuestack.git

>heroku git:remote -a cuestack
>git init
>git add .
>git commit -am "make it better"
>git push heroku master
>heroku ps:scale web=1
----------------------------------

**problem in reading uid from auth.user in home.ts
--> fix with changing from 'let' to 'private Observable<firebase.User>'.
To test browser, run 'E:\ionic\CueStacks\platforms\browser\www\index.html'
