# REGARDS OSS FRONTEND

This repository contains the source of the REGARDS HMI.

## Webapp

The webapp directory contains the source code of the frontend webapp. Please read [Webbapp README](webapp/README.md)

## Frontend-boot

**Legacy**

Frontend boot, is a maven project to create an executable WAR with its own jetty application-server.

## Java Build

Run the here under command to build an executable war java file.
```
./build.sh
```

To run the compiled WAR file run command :
```
java -jar frontend-boot/target/bootstrap-frontend-<version>.war
```
