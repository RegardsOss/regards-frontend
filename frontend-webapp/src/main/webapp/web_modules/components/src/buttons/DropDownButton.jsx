/**
* LICENSE_PLACEHOLDER
**/
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import DrowDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'

/**
* Drop down button (used where drop down menu is not adequate). You can add some other properties to this component,
* it will ass them through to the button instance
*/
class DropDownButton extends React.Component {

  static propTypes = {
    ButtonConstructor: PropTypes.func.isRequired,
    getLabel: PropTypes.func.isRequired, // Generates label: (current value (optional)) => string
    children: PropTypes.arrayOf(PropTypes.node), // Expected children: menu items
    onChange: PropTypes.func, // on change listener
    disabled: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any,
  }

  static defaultProps = {
    ButtonConstructor: FlatButton,
    disabled: false,
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

  setCurrentValue = value => this.setState({ value })

  render() {
    const { ButtonConstructor, getLabel, children, disabled, ...otherButtonProperties } = this.props
    const { value, menuVisibleOn } = this.state
    return (
      <div>
        <ButtonConstructor
          label={getLabel(value)}
          onTouchTap={this.onOpenMenu}
          labelPosition="before"
          icon={<DrowDownIcon />}
          disabled={disabled}
          {...otherButtonProperties}
        />
        <Popover
          open={!!menuVisibleOn}
          anchorEl={this.state.menuVisibleOn}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.onCloseMenu}
        >
          <Menu onChange={this.onMenuItemSelected}>
            {children || null}
          </Menu>
        </Popover>
      </div>
    )
  }
}
export default DropDownButton
