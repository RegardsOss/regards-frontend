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


/**
 * Module configuration dump for documents display
 * @author Raphaël Mechali
 */
export const configuration = {
  primaryPane: 'ALWAYS_EXPANDED',
  viewsGroups: {
    DATA: {
      enabled: false,
      tabTitle: {},
      initialMode: 'TABLE',
      enableDownload: false,
      facets: { enabled: false, initiallyEnabled: false, list: [] },
      sorting: [],
      views: {
        TABLE: { enabled: true, attributes: [] },
        QUICKLOOK: { enabled: false, attributes: [] },
        MAP: { enabled: false, attributes: [], backgroundLayer: { url: null, type: 'AsynchroneWMS' } },
      },
    },
    DATASET: {
      enabled: false,
      tabTitle: {},
      initialMode: 'TABLE',
      sorting: [],
      views: {
        TABLE: { enabled: true, attributes: [] },
      },
    },
    DOCUMENT: {
      enabled: true,
      tabTitle: {},
      initialMode: 'TABLE',
      enableDownload: true,
      facets: {
        enabled: true,
        initiallyEnabled: true,
        list: [{ attributes: [{ name: 'my.attr.1' }], label: { en: 'My attribute 1', fr: 'Mon attribute 1' } }],
      },
      sorting: [{ attributes: [{ name: 'properties.auteur' }] }],
      views: {
        TABLE: {
          enabled: true,
          attributes: [
            { attributes: [{ name: 'my.attr.1' }], label: { en: 'My attribute 1', fr: 'Mon attribute 1' } },
            { attributes: [{ name: 'my.attr.2' }], label: { en: 'My attribute 2', fr: 'Mon attribute 2' } },
          ],
        },
      },
    },
  },
}
