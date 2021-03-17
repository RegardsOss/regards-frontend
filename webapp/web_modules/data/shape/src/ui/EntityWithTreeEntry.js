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
import { UIDomain } from '@regardsoss/domain'
import { Entity } from '../rs-catalog'

/** description tree entry */
export const DescriptionTreeEntry = PropTypes.shape({
  // selected section
  section: PropTypes.oneOf(UIDomain.DESCRIPTION_BROWSING_SECTIONS).isRequired,
  // index of the selected child (null if parent is selected)
  child: PropTypes.number,
})

export const EntityWithTreeEntry = PropTypes.shape({
  entity: Entity.isRequired,
  selectedTreeEntry: DescriptionTreeEntry.isRequired,
})