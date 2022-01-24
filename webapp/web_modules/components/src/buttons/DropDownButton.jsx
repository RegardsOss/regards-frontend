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
import isArray from 'lodash/isArray'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import DrowDownIcon from 'mdi-material-ui/MenuDown'

/** No value label stub function (drop down button is not necessarily used with values) */
const noLabelStubFunction = () => {}

/**
 * Drop down button (used where drop down menu is not adequate). You can add some other properties to this component,
 * it will pass them through to the button instance
 * WORKAROUND - remove when MUI handles sub menus correctly!
 */
class DropDownButton extends React.Component {
  static propTypes = {
    ButtonConstructor: PropTypes.func,
    getLabel: PropTypes.func, // Generates label: (current value (optional)) => string
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]), // Expected children: menu items
    onChange: PropTypes.func, // on change listener
    disabled: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any,
    // set up explicitly to true to use the sub menus problem fix (not compatible with a value menu)
    hasSubMenus: PropTypes.bool,
    // properties to be reported to menu (optional)
    // eslint-disable-next-line react/forbid-prop-types
    menuProps: PropTypes.object,
    // other button properties
  }

  static defaultProps = {
    ButtonConstructor: FlatButton,
    disabled: false,
    hasSubMenus: false,
    menuProps: {},
    getLabel: noLabelStubFunction,
  }

  static ICON_ANCHOR = { horizontal: 'left', vertical: 'bottom' }

  static ICON_TARGET = { horizontal: 'left', vertical: 'top' }

  UNSAFE_componentWillMount = () => {
    this.setMenuVisibleOn()
    this.setCurrentValue(this.props.value)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      // externally controlled value change
      this.setCurrentValue(nextProps.value)
    }
  }

  onOpenMenu = (event) => {
    event.preventDefault()
    this.setMenuVisibleOn(event.currentTarget)
  }

  onCloseMenu = () => this.setMenuVisibleOn()

  onMenuItemSelected = (event, value) => {
    // hide menu
    this.setMenuVisibleOn()
    // keep selected value
    this.setCurrentValue(value)
    // relay event
    const { onChange } = this.props
    if (onChange) {
      onChange(value)
    }
  }

  setMenuVisibleOn = (menuVisibleOn = null) => {
    if (!this.state || this.state.menuVisibleOn !== menuVisibleOn) {
      this.setState({ menuVisibleOn })
    }
  }

  /**
   * Sets the current menu item value
   */
  setCurrentValue = (value) => this.setState({ value })

  /**
   * Applies the sub menus fix to a menu item (and sub items). Ignores non menu items
   * @param menuItem menu item
   * @return element unchanged or menu item cloned
   */
  buildAutoClosingMenuItem = (element) => {
    if (element.type.muiName !== 'MenuItem') { // element to ignore?
      return element
    }
    const { menuItems: subItems, onClick: initialCallback, ...otherItemProps } = element.props
    let menuItems = subItems
    let onClick = initialCallback
    if (subItems && subItems.length) {
      // A sub menus container: we need to set up the hack in all sub items (and successively)
      menuItems = subItems.map((item) => this.buildAutoClosingMenuItem(item))
    } else {
      // a last level menu item: we need to fix the callback to close this menu
      onClick = () => {
        this.onCloseMenu() // close the menu
        if (initialCallback) { // run the callback if any
          initialCallback()
        }
      }
    }
    // clone the menu item with computed properties
    return React.cloneElement(element, { ...otherItemProps, menuItems, onClick })
  }

  /**
   * Prepares drop down box children: makes sure that the sub menus fix will be set up when required
   * @param hasSubMenus should apply sub menus fix?
   * @param children component children
   * @return children as they should be used
   */
  prepareChildren = (hasSubMenus, children) => {
    if (!children) {
      return null
    }
    if (!isArray(children)) {
      // single non null element case
      return children
    }
    if (!children.length) {
      return null
    }
    if (!hasSubMenus) {
      // can use directly children
      return children
    }
    // wrap required to ensure menu closes (remove null elements)
    return children.filter((menuItem) => !!menuItem).map((menuItem) => this.buildAutoClosingMenuItem(menuItem))
  }

  render() {
    const {
      ButtonConstructor, getLabel, children, disabled, hasSubMenus, menuProps, ...otherButtonProperties
    } = this.props
    const { value, menuVisibleOn } = this.state
    return (
      <div>
        <ButtonConstructor
          label={getLabel(value)}
          onClick={this.onOpenMenu}
          icon={<DrowDownIcon />}
          disabled={disabled}
          {...otherButtonProperties}
        />
        <Popover
          open={!!menuVisibleOn}
          anchorEl={this.state.menuVisibleOn}
          anchorOrigin={DropDownButton.ICON_ANCHOR}
          targetOrigin={DropDownButton.ICON_TARGET}
          onRequestClose={this.onCloseMenu}
        >
          <Menu onChange={hasSubMenus ? undefined : this.onMenuItemSelected} {...menuProps}>
            { // Children, null, or wrapped children when workarounding the sub menus problem
              this.prepareChildren(hasSubMenus, children)
            }
          </Menu>
        </Popover>
      </div>
    )
  }
}
export default DropDownButton
