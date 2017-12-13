/**
* LICENSE_PLACEHOLDER
**/
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import DrowDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'

/**
 * Drop down button (used where drop down menu is not adequate). You can add some other properties to this component,
 * it will pass them through to the button instance
 * WORKAROUND - remove when MUI handles submenus correctly!
 */
class DropDownButton extends React.Component {
  static propTypes = {
    ButtonConstructor: PropTypes.func,
    getLabel: PropTypes.func.isRequired, // Generates label: (current value (optional)) => string
    children: PropTypes.arrayOf(PropTypes.node), // Expected children: menu items
    onChange: PropTypes.func, // on change listener
    disabled: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any,
    // set up explicitely to true to use the submenus problem fix (not compatible with a value menu)
    hasSubMenus: PropTypes.bool,
    // other button properties
  }

  static defaultProps = {
    ButtonConstructor: FlatButton,
    disabled: false,
    hasSubMenus: false,
  }

  componentWillMount = () => {
    this.setMenuVisibleOn()
    this.setCurrentValue(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
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
  setCurrentValue = value => this.setState({ value })

  /**
   * Applies the sub menus fix to a menu item (and sub items). Ignores non menu items
   * @param menuItem menu item
   * @return element unchanged or menu item cloned
   */
  buildAutoClosingMenuItem = (element) => {
    if (element.type.muiName !== 'MenuItem') { // element to ignore?
      return element
    }
    const { menuItems: subItems, onTouchTap: initialCallback, ...otherItemProps } = element.props
    let menuItems = subItems
    let onTouchTap = initialCallback
    if (subItems && subItems.length) {
      // A sub menus container: we need to set up the hack in all sub items (and successively)
      menuItems = subItems.map(item => this.buildAutoClosingMenuItem(item))
    } else {
      // a last level menu item: we need to fix the callback to close this menu
      onTouchTap = () => {
        this.onCloseMenu() // close the menu
        if (initialCallback) { // run the callback if any
          initialCallback()
        }
      }
    }
    // clone the menu item with computed properties
    return React.cloneElement(element, { ...otherItemProps, menuItems, onTouchTap })
  }

  /**
   * Prepares drop down box children: makes sure that the sub menus fix will be set up when required
   * @param hasSubMenus should apply sub menus fix?
   * @param children component children
   * @return children as they should be used
   */
  prepareChildren = (hasSubMenus, children) => {
    if (!children || !children.length) {
      return null
    }
    if (!hasSubMenus) {
      // can use directly children
      return children
    }
    // wrap required to ensure menu closes (remove null elements)
    return children.filter(menuItem => !!menuItem).map(menuItem => this.buildAutoClosingMenuItem(menuItem))
  }

  render() {
    const {
      ButtonConstructor, getLabel, children, disabled, hasSubMenus, ...otherButtonProperties
    } = this.props
    const { value, menuVisibleOn } = this.state
    const iconAnchor = { horizontal: 'left', vertical: 'bottom' }
    const iconTarget = { horizontal: 'left', vertical: 'top' }
    return (
      <div>
        <ButtonConstructor
          label={getLabel(value)}
          onTouchTap={this.onOpenMenu}
          icon={<DrowDownIcon />}
          disabled={disabled}
          {...otherButtonProperties}
        />
        <Popover
          open={!!menuVisibleOn}
          anchorEl={this.state.menuVisibleOn}
          anchorOrigin={iconAnchor}
          targetOrigin={iconTarget}
          onRequestClose={this.onCloseMenu}
        >
          <Menu onChange={hasSubMenus ? undefined : this.onMenuItemSelected}>
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
