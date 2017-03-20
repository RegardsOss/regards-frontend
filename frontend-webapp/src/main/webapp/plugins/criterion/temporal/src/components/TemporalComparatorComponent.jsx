/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage } from 'react-intl'
import EnumTemporalComparator from '../model/EnumTemporalComparator'

/**
 * Selectable temporal comparator (before, after, ...)
 *
 * @author Xavier-Alexandre Brochard
 */
export class TemporalComparatorComponent extends React.Component {

  static propTypes = {
    /**
     * Signature:
     * function(value: EnumTemporalComparator) => void
     */
    onChange: React.PropTypes.func.isRequired,
    /**
     * Optionally init with a specific value
     */
    value: React.PropTypes.oneOf(map(EnumTemporalComparator,value => value)),
  }

  constructor(props) {
    super(props)
    this.state = {
      openMenu: false,
      value: props.value || EnumTemporalComparator[0],
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

  format = value => <FormattedMessage id={`criterion.comparator.${value}`} />

  render() {
    return (
      <div>
        <RaisedButton
          label={this.format(this.state.value)}
          onTouchTap={this.handleOpenMenu}
        />
        <IconMenu
          iconButtonElement={<IconButton style={{ display: 'none' }}><MoreVertIcon /></IconButton>}
          open={this.state.openMenu}
          onChange={this.handleChange}
          onRequestChange={this.handleOnRequestChange}
          value={this.state.value}
        >
          {map(EnumTemporalComparator, value => (
            <MenuItem
              style={{
                display: 'flex',
                textTransform: 'uppercase',
                justifyContent: 'center',
              }} key={value} primaryText={this.format(value)} value={value}
            />
          ))}
        </IconMenu>
      </div>
    )
  }
}

export default TemporalComparatorComponent
