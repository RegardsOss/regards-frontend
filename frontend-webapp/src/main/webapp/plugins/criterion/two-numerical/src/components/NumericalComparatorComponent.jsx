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
