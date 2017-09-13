#!/bin/bash -xe
simplifiedBranchName=$(echo ${BRANCH_NAME} | tr -cd '[[:alnum:]]._-')

docker build -t 172.26.46.158/rs_front:${simplifiedBranchName} .

docker push 172.26.46.158/rs_front:${simplifiedBranchName}
 