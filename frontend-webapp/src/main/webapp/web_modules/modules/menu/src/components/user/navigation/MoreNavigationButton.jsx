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
import FlatButton from 'material-ui/FlatButton/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton } from '@regardsoss/components'

/**
 * Drop button to show the navigation items that do not fit the main bar
 * @author Raphaël Mechali
 */
class MoreNavigationButton extends React.Component {
  static propTypes = {
    onResized: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    navigationModel: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })).isRequired,
    firstMenuElementIndex: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Component was resized, notify parent layout */
  onComponentResized = ({ width }) => {
    // like for items, do not propagates events when this element is not shown
    const { visible, onResized } = this.props
    if (visible) {
      onResized(width)
    }
  }

  /**
   * A menu item was selected
   */
  onMenuItemClicked = value => console.error('Item clicked', value) // TOD

  /**
   * @return this drop down label (not dynamic)
   */
  getLabel = () => this.context.intl.formatMessage({ id: 'navigation.more.option' })


  render() {
    const { visible } = this.props
    const { moduleTheme: { user: { navigationItem, moreOption } } } = this.context
    return (
      <div style={visible ? navigationItem.displayStyle : navigationItem.hiddenStyle}>
        <Measure onMeasure={this.onComponentResized} >
          <DropDownButton
            ButtonConstructor={FlatButton}
            labelStyle={navigationItem.defaultTextStyle}
            getLabel={this.getLabel}
            onChange={this.onMenuItemClicked}
            value={null}
            labelPosition={moreOption.labelPosition}
            hasSubMenus
          >
            {/* TODO map from properties */}
            <MenuItem key="1" primaryText="Very temporary" value="11111" />
            <MenuItem key="2" primaryText="Very temporary 2 " value="22222" />
          </DropDownButton>
        </Measure>
      </div >
    )
  }
}
export default MoreNavigationButton
