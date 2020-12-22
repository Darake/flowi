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

<p align="center"> Flowi is a budgeting app that handles the flow of budgeting. With flowi, the user is limited in making decisions that are affordable. The app can be found here http://flowi.herokuapp.com/.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Tests](#tests)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Timesheet](documentation/timesheet.md)

## 🧐 About <a name = "about"></a>

Budgeting apps are great in concept but more often than not people budget money they don't have, which renders budgeting useless. With flowi, a decision was made not to give the user full control. Flowi doesn't allow for users to budget money they don't have. For example, if a transaction is made and the target budget category doesn't have enough budgeted then the user must move money from another category. This design decision should help people to live within their means.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

The app is containerized so the only things needed to get it up and running are:

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)  

In addition, [node.js](https://nodejs.org/en/) is recommended to run tests locally and to have other benefits in the IDE side.

### Installing

Getting a docker app running is very straight forward. Start by cloning the repository to your local machine. <i>(Alternatively you can download the zip from github)</i>

```
git clone https://github.com/Darake/flowi
```

Now let's move into the newly downloaded project.

```
cd flowi
```

If you have node.js installed we can do the initial setup with the following command.

```
npm run dev:setup
```

This is used to get the development environment running the first time. In future runs you should use the following.

```
npm run dev
```

If you don't want to use node.js, you can also use the following command to get the app running locally.

```
docker-compose up
```

The first time running it might take some time, since it has to download everything and set it up. Finally you should see your server and client being set up in the terminal.

### 🔧 Running the tests <a name = "tests"></a>

<b> The project was started with a test driven development but during the project I realized that TDD is not very optimal until a core version of the project is ready. This lead me to abandon unit tests for time being. The project has working cypress end to end tests.
</b>

To run cypress tests locally:

```
npm run cypress:open
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
docker exec -it flowi-client_1 sh
```

Or for the server

```
docker exec -it flowi-server_1 sh
```

Then just install what you need normally in the docker's bash.

```
npm install <dependency> --save
```

### Product

The live version can be tested [here](http://flowi.herokuapp.com/). To use the app's features, an account must be made. After logging in the first time, a prompt appears to add a new account.

After the initial setup there are three main views in the app: accounts, budget and transactions. More accounts can be added by clicking <i>ADD ACCOUNT</i>. Created account can be edited or deleted in accounts view, which can be opened by clicking an account. By design choice, only the account name can be edited. Amount changes should be done with transactions.

After setting up the needed accounts, the budgeting itself can be started. In the budget view, new categories can be created by clicking <i>ADD CATEGORY</i>. Clicking a created category opens up a dialog where it's possible to budget funds to the category, edit the category name or delete it compeletely. Editing and deletion can be accessed by clicking on the <i>EDIT CATEGORY</i> tab.

When adding funds to a category, a source and an amount must be entered. Funds can be added from accounts or by moving funds from another category. It's also possible to add funds from multiple source by clicking on <i>ADD ADDITIONAL SOURCE</i>. Added funds from source can't exceed the sources balance.

The final piece of the puzzle is transactions. In the transaction view, all the transactions are shown. Be it inflow, outflow or transfer between accounts. New transactions can be added by clicking <i>ADD TRANSACTION</i>. A dialog opens up again where at the top, a transaction type can be chosen by clicking on different tabs. When adding an inflow transaction, just select the account and the amount to be added. With the transfer option a source account, target account and the transfer amount needs to be chosen.

Because of the design philosophy of not being able to budget money not owned, outflow transaction can be a bit more complex. For outflow transactions an account, a category and an amount has to be selected. Again, an amount bigger than the selected accounts balance can't be entered or it will just default to the accounts balance. In turn, if the amount is bigger than the amount budgeted to the selected category, a familiar fund adding field appears. This means that more funds need to be budgeted to the transactions category either from accounts or by moving funds from another category.

## 🚀 Deployment <a name = "deployment"></a>

Deployment is handled automatically when a new feature is pulled into the master branch in github. When a change happens, Heroku recognises it and builds a new docker container for production and deploys it. A production Dockerfile and heroku.yml are used for configuring the deployment.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [React](https://reactjs.org/) - UI Library
- [Material-UI](https://material-ui.com/) - Styling
