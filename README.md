# REGARDS Frontend

## Webapp

The webapp directory contains the source code of the frontend webapp. Please read [Webbapp README](webapp/README.md)

## Frontend-boot

Frontend boot, is a maven project to create an executable WAR with his own jetty application-server.

To compile the executable WAR file run command :
```
mvn clean install
```

To run the compiled WAR file run command :
```
java -jar frontend-boot/target/bootstrap-frontend-<version>.war
```

Note : The `webapp` must be compiled before (see [Webbapp README](webapp/README.md))