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

/**
 * Component to display navigation bar.
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {
  /** Allowed element as root of navigation levels */
  static ROOT_PLACEHOLDER = {}

  static propTypes = {
    locale: PropTypes.string,
    // module description
    description: PropTypes.string,
    // module page definition
    page: AccessShapes.ModulePage,
    defaultIconURL: PropTypes.string.isRequired,
    navigationLevels: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.oneOf([NavigationComponent.ROOT_PLACEHOLDER]), // placeholder allowed at first position
      PropTypes.instanceOf(Tag), // tags after
    ])).isRequired,
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
      // Root element (we don't care here if it is a root placeholder or an initial context tag)
      // Select title in the same way than any other module, fallback on level tag if description / page undefined
      return ModuleTitleText.selectTitle(page && page.title, description || levelTag.label, locale)
    }
    // Tag: return label
    return levelTag.label
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
