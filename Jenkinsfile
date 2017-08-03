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
        stage('Deploy & Analyze') {
            when {
                anyOf {
                    branch 'master'; branch 'develop'; branch 'develop_V1.1.0'
                }
            }
            steps {
                sh 'cd test && docker-compose -p ${OLDPWD##*/} up rs_build_deploy'
            }
        }
        stage('Verify') {
            when {
                not {
                    anyOf {
                        branch 'master'; branch 'develop'; branch 'develop_V1.1.0'
                    }
                }
            }
            steps {
                sh 'cd test && docker-compose -p ${OLDPWD##*/} up rs_build_verify'
            }
        }
        stage('Clean') {
            steps {
                sh 'cd test && docker-compose down'
            }
        }
    }
}