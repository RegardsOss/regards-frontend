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
import { ModelContent } from './Model'
import Feature from './Feature'

export const EntityProperties = {
  id: PropTypes.number,
  ipId: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string,
  type: PropTypes.oneOf(['DATASET', 'COLLECTION', 'DATAOBJECT', 'DOCUMENT']).isRequired,
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  feature: Feature.isRequired,
  model: ModelContent.isRequired,
}
/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 */
export default PropTypes.shape({
  content: PropTypes.shape({
    ...EntityProperties,
  }).isRequired,
})
