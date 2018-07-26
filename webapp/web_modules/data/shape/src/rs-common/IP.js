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

const DataObjectShape = PropTypes.shape({
  regardsDataType: PropTypes.string,
  url: PropTypes.string,
  algorithm: PropTypes.string,
  checksum: PropTypes.string,
})

const PdiShape = PropTypes.shape({
  contextInformation: PropTypes.object,
  referenceInformation: PropTypes.object,
  provenanceInformation: PropTypes.object,
  fixityInformation: PropTypes.object,
  accessRightInformation: PropTypes.object,
})

const ContentInformation = PropTypes.shape({
  representationInformation: PropTypes.shape({
    syntax: PropTypes.shape({
      mimeType: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  dataObject: DataObjectShape,
})

const PropertiesShape = PropTypes.shape({
  contentInformations: PropTypes.arrayOf(ContentInformation),
  pdi: PdiShape,
  descriptiveInformation: PropTypes.object,
})

export default PropertiesShape
