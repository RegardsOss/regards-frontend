#!/usr/bin/env groovy

/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
        stage('Create build image') {
            steps {
                sh 'cd jenkins/node && docker build -t rs_node . && chmod -R 0777 ${WORKSPACE}/webapp'
            }
        }
        stage('Install') {
            steps {
                parallel(
                    webapp: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/npm_cacache:/root/.npm/ \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install.sh'
                    },
                    plugin_criterion_data_with_picture_only: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion data-with-picture-only'
                    },
                    plugin_criterion_last_version: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion last-version-only'
                    },
                    plugin_criterion_enumerated: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion enumerated'
                    },
                    plugin_criterion_full_text: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion full-text'
                    }
                )
            }
        }
        stage('Install - 2') {
            steps {
                parallel(
                    plugin_criterion_numerical: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion numerical'
                    },
		            plugin_criterion_numerical_range: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion/numerical-range-criteria'
                    },
                    plugin_criterion_string: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion string'
                    },
                    plugin_criterion_temporal: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion temporal'
                    },
                    plugin_criterion_two_numerical: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion two-numerical'
                    },
                    plugin_criterion_two_temporal: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion two-temporal'
                    }
                )
            }
        }
        stage('Install - 3') {
            steps {
                parallel(
                    plugin_criterion_toponym: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh criterion toponym'
                    },
                    plugin_service_example: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh service example'
                    },
                    plugin_service_fem_delete: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh service fem-delete'
                    },
                    plugin_service_fem_notify: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh service fem-notify'
                    },
                    plugin_service_fem_edit: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./install-plugin.sh service fem-edit'
                    }
                )
            }
        }
        stage('Build-1') {
            steps {
                parallel(
                    webapp: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_webapp.sh'
                    },
                    plugin_criterion_data_with_picture_only: {
                        sh 'docker run --rm -i \
                        -v ${WORKSPACE}/webapp:/app_to_build \
                        rs_node ./build_plugin.sh criterion/data-with-picture-only'
                    },
                    plugin_criterion_last_version: {
                        sh 'docker run --rm -i \
                        -v ${WORKSPACE}/webapp:/app_to_build \
                        rs_node ./build_plugin.sh criterion/last-version-only'
                    },
                    plugin_criterion_enumerated: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/enumerated'
                    }
		        )
            }
        }
	    stage('Build-2') {
            steps {
                parallel(
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
                    plugin_criterion_numerical_range: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/numerical-range-criteria'
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
                    }
                )
            }
        }
	    stage('Build-3') {
            steps {
                parallel(
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
                    plugin_criterion_toponym: {
                        sh 'docker run --rm -i \
                            -v ${WORKSPACE}/webapp:/app_to_build \
                            rs_node ./build_plugin.sh criterion/toponym'
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
        stage('Lint webapp') {
            steps {
                sh 'docker run --rm -i \
                    -v ${WORKSPACE}/webapp:/app_to_build \
                    rs_node ./lint_webapp.sh'
            }
        }
    }
    post {
        failure {
            tuleapNotifyCommitStatus status: 'failure', repositoryId: '872', credentialId: 'tuleap-front-ci-token'
            mattermostSend color: 'danger', message: "Build Failed - ${env.JOB_NAME}#${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", text: "Changes: \n"+getChangeString()
        }
        success {
            tuleapNotifyCommitStatus status: 'success', repositoryId: '872', credentialId: 'tuleap-front-ci-token'
        }
    }
}


@NonCPS
def getChangeString() {
    def changeString = ""

    echo "Gathering SCM changes"
    def changeLogSets = currentBuild.changeSets
    for (int i = 0; i < changeLogSets.size(); i++) {
        def entries = changeLogSets[i].items
        for (int j = 0; j < entries.length; j++) {
            def entry = entries[j]
            changeString += " - ${entry.msg} [@${entry.author}]\n"
        }
    }

    if (!changeString) {
        changeString = " - No new changes"
    }
    return changeString
}
