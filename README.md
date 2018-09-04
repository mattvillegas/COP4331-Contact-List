# Contact List

A personal contact manager web app used to perform CRUD operations on contacts made by users.
This app features login functionality, allowing each user to have contacts unique to their account

## Contributors

Matthew Villegas: Database Development  
Justin Zabel:     Database Development  
Joshua Lecas:     Angular Development   
Sebastian Krupa:  HTML/CSS Development  
Shelby Basco:     UML/ERD Documentation  
John Hacker:      Front End Development  
Daniil Klishin:   Front End Development  
Eduardo Guevara:  Caught the flu lol  

## Front End Development Installation

`git clone` the repository onto your local machine.

Make sure `node.js` is installed onto your machine.

Run `npm install -g @angular/cli` to install Angular

`cd` into the folder of the repository, and run `npm install` to grab the required dependencies.

To start the Angular server, run `ng serve` and navigate in your web browser to `http://localhost:4200/` to get 
to the log in page. Any changes made to the front end or angular components will reload automatically as you
save the files in your text editor.

## Build and run the database

Run `ng build` to build the project. The build artifacts will be stored in the `public/` directory. If you are pushing to github, make sure you have run this command beforehand.

After making sure `MongoDb` is installed on your machine, `cd` into the directory of the project and open a terminal.

Run `node server.js` to start the database server and connect to the remote database. If you ran `ng build` already as detailed above, you can head to `http://localhost:8080/` to access the full website. Database functionality will work as opposed to `ng serve` which is strictly for the front end.

This project is also equipped to use `nodemon server` if you choose to do so.

## Heroku deployment and web access.

After pushing a stable version to 'master', github will automatically deploy the project to Heroku, and the site can be accessed [here](http://shrouded-retreat-51236.herokuapp.com/). Please give the website a few moments to load if you have not accessed it in the past thirty minutes, as per Heroku's free version limitations.
