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
import { HateOASLink } from '../rs-common'

/**
 * Describes a reference shape
 * @author Théo Lasserre
 */

const DisseminationInfo = PropTypes.shape({
  label: PropTypes.string.isRequired,
})

export const ReferenceContent = PropTypes.shape({
  id: PropTypes.number,
  lastUpdate: PropTypes.string,
  providerId: PropTypes.string,
  disseminationPending: PropTypes.bool,
  disseminationsInfo: PropTypes.arrayOf(DisseminationInfo),
  version: PropTypes.number,
})

export const Reference = PropTypes.shape({
  content: ReferenceContent,
  links: PropTypes.arrayOf(HateOASLink),
})
