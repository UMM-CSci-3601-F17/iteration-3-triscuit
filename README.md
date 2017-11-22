# CSCI 3601 Production Template Fall 2017
[![Build Status](https://travis-ci.org/UMM-CSci-3601-F17/iteration-3-triscuit.svg?branch=master)](https://travis-ci.org/UMM-CSci-3601-F17/iteration-3-triscuit)

<!-- TOC depthFrom:1 depthTo:5 withLinks:1 updateOnSave:1 orderedList:0 -->
## Table of Contents
- [Setup](#setup)
- [Running your project](#running-your-project)
- [Testing and Continuous Integration](#testing-and-continuous-integration)
- [Resources](#resources)
	- [Angular 4](#angular-4)
	- [Firebase](#firebase)
	

<!-- /TOC -->

## Setup

The setup for our project is based around the assumption that we are using
IntelliJ Idea. The setup is as follows:

- When prompted to create a new IntelliJ project, select **yes**.
- Select **Create project from existing sources**
  - Make sure **Use default Gradle wrapper** is selected.
- Click **Finish.**
- When the project loads up there will be a little prompt in the bottom right corner 
with a link to **install/update NPM**, you are going to want to click that.
- You can confirm that the install worked if you see a little **npm** tab near the
bottom left of your screen
- Once that it is done, you will want to open up the **Terminal** and simply
type in `yarn` then run it
- If IDEA asks you if you want to compile JavaScript to TypeScript :fire: DO NOT :fire:
it will break your project.

:warning: IDEA will sometimes decide to "help" you by offering
"Compile TypeScript to JavaScript?" :bangbang: *Never* say "OK" to this
offer -- if you do it will make a complete mess of your project. We're
using other tools (`gradle`, `ng`, and a thing called `webpack` which you
never explicitly see) to do that compilation. If you let IDEA do it, you'll
have a ton of JavaScript files cluttering up your project and confusing other
tools.

## Running your project

- When you want to run the client, simply type **ng serve**in the terminal of
your choosing. NOTE: If you want to use a standalone terminal, don't forget to `cd` into
your project
- Once it has compiled, go to ``http://localhost:9000`` to see your website!


## Testing and Continuous Integration

Testing options are still integrated in this lab so you can test the client, or the server or both.
Testing client:
* `ng test` (in the terminal) will run all client tests and re-run after every safe.

**NOTE**: The npm window is know to be buggy, so please run all commands in the
terminal


Turn on your repo in [Travis CI][travis], replace the build status image in this README, and push your changes. That will trigger a build with Travis.

## Resources
### Angular 4
- [What _is_ Angular 4 and Typescript?][angular-2-4]
- [What _is_ Angular CLI?][angular-cli]
- [What are environments in Angular CLI?][environments]
- [Testing Angular 4 with Karma/Jasmine][angular4-karma-jasmine]
- [End to end testing (e2e) with protactor and Angular CLI][e2e-testing]
- [Angular CLI commands](https://github.com/angular/angular-cli/wiki)

### Google Firebase
- [Google Firebase][firebase]
- [Firebase Console][firebase_console]



[angular-cli]: https://idyllic.co/blog/beginners-guide-angular-cli/
[angular-2-4]: https://www.technicaldiary.com/angular-2-tutorial-for-beginners-angular-4-tutorial-for-beginners/
[angular4-karma-jasmine]: https://codecraft.tv/courses/angular/unit-testing/jasmine-and-karma/
[e2e-testing]: https://coryrylan.com/blog/introduction-to-e2e-testing-with-the-angular-cli-and-protractor
[environments]: http://tattoocoder.com/angular-cli-using-the-environment-option/
[labtasks]: LABTASKS.md
[travis]: https://travis-ci.org/
[firebase]: https://firebase.google.com/
[firebase_console]: https://console.firebase.google.com/
