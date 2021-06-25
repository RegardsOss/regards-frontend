# REGARDS OSS FRONTEND

This repository contains the source of the REGARDS HMI.

## Webapp

The webapp directory contains the source code of the frontend webapp. Please read [Webbapp README](webapp/README.md)

## Frontend-boot

**Legacy**

Frontend boot, is a maven project to create an executable WAR with its own jetty application-server.

## Java Build

The [README](https://github.com/RegardsOss/regards-deployment/blob/master/README.md) of the project [rs-deployment](https://github.com/RegardsOss/regards-deployment) describes how to generate all the REGARDS repositories.

To run the compiled WAR file run command :
```
java -jar frontend-boot/target/bootstrap-frontend-<version>.war
```

Note : The `webapp` must be compiled before (see [Webbapp README](webapp/README.md))
