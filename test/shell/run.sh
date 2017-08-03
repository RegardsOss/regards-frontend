#!/bin/bash -e

cd /app_to_build/frontend-webapp/src/main/webapp


echo "execute preinstallation (bootstrap)"
npm run bootstrap

echo "execute npm install"
npm install

# let's build the app
if [ $MODE = "Deploy" ]
then
    echo "execute tests and deploy the docker image"
    npm test
    npm build:plugins
elif [ $MODE = "Verify" ]
then
    echo "execute tests"
    npm test
else
    echo "Environment variable MODE has an unrecognized value"
fi

echo "Success !"
exit 0
