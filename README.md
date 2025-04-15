# UMBC 4 Year Planner
Authors: Rick Jenkins, Jason Rojas, Caleb Sparks, Ryan Barnes

## Project Description

This application is an interactive 4 year planner to replace the current static document.
It is designed to help students and administators by simplifying the planning process and providing a more flexible setup that gives feedback.

## Technical Details
This project uses React and Tailwind CSS for the UI on the website.
MongoDB is used for the database which holds the course/major data.
The website is deployed using Github Pages.

## Using the Application
This application has different functions for administators and users.

### Administrative Functions

#### `Update Database`
Administators can update the database by editing the data in following document. Format must be followed for proper data parsing.
https://docs.google.com/spreadsheets/d/1_FpGoQveJlv1Egrse9kBKIOoEvJdk-6I3-dqA0mv20E/edit?usp=sharing

#### `Run in Developer mode`
To test changes before applying them to the deployed website, run in developer mode.

Open the project folder in an IDE, make sure it has node.js installed.
Open two terminals in the IDE.

In terminal 1, do `npm install` to install the required dependencies.
Do `cd backend` to enter the backend folder.
Run `npm start` to connect to the database.

In terminal 2, do `npm start` to start the react website locally.

The website will then open and allow changes to be made without affecting the deployed version.

### User Functions

#### `Create 4 Year Plan`
To create a four year plan, start by selecting your major. 
This will populate the planner with the default schedule for the selected major.

Then, select your preferred semester credit range using the slider.
This will give warnings if a semester has too many credits.

If you have test credit or transfer courses, add the corresponding course into those sections by clicking add course.
After this, you can modify your plan as desired.

Years, semesters, and courses can be added or removed by hitting their corresponding buttons(add -- or X)
Courses can be dragged and dropped between semesters.

If something is red after a change to your plan there is a conflict.
To see what the problem is, hover over the red text.

If all required courses have been added and there are no conflicts, the plan is complete.

## More Details
For more information on this project, refer to the SRS document: https://docs.google.com/document/d/1YtmRHmeYTleUbFyIAmgSTdPdA52_UEbD3C89hBE3tuM/edit?usp=sharing


