#!/usr/bin/env groovy

/*
 * LICENSE_PLACEHOLDER
 */

/**
 * Declaratve Jenkinsfile. The language is Groovy.
 * Contains the definition of a Jenkins Pipeline, is checked into source control
 * and is expected to be the reference.
 * To fully support multibranch builds without issues, we are using docker-compose to setup cots for each build.
 *
 * @author Léo Mieulet
 * @see https://jenkins.io/doc/book/pipeline/jenkinsfile/
 */
pipeline {
    agent any

    stages {
        stage('Verify and build webapp') {
            steps {
                sh 'cd test/node && docker build -t rs_node .'
                sh 'cd test/node && docker run -i -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build rs_node'
            }
        }
        stage('Deploy Docker image') {
            steps {
                // Copy the bundle inside the folder where apache container will be bundledededed
                sh 'cp -R ./frontend-webapp/src/main/webapp/dist/prod test/nginx/dist'
                // build image from apache, tag with version/branch, then push
                sh 'cd test/nginx && ./buildTagAndPush.sh'
            }
        }
        stage('Deploy Maven image') {
            when {
                anyOf {
                    branch 'master'; branch 'develop'; branch 'develop_V1.1.0'; branch 'feature/V1.1.0/multibranch_pipeline'
                }
            }
            steps {
                sh 'cd test/java && docker build -t rs-maven-front .'
                sh 'cd test/java && docker run -i -v ${WORKSPACE}/:/app_to_build -e BRANCH_NAME -e WORKSPACE -e CI_DIR=test/java -e MODE=Deploy rs-maven-front'
            }
        }
    }
}