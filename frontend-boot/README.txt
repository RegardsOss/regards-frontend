
1. Compilation maven :
  mvn install -DskipTests -Dwebapp.dir=../../rs-frontend

2. Lancement du war executable
   java -jar target/bootstrap-frontend-1.0.0-SNAPSHOT.war --regards.frontend.www.path=<path to external static directory>
