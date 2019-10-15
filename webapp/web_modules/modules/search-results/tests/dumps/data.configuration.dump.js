/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Module configuration dump for data and datasets display
 * @author Raphaël Mechali
 */
export const configuration = {
  primaryPane: 'EXPANDED_COLLAPSIBLE',
  restrictions: {
    byDataset: {
      type: UIDomain.DATASET_RESCRICTIONS_TYPES_ENUM.SELECTED_DATASETS,
      selection: ['URN:DATASET:EXAMPLE1'],
    },
  },
  viewsGroups: {
    DATA: {
      enabled: true,
      initialMode: 'MAP',
      enableDownload: true,
      facets: {
        enabled: true,
        initiallyEnabled: true,
        list: [
          { attributes: [{ name: 'my.attr.1' }], label: { en: 'My attribute 1', fr: 'Mon attribute 1' } },
          { attributes: [{ name: 'my.attr.2' }], label: { en: 'My attribute 2', fr: 'Mon attribute 2' } },
        ],
      },
      sorting: [{ attributes: [{ name: 'properties.start_date' }] }, { attributes: [{ name: 'label' }] }],
      views: {
        TABLE: {
          enabled: true,
          attributes: [
            { attributes: [{ name: 'files.THUMBNAIL[0]' }], label: { en: 'Thumbnail', fr: 'Vignette' } },
            { attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } },
            { attributes: [{ name: 'my.attr.1' }], label: { en: 'My attribute 1', fr: 'Mon attribute 1' } },
            { attributes: [{ name: 'my.attr.2' }], label: { en: 'My attribute 2', fr: 'Mon attribute 2' } }],
        },
        QUICKLOOK: {
          enabled: true,
          attributes: [
            { attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } },
            { attributes: [{ name: 'my.attr.1' }], label: { en: 'My attribute 1', fr: 'Mon attribute 1' } },
            { attributes: [{ name: 'my.attr.2' }], label: { en: 'My attribute 2', fr: 'Mon attribute 2' } }],
        },
        MAP: {
          enabled: true,
          attributes: [
            { attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } },
            { attributes: [{ name: 'my.attr.1' }], label: { en: 'My attribute 1', fr: 'Mon attribute 1' } },
            { attributes: [{ name: 'my.attr.2' }], label: { en: 'My attribute 2', fr: 'Mon attribute 2' } }],
          backgroundLayer: { url: 'https://c.tile.openstreetmap.org/', type: 'OSM' },
        },
      },
      tabTitle: { en: 'The data', fr: 'Les données' },
    },
    DATASET: {
      enabled: true,
      tabTitle: { en: 'The datasets', fr: 'Les jeux de données' },
      initialMode: 'TABLE',
      sorting: [],
      views: {
        TABLE: {
          enabled: true,
          attributes: [
            { attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } },
            { attributes: [{ name: 'my.attr.2' }], label: { en: 'My attribute 2', fr: 'Mon attribute 2' } }],
        },
      },
    },
  },
}
