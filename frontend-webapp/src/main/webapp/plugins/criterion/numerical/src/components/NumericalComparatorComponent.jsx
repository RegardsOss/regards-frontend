/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
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
    value: React.PropTypes.string,
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

  render() {
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
          value={this.props.value}
        >
          {map(EnumNumericalComparator, (value, key) => (
            <MenuItem
              style={{
                display: 'flex',
                justifyContent: 'center',
              }} key={key} primaryText={EnumNumericalComparator.getLabel(value)} value={key}
            />
          ))}
        </IconMenu>
      </div>
    )
  }
}

export default NumericalComparatorComponent
