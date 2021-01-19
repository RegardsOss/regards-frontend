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
import { DamDomain, UIDomain } from '@regardsoss/domain'

/**
 * Module configuration dump for data and datasets display
 * @author Raphaël Mechali
 */
export const configuration = {
  primaryPane: 'EXPANDED_COLLAPSIBLE',
  facets: {
    enabledFor: {
      [DamDomain.ENTITY_TYPES_ENUM.DATA]: true,
      [DamDomain.ENTITY_TYPES_ENUM.DATASET]: true,
    },
    initiallyEnabled: true,
    list: [
      { attributes: [{ name: 'my.attr.1' }], label: { en: 'My attribute 1', fr: 'Mon attribute 1' } },
      { attributes: [{ name: 'my.attr.2' }], label: { en: 'My attribute 2', fr: 'Mon attribute 2' } },
    ],
  },
  restrictions: {
    byDataset: {
      type: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS,
      selection: ['URN:DATASET:EXAMPLE1'],
    },
  },
  viewsGroups: {
    DATA: {
      enabled: true,
      initialMode: 'MAP',
      enableDownload: true,
      enableServices: true,
      sorting: [{ attributes: [{ name: 'properties.start_date' }] }, { attributes: [{ name: 'label' }] }],
      views: {
        TABLE: {
          enabled: true,
          attributes: [
            { attributes: [{ name: 'files' }], label: { en: 'Thumbnail', fr: 'Vignette' } },
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
          mapEngine: 'CESIUM',
          selectedMode: 'PICK_ON_CLICK',
          initialViewMode: 'MODE_3D',
          attributes: [
            { attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } },
            { attributes: [{ name: 'my.attr.1' }], label: { en: 'My attribute 1', fr: 'Mon attribute 1' } },
            { attributes: [{ name: 'my.attr.2' }], label: { en: 'My attribute 2', fr: 'Mon attribute 2' } }],
          layers: [
            {
              layerName: 'Layer', visible: true, enabled: true, background: true, layerViewMode: 'MODE_3D', url: 'https://c.tile.openstreetmap.org/', type: 'OSM',
            },
          ],
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
  criteriaGroups: [{
    showTitle: true,
    title: { [UIDomain.LOCALES_ENUM.en]: 'First group', [UIDomain.LOCALES_ENUM.fr]: 'Premier groupe' },
    criteria: [{ // completely resolved
      pluginId: 111,
      label: { [UIDomain.LOCALES_ENUM.en]: 'First criterion', [UIDomain.LOCALES_ENUM.fr]: 'Premier critère' },
      conf: {
        attributes: {
          field1: 'my.attr.1',
          field2: 'my.attr.2',
        },
      },
    }, { // no attribute
      label: { [UIDomain.LOCALES_ENUM.en]: 'Second criterion', [UIDomain.LOCALES_ENUM.fr]: 'Second critère' },
      pluginId: 833,
      conf: { attributes: {} },
    }, { // partially resolved
      pluginId: 455,
      label: { [UIDomain.LOCALES_ENUM.en]: 'Third criterion', [UIDomain.LOCALES_ENUM.fr]: 'Troisième critère' },
      conf: {
        attributes: {
          field1: 'my.attr.1',
          field2: 'my.attr.36',
        },
      },
    }],
  }, {
    showTitle: false,
    title: { [UIDomain.LOCALES_ENUM.en]: 'Second group', [UIDomain.LOCALES_ENUM.fr]: 'Deuxième groupe' },
    criteria: [{ // completely resolved
      pluginId: 1025,
      label: { [UIDomain.LOCALES_ENUM.en]: 'Fith criterion', [UIDomain.LOCALES_ENUM.fr]: 'Cinquième critère' },
      conf: { // resolved using standard attributes
        attributes: {
          fieldX: 'my.attr.1',
          fieldY: 'label',
        },
      },
    }],
  }, { // filtered group (empty after resolution attempt)
    showTitle: true,
    title: { [UIDomain.LOCALES_ENUM.en]: 'Third group', [UIDomain.LOCALES_ENUM.fr]: 'Troisième groupe' },
    criteria: [{ // unresoved
      pluginId: 1836,
      label: { [UIDomain.LOCALES_ENUM.en]: '6th criterion', [UIDomain.LOCALES_ENUM.fr]: '6ème critère' },
      conf: {
        attributes: {
          fieldX: 'my.unresolved.attr',
        },
      },
    }],
  }],
}
