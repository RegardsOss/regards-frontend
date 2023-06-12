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
import root from 'window-or-global'
import { MIME_TYPES } from '@regardsoss/mime-types'

/**
 * Exposes Sesame SNR parsing methods
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */

/**
 * Converts right ascension to longitude
 * @param {number} rightAscension right ascension in [0; 360]
 * @return {number} longitude
 */
function convertRightAscsencionToLongitude(rightAscension) {
  // Ensure longitude is in [-180; 180[
  if (rightAscension < 180) { // [0 ; 180[
    return rightAscension
  }
  // [180; 360]
  return 360 - rightAscension
}

/** Right ascension XML tag name */
const RIGHT_ASCENSION_XML_TAG = 'jradeg'

/** Declination XML tag name */
const DECLINATION_XML_TAG = 'jdedeg'

/**
 * Extract coordinates from server result
 * @param {string} serverResult server result as text
 * @return {{latitude: number, longitude: number}} parsed and converted coordinates or null if parsing failed
 */
function extractCoordinates(serverResult) {
  // Parse XML
  const xmlDocument = new root.DOMParser().parseFromString(serverResult, MIME_TYPES.XML_MIME_TYPE)
  // Retrieve right elevation and declination (note that array is index protected by the [] method here)
  const rightAscensionXMLNode = xmlDocument.getElementsByTagName(RIGHT_ASCENSION_XML_TAG)[0]
  const declinationXMLNode = xmlDocument.getElementsByTagName(DECLINATION_XML_TAG)[0]
  // When found, parse right ascension and declination then convert to latitude and longitude
  if (rightAscensionXMLNode && declinationXMLNode) {
    const rightAscension = root.parseFloat(rightAscensionXMLNode.textContent)
    const declination = root.parseFloat(declinationXMLNode.textContent)
    return {
      longitude: convertRightAscsencionToLongitude(rightAscension),
      latitude: declination,
    }
  }
  return null
}

export default {
  extractCoordinates,
  convertRightAscsencionToLongitude,
}
