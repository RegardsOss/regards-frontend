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
import { DamDomain } from '@regardsoss/domain'

/**
 * Holds plugin meta as resolved at runtime for criteria edition (similar to dump, but
 * not from network)
 * @author Raphaël Mechali
 */

export const pluginMeta2 = {
  pluginId: 2,
  name: 'terminate-humans',
  version: '1.3.0-beta',
  author: 'Terminator',
  description: 'bip bip bip',
  configuration: {
    attributes: [{
      name: 'f1',
      description: 'Terminator doesn\'t need any human readable label',
      attributeType: [
        DamDomain.MODEL_ATTR_TYPES.DATE_ARRAY,
        DamDomain.MODEL_ATTR_TYPES.DATE_INTERVAL,
      ],
    }],
  },
}

export const pluginMeta35 = {
  pluginId: 35,
  name: 'my-plugin-with-configuration',
  version: '3.6.0',
  author: 'Tartuffe II',
  description: 'Does nothing',
  configuration: {
    attributes: [{
      name: 'field1',
      description: 'my field 1',
      attributeType: [DamDomain.MODEL_ATTR_TYPES.STRING],
    }, {
      name: 'field2',
      attributeType: [
        DamDomain.MODEL_ATTR_TYPES.DOUBLE,
        DamDomain.MODEL_ATTR_TYPES.INTEGER,
        DamDomain.MODEL_ATTR_TYPES.LONG,
      ],
    }],
  },
}

export const allPluginMeta = [pluginMeta2, pluginMeta35]
