# REGARDS Frontend

REGARDS is still under development. **This version is a beta version**.

## Webapp

The webapp directory contains the source code of the frontend webapp. Please read [Webbapp README](webapp/README.md)

## Frontend-boot

Frontend boot, is a maven project to create an executable WAR with his own jetty application-server.

## Build
The [README](https://github.com/RegardsOss/regards-deployment/blob/master/README.md) of the project [rs-deployment](https://github.com/RegardsOss/regards-deployment) describes how to generate all the REGARDS repositories.

To run the compiled WAR file run command :
```
java -jar frontend-boot/target/bootstrap-frontend-<version>.war
```

Note : The `webapp` must be compiled before (see [Webbapp README](webapp/README.md))