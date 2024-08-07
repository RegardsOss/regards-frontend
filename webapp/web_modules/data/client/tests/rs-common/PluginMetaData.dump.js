/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
      pluginClassName: 'fr.cnes.regards.modules.ingest.service.plugin.FullPluginExample',
      interfaceNames: ['fr.cnes.regards.modules.ingest.domain.plugin.IFullPluginExample'],
      author: 'REGARDS Team',
      pluginId: 'FullPluginExample',
      version: '1.0.0',
      description: 'Fake no effect SIP validation plugin (do not use in production)',
      url: 'https://regardsoss.github.io/',
      contact: 'regards@c-s.fr',
      owner: 'CNES',
      licence: 'GPLv3',
      parameters: [{
        name: 'pString',
        label: 'Simple string',
        description: 'Simple string description',
        type: 'STRING',
        optional: false,
      }, {
        name: 'pByte',
        label: 'Simple byte',
        description: 'Simple byte description',
        type: 'BYTE',
        optional: false,
      }, {
        name: 'pShort',
        label: 'Simple short',
        description: 'Simple short description',
        type: 'SHORT',
        optional: false,
      }, {
        name: 'pInteger',
        label: 'Simple integer',
        description: 'Simple integer description',
        type: 'INTEGER',
        optional: false,
      }, {
        name: 'pLong',
        label: 'Simple long',
        description: 'Simple long description',
        type: 'LONG',
        optional: false,
      }, {
        name: 'pFloat',
        label: 'Simple float',
        description: 'Simple float description',
        type: 'FLOAT',
        optional: false,
      }, {
        name: 'pDouble',
        label: 'Simple double',
        description: 'Simple double description',
        type: 'DOUBLE',
        optional: false,
      }, {
        name: 'pBoolean',
        label: 'Simple boolean',
        description: 'Simple boolean description',
        type: 'BOOLEAN',
        optional: false,
      }, {
        name: 'sList',
        label: 'List of string',
        description: 'List of string description',
        type: 'COLLECTION',
        parameterizedSubTypes: ['STRING'],
        optional: false,
      }, {
        name: 'sListPojo',
        label: 'List of objects',
        description: 'List of objects',
        type: 'COLLECTION',
        parameterizedSubTypes: ['fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Pojo'],
        optional: false,
        parameters: [{
          name: 'message', label: 'message', type: 'STRING', optional: false,
        }],
      }, {
        name: 'ssMap',
        label: 'Map string to string',
        description: 'Map string to string description',
        type: 'MAP',
        parameterizedSubTypes: ['java.lang.String', 'java.lang.String'],
        optional: false,
      }, {
        name: 'pojo',
        label: 'Pojo containing string',
        description: '',
        type: 'POJO',
        optional: false,
        parameters: [{
          name: 'message', label: 'message', type: 'STRING', optional: false,
        }],
      }, {
        name: 'constraints',
        label: 'Constraint pojo wrapper',
        description: '',
        type: 'POJO',
        optional: false,
        parameters: [{
          name: 'constraints',
          label: 'List of constraints',
          description: '',
          type: 'COLLECTION',
          parameterizedSubTypes: ['fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Constraint'],
          optional: false,
          parameters: [{
            name: 'pattern', label: 'Pattern', description: 'JAVA regular expression', type: 'STRING', optional: false,
          }, {
            name: 'enabled', label: 'Enabled', description: 'Contraint may be enabled/disabled', type: 'BOOLEAN', defaultValue: 'true', optional: true,
          }],
        }],
      }, {
        name: 'scMap',
        label: 'Constraint map',
        description: '',
        type: 'MAP',
        parameterizedSubTypes: ['java.lang.String', 'fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Constraint'],
        optional: false,
        parameters: [{
          name: 'pattern', label: 'Pattern', description: 'JAVA regular expression', type: 'STRING', optional: false,
        }, {
          name: 'enabled', label: 'Enabled', description: 'Contraint may be enabled/disabled', type: 'BOOLEAN', defaultValue: 'true', optional: true,
        }],
      }, {
        name: 'embedded', label: 'Embedded plugin', description: '', parameterizedSubTypes: ['fr.cnes.regards.modules.ingest.domain.plugin.ISipValidation'], type: 'PLUGIN', optional: false, parameters: [],
      }],
    },
    links: [],
  },
  {
    content: {
      id: 'aComplexErrorPlugin',
      pluginId: 'aComplexErrorPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexErrorPlugin',
      interfaceName: 'fr.cnes.regards.framework.plugins.ComplexErrorPlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
        'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Complex plugin test',
      parameters: [
        {
          name: 'coeff',
          type: 'INTEGER',
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 'aSamplePlugin',
      pluginId: 'aSamplePlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
      interfaceNames: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '12345-6789-11',
      description: 'Sample plugin test',
      parameters: [
        {
          name: 'suffix',
          type: 'STRING',
        },
        {
          name: 'coeff',
          type: 'INTEGER',
        },
        {
          name: 'isActive',
          type: 'BOOLEAN',
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 'aSampleErrorPlugin',
      pluginId: 'aSampleErrorPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.SampleErrorPlugin',
      interfaceName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Sample plugin test',
      parameters: [
        {
          name: 'suffix',
          type: 'STRING',
        },
        {
          name: 'coeff',
          type: 'INTEGER',
        },
        {
          name: 'isActive',
          type: 'BOOLEAN',
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 'aComplexPlugin',
      pluginId: 'aComplexPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexPlugin',
      interfaceName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Complex plugin test',
      parameters: [
        {
          name: 'plgInterface',
          parameterizedSubTypes: ['fr.cnes.regards.framework.plugins.IComplexInterfacePlugin'],
          type: 'PLUGIN',
        },
        {
          name: 'coeff',
          type: 'INTEGER',
        },
        {
          name: 'isActive',
          type: 'BOOLEAN',
        },
      ],
    },
    links: [],
  },
  {
    content: {
      pluginClassName: 'fr.cnes.regards.modules.processing.controller.UselessProcessPlugin',
      interfaceNames: [
        'fr.cnes.regards.modules.processing.plugins.IProcessDefinition',
      ],
      author: 'REGARDS Team',
      pluginId: 'UselessProcessPlugin',
      version: '1.0.0-SNAPSHOT',
      description: 'UselessProcessPlugin description',
      markdown: '',
      url: 'https://github.com/RegardsOss',
      contact: 'regards@c-s.fr',
      owner: 'CSSI',
      license: 'GPLv3',
      parameters: [
        {
          name: 'processName',
          label: 'Process name',
          description: 'Plugin instance name',
          type: 'STRING',
          optional: false,
          sensitive: false,
          unconfigurable: false,
        },
        {
          name: 'active',
          label: 'Activation flag',
          description: 'Allows to deactivate temporarily a process, preventing new executions.',
          type: 'BOOLEAN',
          optional: false,
          sensitive: false,
          unconfigurable: false,
        },
        {
          name: 'allowedUserRoles',
          label: 'Allowed User Roles',
          description: 'List of allowed user roles for which this process can be used ; empty or missing means all.',
          parameterizedSubTypes: [
            'STRING',
          ],
          type: 'COLLECTION',
          optional: true,
          sensitive: false,
          unconfigurable: false,
        },
        {
          name: 'allowedDatasets',
          label: 'Allowed Data Sets',
          description: 'List of allowed order datasets for which this process can be used ; empty or missing means all.',
          parameterizedSubTypes: [
            'STRING',
          ],
          type: 'COLLECTION',
          optional: true,
          sensitive: false,
          unconfigurable: false,
        },
      ],
    },
  },
  {
    content: {
      pluginClassName: 'fr.cnes.regards.modules.processing.plugins.impl.SimpleShellProcessPlugin',
      interfaceNames: [
        'fr.cnes.regards.modules.processing.plugins.IProcessDefinition',
      ],
      author: 'REGARDS Team',
      pluginId: 'SimpleShellProcessPlugin',
      version: '1.0.0-SNAPSHOT',
      description: 'Launch a shell script',
      markdown: 'This plugin provides a fully customizable way to launch shell scripts.\n\nHowever, the shell scripts must conform to the following conventions:\n\n- the script must be executable and available in the PATH of the rs-processing instance,\n  or be given as an absolute path (in which case the full path must be accessible by the\n  java process launching rs-processing)\n- the script is invoked directly, with no command line arguments\n- all script parameters are set through environment variables, whose names are defined\n  in the plugin configuration, and set once and for all at the batch creation\n- the script is executed from a specific workdir for each execution, containing:\n    + an `input` folder with all the input files for the execution\n    + an empty `output` folder where the script must create all the output files\n- the script terminates with code 0 in case of success, any other code in case of failure\n- the script does not use the standard input\n- the script outputs its logs in the standard output\n- if the script uses executables, they must be installed, reachable and executable by the process  launching the rs-processing instance.',
      url: 'https://github.com/RegardsOss',
      contact: 'regards@c-s.fr',
      owner: 'CSSI',
      license: 'GPLv3',
      parameters: [
        {
          name: 'shellScript',
          label: 'Shell script name or absolute path',
          description: 'The script must be executable and reachable by rs-processing.',
          type: 'STRING',
          optional: false,
          sensitive: false,
          unconfigurable: false,
        },
        {
          name: 'envVarNames',
          label: 'Environment variable names',
          description: 'List of the names of the environment variables needed to be set by the user when creating the batch.',
          parameterizedSubTypes: [
            'STRING',
          ],
          type: 'COLLECTION',
          optional: true,
          sensitive: false,
          unconfigurable: false,
        },
        {
          name: 'sizeForecast',
          label: 'Size forecast',
          description: 'In order to decide before launching a batch execution whether it will overflow the size quota, we need to have an even imprecise forecast of how much space the execution will occupy. This is a string whose pattern is an optional \u0027*\u0027, a number, a letter. The letter is the unit: \u0027b\u0027 for byte, \u0027k\u0027 for kilobytes, \u0027m\u0027 for megabytes, \u0027g\u0027 for gigabytes. If the value starts with \u0027*\u0027, it will be a multiplier per megabyte of input data. For instance: \u00271g\u0027 means the result expected size is 1 gigabyte, no matter the input size. Whereas \u0027*2.5k\u0027 means that for every megabyte in input, there wille be 2.5 kilobytes of data in the output.',
          type: 'STRING',
          optional: false,
          sensitive: false,
          unconfigurable: false,
        },
        {
          name: 'durationForecast',
          label: 'Duration forecast',
          description: 'In order to detect executions which have silently stopped working, we need an even imprecise estimation of the duration the execution will take. The processing module will take this duration, and multiply by a constant configurable value in order to define a timeout. Examples: \u002710s\u0027 for 10 seconds, \u00275min\u0027 for 5 minutes, \u00274h\u0027 for 4 hours, \u00272d\u0027 for 2 days ; \u002710s/m\u0027 for 10 seconds per megabyte of input data ; \u00274h/g\u0027 for 4 hours per gigabyte of input data.',
          type: 'STRING',
          optional: false,
          sensitive: false,
          unconfigurable: false,
        },
        {
          name: 'processName',
          label: 'Process name',
          description: 'Plugin instance name',
          type: 'STRING',
          optional: false,
          sensitive: false,
          unconfigurable: false,
        },
        {
          name: 'active',
          label: 'Activation flag',
          description: 'Allows to deactivate temporarily a process, preventing new executions.',
          type: 'BOOLEAN',
          optional: false,
          sensitive: false,
          unconfigurable: false,
        },
        {
          name: 'allowedUserRoles',
          label: 'Allowed User Roles',
          description: 'List of allowed user roles for which this process can be used ; empty or missing means all.',
          parameterizedSubTypes: [
            'STRING',
          ],
          type: 'COLLECTION',
          optional: true,
          sensitive: false,
          unconfigurable: false,
        },
        {
          name: 'allowedDatasets',
          label: 'Allowed Data Sets',
          description: 'List of allowed order datasets for which this process can be used ; empty or missing means all.',
          parameterizedSubTypes: [
            'STRING',
          ],
          type: 'COLLECTION',
          optional: true,
          sensitive: false,
          unconfigurable: false,
        },
        {
          defaultValue: '0',
          description: 'This parameter allows to limit the number of features given as input. Must be positive or null. Set to 0 for no limit.',
          label: 'Maximum number of features in input for one execution',
          name: 'maxFilesInInput',
          optional: true,
          sensitive: false,
          type: 'LONG',
        },
        {
          defaultValue: 'false',
          description: 'Keep the consistency of an processing by forbidding the split of the order into multiple suborders. The ordered products will be processed in the same batch.',
          label: 'Forbid an order to be split into multiple orders.',
          name: 'forbidSplitInSuborders',
          optional: true,
          sensitive: false,
          type: 'BOOLEAN',
        },
      ],
    },
  },
]
