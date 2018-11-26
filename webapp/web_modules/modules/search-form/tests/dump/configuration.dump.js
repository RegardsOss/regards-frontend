/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DatasetSelectionTypes from '../../src/domain/DatasetSelectionTypes'

/**
 * Holds module configurations dump
 * @author Raphaël Mechali
 */

export const criteriaServerAttributes = {
  36: {
    content: {
      jsonPath: 'xxx.long.parameter',
      name: 'long_parameter',
      label: 'Long parameter',
      type: DamDomain.MODEL_ATTR_TYPES.LONG,
    },
  },
  49: {
    content: {
      jsonPath: 'yyy.date.parameter',
      name: 'date_parameter',
      label: 'Date parameter',
      type: DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601,
    },
  },
  51: {
    content: {
      jsonPath: 'zzz.string.parameter',
      name: 'string_parameter',
      label: 'String parameter',
      type: DamDomain.MODEL_ATTR_TYPES.STRING,
    },
  },
}


export const criteria = [
  { // will not be resolved from above attributes map
    id: 1,
    label: 'enumerated-criteria',
    active: true,
    pluginId: 1,
    pluginInstanceId: '1',
    container: 'content',
    conf: {
      attributes: {
        testAttr1: 'missing.1',
        testAttr2: 'missing.2',
      },
    },
  },
  { // will be partially resolved from above attributes list
    id: 2,
    label: 'string-criterion',
    active: true,
    pluginId: 2,
    pluginInstanceId: '2',
    container: 'content',
    conf: {
      attributes: {
        testAttr1: 'xxx.long.parameter',
        testAttr2: 'missing.1',
        testAttr3: 'id',
      },
    },
  },
  { // will be fully resolved from above attributes list
    id: 3,
    label: 'test-criterion',
    active: true,
    pluginId: 3,
    container: 'content',
    pluginInstanceId: '3',
    conf: {
      attributes: {
        testAttr1: 'xxx.long.parameter',
        testAttr2: 'label',
        testAttr3: 'id',
      },
    },
  },
  { // will be fully resolved from above attributes list
    id: 4,
    label: 'another-test-criterion',
    active: true,
    pluginId: 4,
    container: 'content',
    pluginInstanceId: '4',
    conf: {
      attributes: {
        testAttr1: 'xxx.long.parameter',
        testAttr2: 'yyy.date.parameter',
        testAttr3: 'zzz.string.parameter',
      },
    },
  },
]

export const conf1 = {
  enableFacettes: false,
  layout: {
    id: 'main',
    type: 'type',
  },
  criterion: criteria,
  datasets: {
    type: DatasetSelectionTypes.DATASET_TYPE,
    selectedDatasets: ['URN:DATASET:EXAMPLE1'],
    selectedModels: [],
  },
  // search results dump conf (from a real example)
  searchResult: {
    primaryPane: 'COLLAPSED_EXPANDABLE',
    facettesInitiallySelected: true,
    enableFacettes: true,
    enableQuicklooks: false,
    enableDownload: false,
    initialViewMode: 'list',
    displayMode: 'data_dataset',
    displayConf: {
      quicklookColumnWidth: 400,
      quicklookColumnSpacing: 20,
    },
    data: {
      columns: [
        {
          attributes: [
            {
              name: 'label',
            },
          ],
          label: {
            en: 'Label',
            fr: 'Libellé',
          },
        },
        {
          attributes: [
            {
              name: 'properties.date',
            },
          ],
          label: {
            en: 'Date UTC',
            fr: 'Date UTC',
          },
        },
      ],
      facets: [
        {
          attributes: [
            {
              name: 'properties.date',
            },
          ],
          label: {
            en: 'Date UTC',
            fr: 'Date UTC',
          },
        },
      ],
      sorting: [
        {
          attributes: [
            {
              name: 'properties.date',
            },
          ],
        },
        {
          attributes: [
            {
              name: 'label',
            },
          ],
        },
      ],
    },
    dataset: {
      columns: [
        {
          attributes: [
            {
              name: 'label',
            },
          ],
          label: {
            en: 'Label',
            fr: 'Libellé',
          },
        },
        {
          attributes: [
            {
              name: 'id',
            },
          ],
          label: {
            en: 'Internal ID',
            fr: 'ID interne',
          },
        },
        {
          attributes: [
            {
              name: 'properties.name',
            },
          ],
          label: {
            en: 'Name',
            fr: 'Nom',
          },
        },
      ],
    },
  },
}
