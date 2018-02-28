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
import { Measure } from '@regardsoss/adapters'
import { themeContextType } from '@regardsoss/theme'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../domain/NavigationItemTypes'
import { NavigationItem } from '../../../../shapes/Navigation'
import MainBarModuleLink from './MainBarModuleLink'
import MainBarSectionButton from './MainBarSectionButton'

/**
 * Item to display a navigation item (with or without subsections) in main app bar
 * @author Raphaël Mechali
 */
class MainBarNavigationItem extends React.Component {
  static propTypes = {
    item: NavigationItem.isRequired,
    displayed: PropTypes.bool.isRequired,
    locale: PropTypes.string,
    buildModuleURL: PropTypes.func.isRequired,
    onItemResized: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Called when component is resized, to notify parent layout
   */
  onComponentResized = ({ measureDiv: { width } }) => {
    const { item, displayed, onItemResized } = this.props
    // handle events only when this item is displayed (to avoid setting width at 0 as item is hidden)
    if (displayed) {
      onItemResized(item.key, Math.ceil(width))
    }
  }

  render() {
    const {
      item, displayed, buildModuleURL, locale,
    } = this.props
    const { moduleTheme: { user: { navigationItem } } } = this.context
    return (
      // handle locally the resizing management
      <Measure bounds onMeasure={this.onComponentResized} >
        {({ bind }) => (
          <div
            style={displayed ? navigationItem.displayStyle : navigationItem.hiddenStyle}
            {...bind('measureDiv')}
          >
            {
              // delegate link buttons rendering
              item.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE ? (
                <MainBarModuleLink
                  item={item}
                  locale={locale}
                  buildModuleURL={buildModuleURL}

                />) : (
                  <MainBarSectionButton
                    item={item}
                    locale={locale}
                    buildModuleURL={buildModuleURL}
                  />)
            }
          </div>)
        }
      </Measure>)
  }
}
export default MainBarNavigationItem
