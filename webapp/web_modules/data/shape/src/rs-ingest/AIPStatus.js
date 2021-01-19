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
import { AIP_STATES } from '@regardsoss/domain/archival-storage'
import { ENTITY_TYPES } from '@regardsoss/domain/dam'

/** Shape of an AIP status as defined in JSON provided by the back */
export const AIPStatusContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  ipId: PropTypes.string.isRequired,
  sipId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(ENTITY_TYPES).isRequired,
  state: PropTypes.oneOf(AIP_STATES).isRequired,
  date: PropTypes.string.isRequired, // last event date
  comment: PropTypes.string, // last even comment
})

/** Normalizr shape for one AIP status */
export const AIPStatus = PropTypes.shape({
  content: AIPStatusContent,
})

export const AIPStatusList = PropTypes.objectOf(AIPStatus)
