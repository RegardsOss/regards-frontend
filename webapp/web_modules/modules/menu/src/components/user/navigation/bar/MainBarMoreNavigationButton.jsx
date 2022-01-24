/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { NavigationItem } from '../../../../shapes/Navigation'
import MainBarDropMenuButton from './MainBarDropMenuButton'

/**
 * Drop button to show the navigation items that do not fit the main bar
 * @author Raphaël Mechali
 */
class MoreNavigationButton extends React.Component {
  static propTypes = {
    displayed: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(NavigationItem),
    buildLinkURL: PropTypes.func.isRequired,
    onResized: PropTypes.func.isRequired,
  }

  static defaultProps = {
    items: [],
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Called when component is resized, to notify parent layout
   */
  onComponentResized = ({ measureDiv: { width } }) => {
    // like for items, do not propagates events when this element is not shown
    const { displayed, onResized } = this.props
    if (displayed) {
      onResized(width)
    }
  }

  render() {
    const {
      displayed, items, buildLinkURL,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { navigationItem } } } = this.context

    return (
      // handle measure system locally
      <Measure bounds onMeasure={this.onComponentResized}>
        {({ bind }) => (
          // Delegate to common drop menu render
          <div
            style={displayed ? navigationItem.displayStyle : navigationItem.hiddenStyle}
            {...bind('measureDiv')}
          >
            <MainBarDropMenuButton
              label={formatMessage({ id: 'navigation.more.option' })}
              items={items}
              buildLinkURL={buildLinkURL}
            />
          </div>)}
      </Measure>
    )
  }
}
export default MoreNavigationButton
