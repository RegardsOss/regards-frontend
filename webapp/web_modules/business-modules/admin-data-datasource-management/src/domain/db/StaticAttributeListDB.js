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
import { DamDomain } from '@regardsoss/domain'

export default { // XXX seem like mock code. Leo Mieulet?
  providerId: {
    content: {
      mode: '',
      model: {
        type: '',
        description: '',
        name: '',
      },
      attribute: {
        name: 'providerId',
        label: 'Provider identifier',
        type: DamDomain.MODEL_ATTR_TYPES.STRING,
        optional: false,
        fragment: {
          id: -1,
          name: '',
        },
      },
    },
  },
  label: {
    content: {
      mode: '',
      model: {
        type: '',
        description: '',
        name: '',
      },
      attribute: {
        name: 'label',
        label: 'label',
        type: DamDomain.MODEL_ATTR_TYPES.STRING,
        optional: false,
        fragment: {
          id: -1,
          name: '',
        },
      },
    },
  },
  lastUpdate: {
    content: {
      mode: '',
      model: {
        type: '',
        description: '',
        name: '',
      },
      attribute: {
        name: 'lastUpdate',
        label: 'lastUpdate',
        type: DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601,
        optional: true,
        fragment: {
          id: -1,
          name: '',
        },
      },
    },
  },
  thumbnail: {
    content: {
      mode: '',
      model: {
        type: '',
        description: '',
        name: '',
      },
      attribute: {
        name: 'thumbnail',
        label: 'thumbnail',
        type: DamDomain.MODEL_ATTR_TYPES.STRING,
        optional: true,
        fragment: {
          id: -1,
          name: '',
        },
      },
    },
  },
  rawdata: {
    content: {
      mode: '',
      model: {
        type: '',
        description: '',
        name: '',
      },
      attribute: {
        name: 'rawdata',
        label: 'Raw data',
        type: DamDomain.MODEL_ATTR_TYPES.STRING,
        optional: true,
        fragment: {
          id: -1,
          name: '',
        },
      },
    },
  },
  geometry: {
    content: {
      mode: '',
      model: {
        type: '',
        description: '',
        name: '',
      },
      attribute: {
        name: 'geometry',
        label: 'geometry',
        type: DamDomain.MODEL_ATTR_TYPES.STRING,
        optional: true,
        fragment: {
          id: -1,
          name: '',
        },
      },
    },
  },
}
