/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { Breadcrumb, ModuleIcon } from '@regardsoss/components'

/**
 * Component to display navigation bar.
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {
  static propTypes = {
    // module page definition
    page: AccessShapes.ModulePage,
    defaultIconURL: PropTypes.string.isRequired,
    // navigation levels currently defined (necessarily one or more elements)
    navigationLevels: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.shape({
          en: PropTypes.string.isRequired,
          fr: PropTypes.string.isRequired,
        }).isRequired,
        isNavigationAllowed: PropTypes.bool.isRequired,
      })).isRequired,
    onLevelSelected: PropTypes.func.isRequired, // on level selected in breadcrumb: (level, index) => void
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * @param {*} levelTag level tag (or null) repects Tag shape
   * @param {number} index level
   * @return {string} level label
   **/
  getLevelLabel = (levelTag, index) => {
    const { intl: { locale } } = this.context
    return levelTag.label[locale]
  }

  render() {
    const {
      page, defaultIconURL, navigationLevels, onLevelSelected,
    } = this.props
    return (
      <Breadcrumb
        rootIcon={<ModuleIcon
          iconDisplayMode={get(page, 'iconType')}
          defaultIconURL={defaultIconURL}
          customIconURL={get(page, 'customIconURL')}
        />}
        elements={navigationLevels}
        labelGenerator={this.getLevelLabel}
        onAction={onLevelSelected}
      />
    )
  }
}

export default NavigationComponent
