#!/usr/bin/env bash
simplifiedBranchName=$(echo ${BRANCH_NAME} | tr -cd '[[:alnum:]]._-')

docker build -t https://172.26.46.158/rs_apache:${simplifiedBranchName} 

docker push https://172.26.46.158/rs_apache:${simplifiedBranchName}
 