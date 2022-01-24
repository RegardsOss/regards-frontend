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
export default {
  UselessProcessPlugin: {
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
}
