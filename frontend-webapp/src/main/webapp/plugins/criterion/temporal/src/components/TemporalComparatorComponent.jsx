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
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
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
    onChange: PropTypes.func.isRequired,
    /**
     * Optionally init with a specific value
     */
    value: PropTypes.oneOf(values(EnumTemporalComparator)),
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
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
    const { moduleTheme: { comparatorButtonStyle, comparatorMenuStyle, comparatorMenuItemStyle } } = this.context

    return (
      <div>
        <RaisedButton
          label={value}
          onTouchTap={this.handleOpenMenu}
          style={comparatorButtonStyle}
        />
        <IconMenu
          iconButtonElement={<IconButton style={comparatorMenuStyle}><MoreVertIcon /></IconButton>}
          open={openMenu}
          onChange={this.handleChange}
          onRequestChange={this.handleOnRequestChange}
          value={value}
        >
          {map(EnumTemporalComparator, comparator => (
            <MenuItem
              style={comparatorMenuItemStyle}
              key={comparator}
              primaryText={comparator}
              value={comparator}
            />
          ))}
        </IconMenu>
      </div>
    )
  }
}

export default TemporalComparatorComponent
