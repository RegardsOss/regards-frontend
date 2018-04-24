# REGARDS Frontend

This is the REGARDS Frontend webapp.

## Quick setup

Install dependencies with the following:
```
npm install
```

## Compile for production deployment

This two commands will generate the entire webapp for production environement with all plugins compiled.
The result is in the `dist/prod` directory.

```
npm run build:production
npm run build:plugins
```

**Congratulation**, you're now ready to launch the application.

## Run for developement

The command below allow you to run the frontend webapp in development mode with sources hot reload.
To do so, you have to define the regards gateway server address by replacing `http://localhost:9300` by the address 
of your REGARDS gateway microservice in the command line below.

```
npm run start:local --rsgateway=http://localhost:9300
```
## Run tests :

It runs tests in then terminal, then creates a report in `reports/mocha/` folder:

```
npm test
```

## Run test:coverage :

To run tests with coverage, then creates coverage reports (lcov, xunit) inside `reports/coverage/` folder:

```
npm run test:coverage
```

## Run lint :

You shall lint the entire app [using our Regards OSS lint rules](/tree/master/eslint-config-es6-rules) before commiting:

Dependencies
------------

-	node v8.10
-	npm v5.7.1 (npm i -g npm to upgrade)

## Known issues

When you install this application, all these NPM warnings can be safely ignored :  
- `npm WARN enoent SKIPPING OPTIONAL DEPENDENCY: ENOENT`
- `npm WARN optional SKIPPING OPTIONAL DEPENDENCY`
- `npm WARN enoent ENOENT: no such file or directory`
- `npm WARN <some dependency>@<version> requires a peer of <another dependency>@<version> but none is installed. You must install peer dependencies yourself.`
- `npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform`
- `npm WARN rollback Rolling back <some dependency>@<version> failed (this is probably harmless)`