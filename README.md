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
Budgeting apps are great in concept but more often than not they are a hassle to keep up to date. For something to work easily for everyone, it needs to be simple and require minimal effort. This is where flowi comes in. The goal with flowi is that the app handles the flow of budgeting, which in practice means guiding the user to the right questions. For example, when a transaction is made with a linked bank account, flowi might ask what budgeting category this belongs to and give you an option to create a new one if one does not already exist.

In addition, a decision was made not to give the user full control. Flowi doesn't allow for users to budget money they don't have. For example, if a transaction is made and the target budget category doesn't have enough budgeted then the user must move money from another category. This design decision should help people to live within their means.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
The app is containerized so the only things needed to get it up and running are:
* [Docker](https://docs.docker.com/install/)  
* [Docker Compose](https://docs.docker.com/compose/install/)  

### Installing
Getting a docker app running is very straight forward. Start by cloning the repository to your local machine. <i>(Alternatively you can download the zip from github)<i/>

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
To start the unit tests, run the following command:

```
docker-compose -f docker-compose.yml -f docker-compose.unit.yml up
```
### End to end tests
An acceptance test driven development is used in this project, which entails that end to end tests represent the acceptance criteria for a user story. [Cypress](https://www.cypress.io/) is being used as the library for e2e testing. End to end tests can be run like this.
```
docker-compose -f docker-compose.yml -f docker-compose.e2e.yml up
```

### Coding style tests
Coding style errors are checked with airbnb's eslint configuration. You can check for lint errors by running this command:

```
docker-compose -f docker-compose.yml -f docker-compose.lint.yml up
```

## 🎈 Usage <a name="usage"></a>
### Developement  
To install new dependencies for a client enter the following:
```
docker-compose run --rm client npm install <dependency>
```
Where <dependency> is what you need to install. Replace client with server for installing new dependencies to server. 
## 🚀 Deployment <a name = "deployment"></a>
Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

