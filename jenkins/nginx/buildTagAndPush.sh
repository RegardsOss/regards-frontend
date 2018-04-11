#!/bin/bash -xe

# If we are on branch master or a branch starting with develop, tag the image with the version from package.json
if [[ "${BRANCH_NAME}" == develop* || "${BRANCH_NAME}" == "master" ]]
then
  TAG=$(./getPackageVersion.sh ../../webapp)
# Else use the branch name
else
  TAG=$(echo ${BRANCH_NAME} | tr -cd '[[:alnum:]]._-')
fi

docker build -t 172.26.46.158/rs-front:${TAG} .

docker push 172.26.46.158/rs-front:${TAG}
 