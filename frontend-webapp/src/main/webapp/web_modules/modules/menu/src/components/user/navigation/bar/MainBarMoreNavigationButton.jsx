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
import Measure from 'react-measure'
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
    locale: PropTypes.string,
    buildModuleURL: PropTypes.func.isRequired,
    onResized: PropTypes.func.isRequired,
  }

  static defaultProps = {
    items: [],
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Component was resized, notify parent layout */
  onComponentResized = ({ width }) => {
    // like for items, do not propagates events when this element is not shown
    const { displayed, onResized } = this.props
    if (displayed) {
      onResized(width)
    }
  }

  render() {
    const {
      displayed, items, buildModuleURL, locale,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { navigationItem } } } = this.context


    return (
      // handle measure system locally
      <div style={displayed ? navigationItem.displayStyle : navigationItem.hiddenStyle}>
        <Measure onMeasure={this.onComponentResized} >
          {/* Delegate to common drop menu render  */}
          <MainBarDropMenuButton
            label={formatMessage({ id: 'navigation.more.option' })}
            items={items}
            locale={locale}
            buildModuleURL={buildModuleURL}
          />
        </Measure>
      </div >
    )
  }
}
export default MoreNavigationButton