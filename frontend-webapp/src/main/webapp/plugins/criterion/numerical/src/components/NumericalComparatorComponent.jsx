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
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage } from 'react-intl'
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
          label={<FormattedMessage id={`comparator.${this.props.value}`}/>}
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
          {map(EnumNumericalComparator, (value, key) => {
            const label = <FormattedMessage id={`comparator.${value}`}/>
            return (
              <MenuItem
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }} key={key} primaryText={label} value={key}
              />
            )
          })}
        </IconMenu>
      </div>
    )
  }
}

export default NumericalComparatorComponent
