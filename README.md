# REGARDS Frontend

This repository contains the sources of the REGARDS UI.

# Buid

## Requirements

### The build relies on

-	node: 16.20.2
-	yarn: 3.7.0
-   volta: 1.1.1

> **Important**  
> As REGARDS frontend is developed around two main libraries, [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org), we highly recommand new developers to start by watching the here under [Egghead](https://egghead.io) videos to learn the basics of these two libraries.
>   - [React](https://egghead.io/courses/react-native-fundamentals){:target="_blank"}
>   - [Redux](https://egghead.io/courses/getting-started-with-redux){:target="_blank"}  
>  
>New developers can also check at the [Material-ui](http://www.material-ui.com/#/components/app-bar) library which is used to design all components of the REGARDS frontend.

#### For docker images generations
* Docker engine v27+ (https://docs.docker.com/engine/install/rhel/)

## How to

### Run the app locally

To run the REGARDS frontend application, you need a REGARDS backend server up and running.
You can see how to run a REGARDS backend server in the [regards-backend repository](https://github.com/RegardsOss/regards-backend.git)
The command below allow you to run the built frontend webapp in development mode with sources hot reload.
To do so, you have to define the regards gateway server address by replacing <gateway>:<port> by the address 
of your REGARDS gateway microservice in the command line below.

```bash
cd <build_directory>/
git clone https://github.com/RegardsOss/regards-frontend.git
cd regards-frontend/webapp
export NPM_CONFIG_RSGATEWAY=<gateway>:<port>
yarn start:local 
```
Optionally, you may also build the plugins, using the following command in webapp folder:
```sh
./scripts/build-all-plugins dev all
```

### Expected results

The develomment UI is accessible at `http://<regards_host>:3333`.

### Build the docker images

#### Frontend base image

THE REGARDS docker images are based on the `regards-java-alpine` image.  
This image is accessible through the REGARDS github docker registry: `ghcr.io/regardsoss`.
You need to make this image available on your docker registry <docker.registry.host>;

 #### Generation

```bash
cd <build_directory>/
git clone https://github.com/RegardsOss/regards-frontend.git
cd regards-frontend/jenkins/nginx
export DOCKER_REGISTRY=<docker.registry.host>
export REGARDS_DOCKER_IMAGE_TAG=<tag>
docker build --build-arg DOCKER_REGISTRY=${DOCKER_REGISTRY} -t ${DOCKER_REGISTRY}/rs-front:${REGARDS_DOCKER_IMAGE_TAG} --pull .
```

#### Expected results
You can show the generated worker docker image with the following  commands:
```bash
docker images ${REGARDS_DOCKER_IMAGE_NAME}
```
## Tests environm

### Build the Web Application Archive (WAR)

```bash
cd <build_directory>/
git clone https://github.com/RegardsOss/regards-frontend.git
cd regards-frontend/
build.sh
```

#### Expected results 
The expected war for the version X.Y.Z is :
- <build_directory>/regards-frontend/frontend-boot/target/bootstrap-frontend-X.Y.Z.war

## Run tests :

It runs tests in then terminal, then creates a report in `reports/mocha/` folder:

```bash
yarn test:mocha
```

or

```bash
yarn test:watch
```

## Run lint :

You shall lint the entire app [using our Regards OSS lint rules](/tree/master/eslint-config-es6-rules) before commiting:
```bash
yarn lint:fix
```