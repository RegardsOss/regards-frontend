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

/**
 * Describes a SIP shape and related sub objects
 * @author Maxime Bouveron
 */

const IngestSIPContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  sipId: PropTypes.string.isRequired,
  ipId: PropTypes.string.isRequired,
  owner: PropTypes.string,
  version: PropTypes.number,
  state: PropTypes.string,
  checksum: PropTypes.string.isRequired,
  sip: PropTypes.shape({
    ipType: PropTypes.string,
    id: PropTypes.string.isRequired,
    geometry: PropTypes.any,
    properties: PropTypes.shape({
      contentInformations: PropTypes.arrayOf({
        dataObject: PropTypes.shape({
          regardsDataType: PropTypes.string,
          url: PropTypes.string,
          algorithm: PropTypes.string,
          checksum: PropTypes.string,
        }),
      }),
      pdi: PropTypes.shape({
        contextInformation: PropTypes.object,
        referenceInformation: PropTypes.object,
        provenanceInformation: PropTypes.object,
        fixityInformation: PropTypes.object,
        accessRightInformation: PropTypes.object,
      }),
      descriptiveInformation: PropTypes.object,
    }),
    type: PropTypes.string,
  }),
  ingestDate: PropTypes.string,
  processing: PropTypes.string,
  session: PropTypes.shape({
    id: PropTypes.string.isRequired,
    lastActivationDate: PropTypes.string,
    sipsCount: PropTypes.number,
    indexedSipsCount: PropTypes.number,
    storedSipsCount: PropTypes.number,
    generatedSipsCount: PropTypes.number,
    errorSipsCount: PropTypes.number,
  }),
})

const IngestSIP = PropTypes.shape({
  content: IngestSIPContent,
})
const IngestSIPList = PropTypes.objectOf(IngestSIP)
const IngestSIPArray = PropTypes.arrayOf(IngestSIP)

module.exports = {
  IngestSIP,
  IngestSIPContent,
  IngestSIPList,
  IngestSIPArray,
}
