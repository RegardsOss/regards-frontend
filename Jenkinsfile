#!/usr/bin/env groovy

/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
    agent { label 'unix-integration' }

    stages {
        stage('Install') {
            steps {
                sh 'cd jenkins/node && docker build -t rs_node . && chmod -R 0777 ${WORKSPACE}/webapp'
                sh 'docker run --rm -i \
                    -v ${WORKSPACE}/npm_cacache:/root/.npm/ \
                    -v ${WORKSPACE}/webapp:/app_to_build \
                    rs_node ./install.sh'
            }
        }
        stage('Build') {
            steps {
                parallel(
                    webapp: {
                        sh 'docker run \
                            --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_webapp.sh'
                    },
                    plugin_criterion_data_with_picture_only: {
                        sh 'docker run \
                        --rm -i \
                        -v ${WORKSPACE}/webapp:/app_to_build \
                        rs_node ./build_plugin.sh criterion/data-with-picture-only'
                    },
                    plugin_criterion_enumerated: {
                        sh 'docker run \
                            --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/enumerated'
                    },
                    plugin_criterion_full_text: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/full-text'
                    },
                    plugin_criterion_numerical: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/numerical'
                    },
                    plugin_criterion_string: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/string'
                    },
                    plugin_criterion_temporal: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/temporal'
                    },
                    plugin_criterion_two_numerical: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/two-numerical'
                    },
                    plugin_criterion_two_temporal: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/two-temporal'
                    },
                    plugin_service_example: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh service/example'
                    },
                    plugin_service_fem_delete: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh service/fem-delete'
                    },
                    plugin_service_fem_notify: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh service/fem-notify'
                    },
                    plugin_service_fem_edit: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh service/fem-edit'
                    }
                )
            }
        }
        stage('Deploy Docker image') {
	    when {
                expression { BRANCH_NAME ==~ /(master|develop.*|release.*|feature.*)/ }
            }
            steps {
                // Copy the bundle inside the folder where apache container will be bundled
                sh 'cp -R ./webapp/dist/prod jenkins/nginx/dist'
                // build image from nginx, tag with version/branch, then push
                sh 'cd jenkins/nginx && ./buildTagAndPush.sh'
            }
        }
        // stage('Deploy Maven artifact') {
        //     when {
		//         expression { BRANCH_NAME ==~ /(master|develop.*|release.*)/ }
        //     }
        //     steps {
        //         parallel(
        //             sonar: {
        //                 sh 'docker run \
        //                     --rm -i \
        //                     -v ${WORKSPACE}/webapp:/app_to_build \
        //                     rs_node ./run_coverage.sh'
        //                 sh 'sed -i s/app_to_build/data/g webapp/reports/coverage/lcov.info'
        //                 sh 'TAG=$(./jenkins/nginx/getPackageVersion.sh ./webapp) && \
        //                     docker run --rm \
        //                     -w /data \
        //                     -v ${WORKSPACE}/webapp:/data \
        //                     skilldlabs/sonar-scanner:3.3 \
        //                     sonar-scanner \
        //                     -Dsonar.projectVersion=${TAG} \
        //                     -Dsonar.branch.name=${BRANCH_NAME} \
        //                     -Dsonar.projectBaseDir=/data \
        //                     -Dsonar.host.url=http://172.26.47.129:9000/'
		//                 sh 'docker run --rm -w /data -v ${WORKSPACE}/webapp:/data  skilldlabs/sonar-scanner:3.3 chmod -R 0777 /data/.scannerwork'
        //                 sh 'rm -rf webapp/.scannerwork || true'
        //             },
        //             maven: {
        //                 sh 'docker run --rm -i \
        //                     -v ${WORKSPACE}/frontend-boot:/app_to_build \
        //                     -v ${WORKSPACE}/webapp/dist/prod:/webapp/dist/prod \
        //                     -v /DATA/maven-multibranch-repository:/localRepository \
        //                     -v /usr/bin/docker:/bin/docker \
        //                     -v /var/run/docker.sock:/var/run/docker.sock \
        //                     -e BRANCH_NAME -e WORKSPACE -e CI_DIR=jenkins -e MODE=Deploy \
        //                     172.26.46.158/rs-maven'
        //             }
        //         )
        //     }
        // }
    }
}
