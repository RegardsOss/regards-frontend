/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import merge from 'lodash/merge'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import defaultCustomConfiguration from './custom/defaultCustomConfiguration'

/**
 * @author Léo Mieulet
 * This class provides the logic to built a working Regards Theme
 */
export default class ThemeBuilder {
  static getPrimaryTheme(themeOverwrite) {
    return ThemeBuilder.getThemeWithCustomComponents(ThemeBuilder.getPrimaryOverwrite(themeOverwrite))
  }

  static getAlternativeTheme(themeOverwrite) {
    return ThemeBuilder.getThemeWithCustomComponents(ThemeBuilder.getAlternativeOverwrite(themeOverwrite))
  }

  static getPrimaryOverwrite(themeOverwrite) {
    return themeOverwrite.mainTheme
  }

  static getAlternativeOverwrite(themeOverwrite) {
    return merge({}, themeOverwrite.mainTheme, themeOverwrite.alternativeTheme)
  }

  /**
   * Return a theme complete and useable
   * @param {*Object} themeOverwrite object that overwrite mui properties
   */
  static getThemeWithCustomComponents(themeProperties) {
    // Compute the muiTheme based on our settings
    const muiTheme = getMuiTheme(themeProperties)
    // Generate the default custom configuration and merge it with the themeProperties from the server
    const customProperties = merge(defaultCustomConfiguration(muiTheme), themeProperties)
    // Finally merge both to create the useable theme
    return merge({}, muiTheme, customProperties)
  }
}
