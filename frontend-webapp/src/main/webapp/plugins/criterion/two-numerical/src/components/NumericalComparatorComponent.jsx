/**
 * LICENSE_PLACEHOLDER
 **/
import { map, values } from 'lodash'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
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
    fixedComparator : React.PropTypes.bool,
  }

  static defaultProps = {
    fixedComparator: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      openMenu: false,
      value: props.value || EnumNumericalComparator.EQ,
    }
  }

  handleChange = (event, value) => {
    this.setState({
      value,
    })
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

  renderFixedComparator = () => {
    return (
      <div>
        {this.state.value}
      </div>
    )
  }

  render() {
    if (this.props.fixedComparator){
      return this.renderFixedComparator()
    }
    return (
      <div>
        <RaisedButton
          label={this.state.value}
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
          {map(EnumNumericalComparator, (value, key) => (
            <MenuItem
              style={{
                display: 'flex',
                justifyContent: 'center',
              }} key={key} primaryText={value} value={value}
            />
          ))}
        </IconMenu>
      </div>
    )
  }
}

export default NumericalComparatorComponent
