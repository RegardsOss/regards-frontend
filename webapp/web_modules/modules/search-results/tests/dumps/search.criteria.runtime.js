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

import { UIDomain } from '@regardsoss/domain'
import CriteriaGroupsTableComponent from '../../src/components/admin/content/search/CriteriaGroupsTableComponent'
import { attributes } from './attributes.dump'
import { pluginMeta2, pluginMeta35, allPluginMeta } from './search.plugins.meta.runtime'

/**
 * Provides an example configuration of groups and corresponding edition rows. Nota: the
 * configuration has invalid elements for test purposes (no label, no configuration...)
 * - just like network, it is not a real network dump but a runtime assembly
 * @author Raphaël Mechali
 */
export const exampleConfiguration = [{ // group 1: 3 criteria, valid title shown
  showTitle: true,
  title: {
    [UIDomain.LOCALES_ENUM.en]: 'Group 1',
    [UIDomain.LOCALES_ENUM.fr]: 'Groupe 1',
  },
  criteria: [{ // crit 1.1: Fully OK
    label: {
      [UIDomain.LOCALES_ENUM.en]: 'Criterion 1.1',
      [UIDomain.LOCALES_ENUM.fr]: 'Critère 1.1',
    },
    pluginId: pluginMeta35.pluginId,
    conf: {
      attributes: {
        field1: attributes[2].content.jsonPath,
        field2: attributes[3].content.jsonPath,
      },
    },
  }, { // crit 1.2: No label
    label: {
      [UIDomain.LOCALES_ENUM.en]: '',
      [UIDomain.LOCALES_ENUM.fr]: '',
    },
    pluginId: pluginMeta35.pluginId,
    conf: {
      attributes: {
        field1: attributes[1].content.jsonPath,
        field2: attributes[3].content.jsonPath,
      },
    },
  }, { // crit 1.3: No plugin
    label: {
      [UIDomain.LOCALES_ENUM.en]: 'Criterion 1.3',
      [UIDomain.LOCALES_ENUM.fr]: 'Critère 1.3',
    },
    pluginId: null,
    conf: {
      attributes: {},
    },
  }],
}, { // group 2: 1 criterion, no title but hidden (OK)
  showTitle: false,
  title: {
    [UIDomain.LOCALES_ENUM.en]: '',
    [UIDomain.LOCALES_ENUM.fr]: '',
  },
  criteria: [{ // Criterion 2.1 - not configured
    label: {
      [UIDomain.LOCALES_ENUM.en]: 'Criterion 2.1',
      [UIDomain.LOCALES_ENUM.fr]: 'Critère 2.1',
    },
    pluginId: pluginMeta2.pluginId,
    conf: {
      attributes: {
        f1: null,
      },
    },
  }],
}, { // group 3: 0 criterion, no title but shown (KO)
  showTitle: true,
  title: {
    [UIDomain.LOCALES_ENUM.en]: '',
    [UIDomain.LOCALES_ENUM.fr]: '',
  },
  criteria: [],
}]

/** Entities for that configuration */
export const exampleEntities = CriteriaGroupsTableComponent.convertToEntities(exampleConfiguration, allPluginMeta)
