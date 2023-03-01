# REGARDS Frontend

This is the REGARDS Frontend webapp.

## Requirements
------------

-	node: v16+
-	yarn v1.22+

> **Important**  
> As REGARDS frontend is developed around two main libraries, [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org), we highly recommand new developers to start by watching the here under [Egghead](https://egghead.io) videos to learn the basics of these two libraries.
>   - [React](https://egghead.io/courses/react-native-fundamentals){:target="_blank"}
>   - [Redux](https://egghead.io/courses/getting-started-with-redux){:target="_blank"}  
>  
>New developers can also check at the [Material-ui](http://www.material-ui.com/#/components/app-bar) library which is used to design all components of the REGARDS frontend.

## Quick setup

Install dependencies with the following:
```
yarn
```

## Compile for production deployment

This two commands will generate the entire webapp for production environement with all plugins compiled.
The result is in the `dist/prod` directory.

```
yarn build:production
yarn build:plugins
```

**Congratulation**, you're now ready to launch the application.

## Run for developement

The command below allow you to run the frontend webapp in development mode with sources hot reload.
To do so, you have to define the regards gateway server address by replacing `http://localhost:9300` by the address 
of your REGARDS gateway microservice in the command line below.

```
yarn start:local --rsgateway=http://localhost:9300
```
Optionally, you may also build the plugins, using the following command in webapp folder:
```sh
./scripts/build-all-plugins dev all
```
**Congratulation**, you're now ready to access yout local development server in a browser at the address `http://localhost:3333`.
## Run tests :

It runs tests in then terminal, then creates a report in `reports/mocha/` folder:

```
npm test
```

## Run test:coverage :

To run tests with coverage, then creates coverage reports (lcov, xunit) inside `reports/coverage/` folder:

```
yarn test:coverage
```

## Run lint :

You shall lint the entire app [using our Regards OSS lint rules](/tree/master/eslint-config-es6-rules) before commiting:
