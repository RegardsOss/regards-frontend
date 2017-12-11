# REGARDS frontend

This is the Human Machine Interface repository.

For now, this version has not yet been tested under operational conditions and is considered as **beta**.

- [Requirements](#build-requirements)
- [Local installation](#local-installation)
- [Run options](#run-options)
  - [Production build](#production-build)
  - [Run tests :](#run-tests-)
  - [Run test:coverage :](#run-testcoverage-)
  - [Lint :](#lint-)
- [Know issues](#know-issues)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Build requirements

You shall
- use Linux or macOS
- be root on your computer
- having npm version between v3 and v4
- having node version between v6 and v7

The latest version of npm (v5) and node (v8) are not stable enough to be used with REGARDS. But when their issues will be fixed, the npm run-script `bootstrap` will be renamed into `preinstall` and `npm install` will be sufficient.

> **Important**  
> As REGARDS frontend is developped around two main libraries, [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org), we highly recommand new developers to start by watching the here under [Egghead](https://egghead.io) videos to learn the basics of these two libraries.
>   - [React](https://egghead.io/courses/react-native-fundamentals)
>   - [Redux](https://egghead.io/courses/getting-started-with-redux)
>  
>New developers can also check at the [Material-ui](http://www.material-ui.com/#/components/app-bar) library which is used to design all components of the REGARDS frontend.
>Check [lodash fp](https://github.com/lodash/lodash/wiki/FP-Guide) to understand how we write functionnal programming on REGARDS (using lodash *immutable auto-curried iteratee-first data-last methods*)

## Local installation

Clone the `rs-frontend` repository and open the webapp folder using your terminal:

```
cd frontend-webapp/src/main/webapp
```

Execute the following to link submodules inside `path/to/folder/webapp/web_modules/[data|modules|utils|...]/**` to the npm global user folder and then inside `webapp/node_modules/@regardsoss`. It allows you to edit these npm modules with auto reload.

```
npm run bootstrap
```

Now, you can install dependencies, devDependencies and compile all required webpack DLL:

```
npm install
```

**Congratulation**, you're now ready to launch the frontend.

## Run options


Run frontend with real backend microservices :
```
npm start
```

Run frontend with mocked micrservices (the real microservices don't need to be available with this mode) :
```
npm run start:withmock
```

Then opens your browser at :
 - portal : [http://localhost:3333/](http://localhost:3333/)
 - admin instance : [http://localhost:3333/admin](http://localhost:3333/admin) login : regards-admin@c-s.fr / root_admin
 - admin projet : [http://localhost:3333/admin/project1](http://localhost:3333/admin/project1) login : regards-admin@c-s.fr / root_admin
 - user projet : [http://localhost:3333/user/project1](http://localhost:3333/user/project1) login : regards-admin@c-s.fr / root_admin

### Production build

```
npm build:production
```

### Run tests :

It creates a report in `path/to/folder/webapp/reports/mocha/` folder:

```
npm test
```

### Run test:coverage :

To run tests with coverage - creates coverage reports (lcov, xunit) inside `path/to/folder/webapp/reports/coverage/` folder:

```
npm run test:coverage
```

### Lint :

You shall lint the entire app [using our Eslint](/frontend-modules/eslint-config-es6-rules) before commiting:
```
npm run lint:fix
```

## Know issues

- `npm run bootstrap` is not cross platform and cannot be executed on Windows (except on Windows 10 Bash)
- `./scripts/bootstrap.sh` is not executable? Run the following command: `chmod +x ./scripts/bootstrap.sh`
