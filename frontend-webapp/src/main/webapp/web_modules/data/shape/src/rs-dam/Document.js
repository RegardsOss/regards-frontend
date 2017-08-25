/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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


const DocumentContent = PropTypes.shape({
  id: PropTypes.number,
  ipId: PropTypes.string,
  creationDate: PropTypes.string,
  lastUpdate: PropTypes.string,
  label: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  model: ModelContent.isRequired,
  files: PropTypes.any,
  properties: PropTypes.any,
  quotations: PropTypes.any,
  groups: PropTypes.any,
  entityType: PropTypes.string,
})

const Document = PropTypes.shape({
  content: DocumentContent.isRequired,
})

const DocumentList = PropTypes.objectOf(Document)


export default {
  Document,
  DocumentContent,
  DocumentList
}