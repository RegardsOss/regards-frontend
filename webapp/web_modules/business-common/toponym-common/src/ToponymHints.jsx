/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { MenuItem } from 'material-ui/Menu'
import map from 'lodash/map'

/**
 * Tools to help toponym management
 * @author Théo Lasserre
 */

/**
   * Get toponym label depending on current locale
   * @param {*} selectedToponym
   * @param {*} currentLocale // either fr or en
   */
export const getToponymLabel = (selectedToponym, currentLocale) => {
  const labelFr = get(selectedToponym, 'content.labelFr')
  const labelEn = get(selectedToponym, 'content.labelEn')
  let ret
  if (currentLocale === UIDomain.LOCALES_ENUM.fr) {
    ret = labelFr || labelEn
  } else if (currentLocale === UIDomain.LOCALES_ENUM.en) {
    ret = labelEn || labelFr
  }
  return ret
}

export const getToponymCopyright = (toponym) => {
  const toponymCopyright = get(toponym, 'content.copyright')
  return toponymCopyright ? `© ${toponymCopyright}` : ''
}

export const getToponymHints = (matchingToponyms, currentLocale, menuItemStyle) => map(matchingToponyms, (matchingToponym) => {
  const toponymText = getToponymLabel(matchingToponym, currentLocale)
  const toponymCopyrightLabel = getToponymCopyright(matchingToponym)
  return {
    id: toponymText, // element id
    text: toponymText, // element text (similar)
    value: <MenuItem>
      {/* Item header: label and copyright */}
      <div style={menuItemStyle.headerRow}>
        <div style={menuItemStyle.headerText}>
          {toponymText}
        </div>
        <div style={menuItemStyle.copypightText}>{toponymCopyrightLabel}</div>
      </div>
      {/* Item body: description */}
      <div style={menuItemStyle.descriptionText}>
        {matchingToponym.content.description}
      </div>
    </MenuItem>,
  }
})
