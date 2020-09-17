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
export default [
    {
        content: {
            pluginClassName: "fr.cnes.regards.modules.processing.controller.UselessProcessPlugin",
            interfaceNames: [
                "fr.cnes.regards.modules.processing.plugins.IProcessDefinition"
            ],
            author: "REGARDS Team",
            pluginId: "UselessProcessPlugin",
            version: "1.0.0-SNAPSHOT",
            description: "UselessProcessPlugin description",
            markdown: "",
            url: "https://github.com/RegardsOss",
            contact: "regards@c-s.fr",
            owner: "CSSI",
            license: "GPLv3",
            parameters: [
                {
                    name: "processName",
                    label: "Process name",
                    description: "Plugin instance name",
                    type: "STRING",
                    optional: false,
                    sensitive: false,
                    unconfigurable: false
                },
                {
                    name: "active",
                    label: "Activation flag",
                    description: "Allows to deactivate temporarily a process, preventing new executions.",
                    type: "BOOLEAN",
                    optional: false,
                    sensitive: false,
                    unconfigurable: false
                },
                {
                    name: "allowedUserRoles",
                    label: "Allowed User Roles",
                    description: "List of allowed user roles for which this process can be used ; empty or missing means all.",
                    parameterizedSubTypes: [
                        "STRING"
                    ],
                    type: "COLLECTION",
                    optional: true,
                    sensitive: false,
                    unconfigurable: false
                },
                {
                    name: "allowedDatasets",
                    label: "Allowed Data Sets",
                    description: "List of allowed order datasets for which this process can be used ; empty or missing means all.",
                    parameterizedSubTypes: [
                        "STRING"
                    ],
                    type: "COLLECTION",
                    optional: true,
                    sensitive: false,
                    unconfigurable: false
                }
            ]
        }
    },
    {
        content: {
            pluginClassName: "fr.cnes.regards.modules.processing.plugins.impl.SimpleShellProcessPlugin",
            interfaceNames: [
                "fr.cnes.regards.modules.processing.plugins.IProcessDefinition"
            ],
            author: "REGARDS Team",
            pluginId: "SimpleShellProcessPlugin",
            version: "1.0.0-SNAPSHOT",
            description: "Launch a shell script",
            markdown: "This plugin provides a fully customizable way to launch shell scripts.\n\nHowever, the shell scripts must conform to the following conventions:\n\n- the script must be executable and available in the PATH of the rs-processing instance,\n  or be given as an absolute path (in which case the full path must be accessible by the\n  java process launching rs-processing)\n- the script is invoked directly, with no command line arguments\n- all script parameters are set through environment variables, whose names are defined\n  in the plugin configuration, and set once and for all at the batch creation\n- the script is executed from a specific workdir for each execution, containing:\n    + an `input` folder with all the input files for the execution\n    + an empty `output` folder where the script must create all the output files\n- the script terminates with code 0 in case of success, any other code in case of failure\n- the script does not use the standard input\n- the script outputs its logs in the standard output\n- if the script uses executables, they must be installed, reachable and executable by the process  launching the rs-processing instance.",
            url: "https://github.com/RegardsOss",
            contact: "regards@c-s.fr",
            owner: "CSSI",
            license: "GPLv3",
            parameters: [
                {
                    name: "shellScript",
                    label: "Shell script name or absolute path",
                    description: "The script must be executable and reachable by rs-processing.",
                    type: "STRING",
                    optional: false,
                    sensitive: false,
                    unconfigurable: false
                },
                {
                    name: "envVarNames",
                    label: "Environment variable names",
                    description: "List of the names of the environment variables needed to be set by the user when creating the batch.",
                    parameterizedSubTypes: [
                        "STRING"
                    ],
                    type: "COLLECTION",
                    optional: true,
                    sensitive: false,
                    unconfigurable: false
                },
                {
                    name: "sizeForecast",
                    labEL: "Size forecast",
                    description: "In order to decide before launching a batch execution whether it will overflow the size quota, we need to have an even imprecise forecast of how much space the execution will occupy. This is a string whose pattern is an optional \u0027*\u0027, a number, a letter. The letter is the unit: \u0027b\u0027 for byte, \u0027k\u0027 for kilobytes, \u0027m\u0027 for megabytes, \u0027g\u0027 for gigabytes. If the value starts with \u0027*\u0027, it will be a multiplier per megabyte of input data. For instance: \u00271g\u0027 means the result expected size is 1 gigabyte, no matter the input size. Whereas \u0027*2.5k\u0027 means that for every megabyte in input, there wille be 2.5 kilobytes of data in the output.",
                    type: "STRING",
                    optional: false,
                    sensitive: false,
                    unconfigurable: false
                },
                {
                    name: "durationForecast",
                    label: "Duration forecast",
                    description: "In order to detect executions which have silently stopped working, we need an even imprecise estimation of the duration the execution will take. The processing module will take this duration, and multiply by a constant configurable value in order to define a timeout. Examples: \u002710s\u0027 for 10 seconds, \u00275min\u0027 for 5 minutes, \u00274h\u0027 for 4 hours, \u00272d\u0027 for 2 days ; \u002710s/m\u0027 for 10 seconds per megabyte of input data ; \u00274h/g\u0027 for 4 hours per gigabyte of input data.",
                    type: "STRING",
                    optional: false,
                    sensitive: false,
                    unconfigurable: false
                },
                {
                    name: "processName",
                    label: "Process name",
                    description: "Plugin instance name",
                    type: "STRING",
                    optional: false,
                    sensitive: false,
                    unconfigurable: false
                },
                {
                    name: "active",
                    label: "Activation flag",
                    description: "Allows to deactivate temporarily a process, preventing new executions.",
                    type: "BOOLEAN",
                    optional: false,
                    sensitive: false,
                    unconfigurable: false
                },
                {
                    name: "allowedUserRoles",
                    label: "Allowed User Roles",
                    description: "List of allowed user roles for which this process can be used ; empty or missing means all.",
                    parameterizedSubTypes: [
                        "STRING"
                    ],
                    type: "COLLECTION",
                    optional: true,
                    sensitive: false,
                    unconfigurable: false
                },
                {
                    name: "allowedDatasets",
                    label: "Allowed Data Sets",
                    description: "List of allowed order datasets for which this process can be used ; empty or missing means all.",
                    parameterizedSubTypes: [
                        "STRING"
                    ],
                    type: "COLLECTION",
                    optional: true,
                    sensitive: false,
                    unconfigurable: false
                }
            ]
        }
    }
]