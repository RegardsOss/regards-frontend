#!/usr/bin/env groovy

/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/

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
    options {
        buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '2'))
        parallelsAlwaysFailFast()
    }
    agent { label 'unix-integration' }

    stages {
        stage('Preparation') {
            steps {
                echo "Jenkins node name = ${env.NODE_NAME}"
                echo "Current workspace = ${env.WORKSPACE}"
                sh 'docker pull 172.26.46.158/regards-node-jenkins:16 && chmod -R 0777 ${WORKSPACE}/webapp'
            }
        }
        stage('Install') {
            steps {
                runFrontDockerImg("install", "")
            }
        }
        stage('Parallel build') {
            parallel {
                stage('-1-') {
                    stages {
                        stage('Build webapp') {
                            steps {
                                runFrontDockerImg("build_webapp", "")
                            }
                        }
                    }
                }
                stage('-2-') {
                    stages {
                        stage('Build data-with-picture-only') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/data-with-picture-only")
                            }
                        }
                        stage('Build last-version-only') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/last-version-only")
                            }
                        }
                        stage('Build enumerated') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/enumerated")
                            }
                        }
                        stage('Build fem-notify') {
                            steps {
                                runFrontDockerImg("build_plugin", "service/fem-notify")
                            }
                        }
                        stage('Build temporal') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/temporal")
                            }
                        }
                    }
                }
                stage('-3-') {
                    stages {
                        stage('Build full-text') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/full-text")
                            }
                        }
                        stage('Build numerical') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/numerical")
                            }
                        }
                        stage('Build numerical-range-criteria') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/numerical-range-criteria")
                            }
                        }
                        stage('Build string') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/string")
                            }
                        }
                        stage('Build fem-edit') {
                            steps {
                                runFrontDockerImg("build_plugin", "service/fem-edit")
                            }
                        }
			            stage('Build SNR-criterion') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/SNR-criterion")
                            }
                        }
                    }
                }
                stage('-4-') {
                    stages {
                        stage('Build two-numerical') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/two-numerical")
                            }
                        }
                        stage('Build two-temporal') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/two-temporal")
                            }
                        }
                        stage('Build toponym') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/toponym")
                            }
                        }
                        stage('Build example') {
                            steps {
                                runFrontDockerImg("build_plugin", "service/example")
                            }
                        }
                        stage('Build fem-delete') {
                            steps {
                                runFrontDockerImg("build_plugin", "service/fem-delete")
                            }
                        }
                        stage('Build geo-zone') {
                            steps {
                                runFrontDockerImg("build_plugin", "criterion/geo-zone")
                            }
                        }
                    }
                }
            }
        }

        stage('Final') {
            parallel {
                stage('Deploy Docker image') {
                    steps {
                        // Create the output folder jenkins/nginx/dist/, clean it if already existing, then
                        // copy the bundle inside the folder where front container is created
                        sh 'mkdir -p jenkins/nginx/dist/ && rm -rf jenkins/nginx/dist/* && cp -R ./webapp/dist/prod/* jenkins/nginx/dist/'
                        // build image from nginx, tag with version/branch, then push
                        sh 'cd jenkins/nginx && ./buildTagAndPush.sh'
                    }
                }
                stage('Lint webapp') {
                    steps {
                        runFrontDockerImg("lint_webapp", "")
                    }
                }
            }
        }
    }
    post {
        cleanup {
            echo 'POST-CLEANUP-TASK -- Rewrire owner and access rights, to avoid future build having files issues'
            sh 'chown -R jenkins:jenkins .'
            sh 'chmod -R u+rwx .'
            sh 'chmod -R g+rwx .'
        }
    }
}

// Run a docker image
// @params script script to execute
// @params pluginFolder the path to the plugin folder
@NonCPS
runFrontDockerImg(script, pluginFolder) {
    sh 'docker run --rm -i --tmpfs /tmp:exec \
        -v ${WORKSPACE}/webapp:/app_to_build \
        172.26.46.158/regards-node-jenkins:16 ./' + script + '.sh ' + pluginFolder
}

