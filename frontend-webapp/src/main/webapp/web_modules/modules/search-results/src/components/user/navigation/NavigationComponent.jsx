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
import get from 'lodash/get'
import { AccessShapes } from '@regardsoss/shape'
import { Breadcrumb, ModuleTitleText, ModuleIcon } from '@regardsoss/components'
import { Tag } from '../../../models/navigation/Tag'

const ROOT_PLACEHOLDER = {}

/**
 * Component to display navigation bar.
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {
  static propTypes = {
    locale: PropTypes.string,
    // module description
    description: PropTypes.string,
    // module page definition
    page: AccessShapes.ModulePage,
    defaultIconURL: PropTypes.string.isRequired,
    navigationLevels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)).isRequired,
    onLevelSelected: PropTypes.func.isRequired, // on level selected in breadcrumb: (level, index) => void
  }

  /**
   * @param {*} levelTag level tag (or null) repects Tag shape
   * @param {number} index level
   * @return {string} level label
   **/
  getLevelLabel = (levelTag, index) => {
    const { locale, description, page } = this.props
    if (index === 0) {
      // root level may have no label (use home then)
      return ModuleTitleText.selectTitle(page && page.title, description, locale)
    }
    return levelTag.label
  }

  render() {
    const {
      page, defaultIconURL, navigationLevels, onLevelSelected,
    } = this.props
    const breadcrumbElements = [
      ROOT_PLACEHOLDER, // add root (as a placeholder)
      ...navigationLevels,
    ]
    return (
      <Breadcrumb
        rootIcon={<ModuleIcon
          iconDisplayMode={get(page, 'iconType')}
          defaultIconURL={defaultIconURL}
          customIconURL={get(page, 'customIconURL')}
        />}
        elements={breadcrumbElements}
        labelGenerator={this.getLevelLabel}
        onAction={onLevelSelected}
      />
    )
  }
}

export default NavigationComponent
