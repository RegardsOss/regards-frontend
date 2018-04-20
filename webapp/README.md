# REGARDS Frontend


This is the REGARDS Access frontend.

### Quick setup


Install dependencies with the following:
```
npm install
```
**Congratulation**, you're now ready to launch the application.

### Run tests :

It runs tests in then terminal, then creates a report in `reports/mocha/` folder:

```
npm test
```

### Run test:coverage :

To run tests with coverage, then creates coverage reports (lcov, xunit) inside `reports/coverage/` folder:

```
npm run test:coverage
```


### Lint :

You shall lint the entire app [using our Regards OSS lint rules](/tree/master/eslint-config-es6-rules) before commiting:

Dependencies
------------

-	node v8.10
-	npm v5.7.1 (npm i -g npm to upgrade)

### Known issues

When you install this application, all these NPM warnings can be safely ignored :  
- `npm WARN enoent SKIPPING OPTIONAL DEPENDENCY: ENOENT`
- `npm WARN optional SKIPPING OPTIONAL DEPENDENCY`
- `npm WARN enoent ENOENT: no such file or directory`
- `npm WARN <some dependency>@<version> requires a peer of <another dependency>@<version> but none is installed. You must install peer dependencies yourself.`
- `npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform`
- `npm WARN rollback Rolling back <some dependency>@<version> failed (this is probably harmless)`