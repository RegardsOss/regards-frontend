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

/**
 * Holds shapes for OpenSearch descriptor
 * @author Raphaël Mechali
 */

/** An option value for a parameter of an URL element in OpenSearch description */
export const OpenSearchURLParameterOptionDescription = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
})

/** A parameter of an URL element in OpenSearch description */
export const OpenSearchURLParameterDescription = PropTypes.shape({
  option: PropTypes.arrayOf(OpenSearchURLParameterOptionDescription),
  name: PropTypes.string,
  value: PropTypes.string,
  minimum: PropTypes.string,
  maximum: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string,
  minExclusive: PropTypes.string,
  maxExclusive: PropTypes.string,
  minInclusive: PropTypes.string,
  maxInclusive: PropTypes.string,
  step: PropTypes.string,
})

/** A described URL element */
export const OpenSearchURLDescription = PropTypes.shape({
  parameter: PropTypes.arrayOf(OpenSearchURLParameterDescription).isRequired,
  template: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired, // Document MIME type
  indexOffset: PropTypes.string,
  pageOffset: PropTypes.string,
  rel: PropTypes.string,
  otherAttributes: PropTypes.objectOf(PropTypes.string).isRequired,
})

/** A described Query element */
export const OpenSearchQueryDescription = PropTypes.shape({
  role: PropTypes.string.isRequired,
  title: PropTypes.string,
  totalResults: PropTypes.string,
  searcjTerms: PropTypes.string,
  count: PropTypes.string,
  startIndex: PropTypes.string,
  startPage: PropTypes.string,
  language: PropTypes.string,
  inputEncoding: PropTypes.string,
  outputEncoding: PropTypes.string,
  otherAttributes: PropTypes.objectOf(PropTypes.string).isRequired,
})

/** Open search descriptior as returned by the backend */
export const OpenSearchDescriptor = PropTypes.shape({
  shortName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.string,
  contact: PropTypes.string,
  longName: PropTypes.string,
  url: PropTypes.arrayOf(OpenSearchURLDescription).isRequired,
  query: PropTypes.arrayOf(OpenSearchQueryDescription),
  developer: PropTypes.string,
  attribution: PropTypes.string,
  syndicationRight: PropTypes.string,
  adultContent: PropTypes.string,
  language: PropTypes.string,
  inputEncoding: PropTypes.string,
  outputEncoding: PropTypes.string,
  otherAttributes: PropTypes.objectOf(PropTypes.string).isRequired,
})
