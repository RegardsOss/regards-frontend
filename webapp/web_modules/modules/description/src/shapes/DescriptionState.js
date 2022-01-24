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
import { DATA_TYPES } from '@regardsoss/domain/common'
import { CatalogShapes, UIShapes } from '@regardsoss/shape'

/**
 * Holds shapes for tree browsing in description module
 * @author Raphaël Mechali
 */

/** A tree path, expressed from parent to deeper child, wher index are ranging in  [0; N-1] */
export const TreePath = PropTypes.arrayOf(PropTypes.number)

/** Attribute with value and render, ready for displaying */
export const RuntimeAttribute = PropTypes.shape({
  key: PropTypes.string.isRequired,
  render: PropTypes.shape({
    Constructor: PropTypes.func.isRequired, // Render for the attribute (React constructor)
    props: PropTypes.shape({ // Render properties (including value plus whatever properties the constructor accepts...)
      // eslint-disable-next-line react/forbid-prop-types
      value: PropTypes.any,
      // ...other properties
    }),
  }),
})

/** A displayable group row (label and 1 / many attribute values) */
export const DisplayableGroupRow = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: UIShapes.IntlMessage,
  displayedAttributes: PropTypes.arrayOf(RuntimeAttribute).isRequired,
})

/** An attribute group with title and runtime resolved attributes */
export const AttributeGroup = PropTypes.shape({
  key: PropTypes.string.isRequired,
  showTitle: PropTypes.bool.isRequired,
  title: UIShapes.IntlMessage.isRequired,
  elements: PropTypes.arrayOf(DisplayableGroupRow).isRequired,
})

/** An entity description file (may come either from file map or linked description attributes) */
export const FileData = PropTypes.shape({
  label: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
  uri: PropTypes.string.isRequired,
  mimeType: PropTypes.string,
  // keeps data type and reference info to handle quota related errors
  type: PropTypes.oneOf(DATA_TYPES).isRequired,
  reference: PropTypes.bool.isRequired,
})

/** An entity as resolved for displaying. It holds both original entity and compiled model */
export const DescriptionEntity = PropTypes.shape({
  entityWithTreeEntry: UIShapes.EntityWithTreeEntry.isRequired,
  // Is entity loading?
  loading: PropTypes.bool.isRequired,
  // Did model attributes retrieval failed?
  modelRetrievalFailed: PropTypes.bool.isRequired,
  // Is entity invalid for description? (may happen when description configuration changes or user enters URL directly)
  invalid: PropTypes.bool.isRequired,
  // Resolved model for displaying
  displayModel: PropTypes.shape({
    thumbnail: FileData,
    attributesGroups: PropTypes.arrayOf(AttributeGroup).isRequired,
    descriptionFiles: PropTypes.arrayOf(FileData).isRequired,
    quicklookFiles: PropTypes.arrayOf(UIShapes.QuicklookDefinition).isRequired,
    otherFiles: PropTypes.arrayOf(FileData).isRequired,
    wordTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    couplingTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    linkedEntities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
    linkedDocuments: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
    otherVersions: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
  }).isRequired,
})

/** Complete description state */
export const DescriptionState = PropTypes.shape({
  descriptionPath: PropTypes.arrayOf(DescriptionEntity),
  browsingTreeVisible: PropTypes.bool.isRequired,
})
