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
import get from 'lodash/get'
import { i18nContextType } from '@regardsoss/i18n'
import { UIShapes } from '@regardsoss/shape'

/**
 * Resolves module title text
 * @author Raphaël Mechali
 */
class ModuleTitleText extends React.Component {
  /**
   * Selects module title
   * @param {*} title module title, as an object like [locale]:title where locale can be 'en', 'fr'...
   * @param {string} description  module description (used as fallback when title cannot be used)
   * @param {string} locale current local if any
   */
  static selectTitle(title, description, locale) {
    return get(title, locale, description || null)
  }

  static propTypes = {
    // module title, as an object like [locale]:title where locale can be 'en', 'fr'...
    title: UIShapes.OptionalIntlMessage,
    // module description (used as fallback when title cannot be used)
    description: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { title, description } = this.props
    const { intl: { locale } } = this.context
    return ModuleTitleText.selectTitle(title, description, locale)
  }
}
export default ModuleTitleText
