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
import Feature from './Feature'
import { ModelContent } from './Model'

export const CollectionContent = PropTypes.shape({
  id: PropTypes.number,
  ipId: PropTypes.string.isRequired,
  creationDate: PropTypes.string,
  lastUpdate: PropTypes.string,
  entityType: PropTypes.string,
  feature: Feature,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  model: ModelContent.isRequired,
})

export const Collection = PropTypes.shape({
  content: CollectionContent.isRequired,
})

export const CollectionList = PropTypes.objectOf(Collection)
export const CollectionArray = PropTypes.arrayOf(Collection)
