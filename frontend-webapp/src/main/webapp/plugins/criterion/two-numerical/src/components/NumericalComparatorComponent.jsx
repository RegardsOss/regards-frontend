/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import values from 'lodash/values'
import isString from 'lodash/isString'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import RaisedButton from 'material-ui/RaisedButton'
import EnumNumericalComparator from '../model/EnumNumericalComparator'

/**
 * @author Xavier-Alexandre Brochard
 */
export class NumericalComparatorComponent extends React.Component {

  static propTypes = {
    /**
     * Signature:
     * function(value: EnumNumericalComparator) => void
     */
    onChange: React.PropTypes.func.isRequired,
    /**
     * Init with a specific comparator set.
     */
    value: React.PropTypes.oneOf(values(EnumNumericalComparator)),
    /**
     * Does the comparator is modifiable
     */
    fixedComparator: React.PropTypes.bool,
  }

  static defaultProps = {
    fixedComparator: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      openMenu: false,
    }
  }

  handleChange = (event, value) => {
    this.props.onChange(value)
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    })
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    })
  }

  renderFixedComparator = () => (
    <div>
      {this.props.value}
    </div>
    )

  render() {
    if (this.props.fixedComparator) {
      return this.renderFixedComparator()
    }
    return (
      <div>
        <RaisedButton
          label={EnumNumericalComparator.getLabel(this.props.value)}
          onTouchTap={this.handleOpenMenu}
          style={{
            height: 48,
            width: 48,
            minWidth: 'initial',
          }}
        />
        <IconMenu
          iconButtonElement={<IconButton style={{ display: 'none' }}><MoreVertIcon /></IconButton>}
          open={this.state.openMenu}
          onChange={this.handleChange}
          onRequestChange={this.handleOnRequestChange}
          value={this.state.value}
        >
          {map(EnumNumericalComparator, (value, key) => {
            if (!isString(value)) {
              return null
            }
            return (
              <MenuItem
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }} key={key} primaryText={EnumNumericalComparator.getLabel(value)} value={value}
              />
            )
          })}
        </IconMenu>
      </div>
    )
  }
}

export default NumericalComparatorComponent
