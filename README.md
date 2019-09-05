<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/ZVx7qKZ.png" alt="Project logo"></a>
</p>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![GitHub Issues](https://img.shields.io/github/issues/Darake/flowi.svg)](https://github.com/Darake/flowi/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Darake/flowi.svg)](https://github.com/Darake/flowi/pulls)
  [![License](https://img.shields.io/badge/license-GPLv3-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Flowi is a budgeting app that handles the flow of budgeting. With flowi, the user only has to answer relevant questions the app provides to keep your budget up to date.
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Timesheet](documentation/timesheet.md)

## 🧐 About <a name = "about"></a>
<b>DISCLAIMER! -- A readme driven development is used, so most of the stuff described in this readme are not yet implemented</b>

Budgeting apps are great in concept but more often than not they are a hassle to keep up to date. For something to work easily for everyone, it needs to be simple and require minimal effort. This is where flowi comes in. The goal with flowi is that the app handles the flow of budgeting, which in practice means guiding the user to the right questions. For example, when a transaction is made, flowi might ask what budgeting category this belongs to and give you an option to create a new one if one does not already exist.

In addition, a decision was made not to give the user full control. Flowi doesn't allow for users to budget money they don't have. For example, if a transaction is made and the target budget category doesn't have enough budgeted then the user must move money from another category. This design decision should help people to live within their means.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
The app is containerized so the only things needed to get it up and running are:
* [Docker](https://docs.docker.com/install/)  
* [Docker Compose](https://docs.docker.com/compose/install/)  

### Installing
Getting a docker app running is very straight forward. Start by cloning the repository to your local machine. <i>(Alternatively you can download the zip from github)</i>

```
git clone https://github.com/Darake/flowi
```

Now let's move into the newly downloaded project.

```
cd flowi
```

With docker compose we can get the whole system running with a simple command.

```
docker-compose up
```
The first time running it might take some time, since it has to download everything and set it up. Finally you should see your server and client being set up in the terminal.

## 🔧 Running the tests <a name = "tests"></a>
To start the server's unit tests, run the following command:

```
docker-compose -f server-unit.yml -p test up --abort-on-container-exit
```
Or  for client:

```  @docker-compose -f client-unit.yml -p test up```

### End to end tests

An acceptance test driven development is used in this project, which entails that end to end tests represent the acceptance criteria for a user story. [Cypress](https://www.cypress.io/) is being used as the library for e2e testing. End to end tests can be run like this.
```
docker-compose -f e2e.yml -p test up --abort-on-container-exit
```

### Coding style tests
Coding style errors are checked with airbnb's eslint configuration. You can check for lint errors by running this command:

```
docker-compose -f lint.yml -p test up
```



Alternatively linux users can use the make file provided. Type `make help` for available commands.

## 🎈 Usage <a name="usage"></a>

### Developement  

#### Dependencies

To install new dependencies for the client enter
```
docker exec -it flowi_client_1 sh
```
Or for the server

```
docker exec -it flowi_server_1 sh
```

Then just install what you need normally in the docker's bash.

```
npm install <dependency> --save
```

### Product

The live version can be tested [here](http://flowi.herokuapp.com/). To use the app's features, an account must be made. After logging in the first time, a prompt appears to add a manually managed account. When the linking process is done, the app asks to budget each euro in the account by choosing an amount and creating a budget for it.

After the initial setup each transaction must be handled. For inflow, each new euro must be budgeted. For outflow, each transaction must have a category assigned to it. If a category doesn't have enough money left then some has to be moved from another category. If a suitable category doesn't exist then one can be created and funds added to it.

This is the basics of it. There are some additional smaller features: Organizing categories to groups, to keep the view more organized; Having a view of the account's current balance.

## 🚀 Deployment <a name = "deployment"></a>
Deployment is handled automatically when a new feature is pulled into the master branch in github. When a change happens, Heroku recognises it and builds a new docker container for production and deploys it. A production Dockerfile and heroku.yml are used for configuring the deployment.

## ⛏️ Built Using <a name = "built_using"></a>
- [MongoDB](https://www.mongodb.com/) - Database
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [React](https://reactjs.org/) - UI Library
