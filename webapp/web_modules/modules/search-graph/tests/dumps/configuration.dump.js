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
 * Holds a module configuration dump, from database, for tests (mostly prop types)
 * @author Raphaël Mechali
 */

export const configuration1 = {
  primaryPane: 'EXPANDED_COLLAPSIBLE',
  searchResult: {
    primaryPane: 'EXPANDED_COLLAPSIBLE',
    viewsGroups: {
      DATA: {
        enabled: true,
        tabTitle: { en: 'Dadata', fr: 'Dodonnées' },
        initialMode: 'QUICKLOOK',
        enableDownload: true,
        facets: {
          enabled: true,
          initiallyEnabled: true,
          list: [{ attributes: [{ name: 'model' }], label: { en: 'Model', fr: 'Modèle' } }],
        },
        sorting: [{ attributes: [{ name: 'label' }] }],
        views: {
          TABLE: {
            enabled: true,
            attributes: [
              { attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } },
              { attributes: [{ name: 'files.THUMBNAIL[0]' }], label: { en: 'Thumbnail', fr: 'Vignette' } }],
          },
          QUICKLOOK: {
            enabled: true,
            attributes: [
              { attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } }],
          },
          MAP: {
            enabled: true,
            attributes: [
              { attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } }],
            layers: [
              {
                enabled: true, background: true, layerViewMode: 'MODE_3D', url: 'https://c.tile.openstreetmap.org/', type: 'OSM',
              },
            ],
          },
        },
      },
      DATASET: {
        enabled: true,
        tabTitle: { en: 'Datataset', fr: 'Jejeux de données' },
        initialMode: 'TABLE',
        sorting: [],
        views: {
          TABLE: {
            enabled: true,
            attributes: [
              { attributes: [{ name: 'properties.LABEL' }], label: { en: 'Label', fr: 'Libellé' } },
              { attributes: [{ name: 'model' }], label: { en: 'Model', fr: 'Modèle' } },
              { attributes: [{ name: 'properties.Missions' }], label: { en: 'Missions', fr: 'Missions' } }],
          },
        },
      },
    },
  },
  graphLevels: ['COLLECTION_MODEL_PARENT_1', 'COLLECTION_MODEL_PARENT_2', 'COLLECTION_MODEL_PARENT_3', 'VALIDATION_COLLECTION_MODEL_1'],
  graphDatasetAttributes: [
    { attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } },
    { attributes: [{ name: 'model' }], label: { en: 'Model', fr: 'Modèle' } },
  ],
}
