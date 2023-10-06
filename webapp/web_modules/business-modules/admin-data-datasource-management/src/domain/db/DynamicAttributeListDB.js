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
import { PARAMETER_ATTRIBUTE_KEY_ENUM } from './ParameterAttributeKeyEnum'

export default {
  [PARAMETER_ATTRIBUTE_KEY_ENUM.COLUMN_ID]: {
    content: {
      mode: '',
      model: {
        type: '',
        description: '',
        name: '',
      },
      attribute: {
        name: [PARAMETER_ATTRIBUTE_KEY_ENUM.COLUMN_ID],
        label: [PARAMETER_ATTRIBUTE_KEY_ENUM.COLUMN_ID],
        type: DamDomain.MODEL_ATTR_TYPES.STRING,
        optional: true,
        fragment: {
          id: -1,
          name: '',
        },
      },
    },
  },
  [PARAMETER_ATTRIBUTE_KEY_ENUM.UNIQUE_ID]: {
    content: {
      mode: '',
      model: {
        type: '',
        description: '',
        name: '',
      },
      attribute: {
        name: [PARAMETER_ATTRIBUTE_KEY_ENUM.UNIQUE_ID],
        label: [PARAMETER_ATTRIBUTE_KEY_ENUM.UNIQUE_ID],
        type: DamDomain.MODEL_ATTR_TYPES.BOOLEAN,
        optional: true,
        fragment: {
          id: -1,
          name: '',
        },
      },
    },
  },
}
