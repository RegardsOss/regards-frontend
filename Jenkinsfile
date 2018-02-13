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
    agent { label 'unix-integration' }

    stages {
        stage('Install') {
            steps {
                sh 'cd jenkins/node && docker build -t rs_node . && chmod -R 0777 ${WORKSPACE}/frontend-webapp'
                sh 'docker run --rm -i \
                    -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                    -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                    -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                    rs_node ./install.sh'
            }
            post {
                always {
                    sh 'docker run --rm -i -v ${WORKSPACE}:/app_to_build rs_node ./reset_rights.sh $(id -u) $(id -g)'
                }
            }
        }
        stage('Build') {
            steps {
                parallel(
                    webapp: {
                        sh 'docker run \
                            --rm -i \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                            rs_node ./build_webapp.sh'
                    },
                    plugin_criterion_enumerated: {
                        sh 'docker run \
                            --rm -i \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/enumerated'
                    },
                    plugin_criterion_example: {
                        sh 'docker run \
                            --rm -i \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/example'
                    },
                    plugin_criterion_full_text: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/full-text'
                    },
                    plugin_criterion_numerical: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/numerical'
                    },
                    plugin_criterion_string: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/string'
                    },
                    plugin_criterion_temporal: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/temporal'
                    },
                    plugin_criterion_two_numerical: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/two-numerical'
                    },
                    plugin_criterion_two_temporal: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/two-temporal'
                    },
                    plugin_service_example: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                            -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                            rs_node ./build_plugin.sh service/example'
                    }
                )
            }
            post {
                always {
                    sh 'docker run --rm -i -v ${WORKSPACE}:/app_to_build rs_node ./reset_rights.sh $(id -u) $(id -g)'
                }
            }
        }
        stage('Deploy Docker image') {
            steps {
                // Copy the bundle inside the folder where apache container will be bundled
                sh 'cp -R ./frontend-webapp/src/main/webapp/dist/prod jenkins/nginx/dist'
                // build image from nginx, tag with version/branch, then push
                sh 'cd jenkins/nginx && ./buildTagAndPush.sh'
            }
        }
        stage('Deploy Maven artifact') {
            when {
                anyOf {
                    branch 'master'; branch 'develop'
                }
            }
            steps {
                parallel(
                    //sonar: {
                    //    sh 'docker run \
                    //        --rm -i \
                    //        -v ${WORKSPACE}/global_node_modules/@regardsoss:/usr/local/lib/node_modules/@regardsoss \
                    //        -v ${WORKSPACE}/global_node_modules/@regardsoss-modules:/usr/local/lib/node_modules/@regardsoss-modules \
                    //        -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/app_to_build \
                    //        rs_node ./run_coverage.sh'
                    //    sh 'sed -i s/app_to_build/data/g frontend-webapp/src/main/webapp/reports/coverage/lcov.info'
                    //    sh 'TAG=$(./jenkins/nginx/getPackageVersion.sh ./frontend-webapp/src/main/webapp) && \
                    //      docker run --rm \
                    //      --entrypoint /opt/sonar-runner-2.4/bin/sonar-runner \
                    //      -v ${WORKSPACE}/frontend-webapp/src/main/webapp:/data \
                    //      sebp/sonar-runner \
                    //      -Dsonar.projectVersion=${TAG} \
                    //      -Dsonar.host.url=http://172.26.47.129:9000/'
                    //    sh 'chmod -R 0777 frontend-webapp/src/main/webapp/.sonar || true'
                    //    sh 'rm -rf frontend-webapp/src/main/webapp/.sonar || true'
                    //},
                    maven: {
                        dir('rs-cloud') {
                            git branch: BRANCH_NAME, url: 'http://172.26.46.158:10080/regards/rs-cloud.git'
                        }
                        sh 'docker run --rm -i -v ${WORKSPACE}/frontend-webapp:/app_to_build rs_node ./reset_rights.sh $(id -u) $(id -g)'
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/rs-cloud/rs-frontend:/app_to_build \
                            -v ${WORKSPACE}/frontend-webapp/src/main/webapp/dist:/app_to_build/frontend-webapp/src/main/webapp/dist \
                            -v /opt/maven-multibranch-repository:/localRepository \
                            -e BRANCH_NAME -e WORKSPACE -e CI_DIR=jenkins -e MODE=Deploy \
                            172.26.46.158/rs-maven'
                    }
                )
            }
            post {
                always {
                    sh 'docker run --rm -i -v ${WORKSPACE}:/app_to_build rs_node ./reset_rights.sh $(id -u) $(id -g)'
                }
            }
        }
    }
}
