/**
 * LICENSE_PLACEHOLDER
 **/
import { map, values } from 'lodash'
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
    value: React.PropTypes.oneOf(values(EnumTemporalComparator)),
  }

  static defaultProps = {
    value: EnumTemporalComparator.LE,
  }

  state = {
    openMenu: false,
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
    const { value } = this.props
    const { openMenu } = this.state

    return (
      <div>
        <RaisedButton
          label={value}
          onTouchTap={this.handleOpenMenu}
        />
        <IconMenu
          iconButtonElement={<IconButton style={{ display: 'none' }}><MoreVertIcon /></IconButton>}
          open={openMenu}
          onChange={this.handleChange}
          onRequestChange={this.handleOnRequestChange}
          value={value}
        >
          {map(EnumTemporalComparator, comparator => (
            <MenuItem
              style={{
                display: 'flex',
                textTransform: 'uppercase',
                justifyContent: 'center',
              }} key={comparator} primaryText={comparator} value={comparator}
            />
          ))}
        </IconMenu>
      </div>
    )
  }
}

export default TemporalComparatorComponent
