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
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { FlatButton } from 'material-ui'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { EnumNumericalComparators } from '@regardsoss/domain/common'
import messages from './i18n'

/**
 * @author Xavier-Alexandre Brochard
 */
export class NumericalComparator extends React.Component {
  static propTypes = {
    /**
     * Signature:
     * function(value: EnumNumericalComparator) => void
     */
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOf(EnumNumericalComparators),
    comparators: PropTypes.arrayOf(PropTypes.oneOf(EnumNumericalComparators)),
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
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
    const { moduleTheme: { comparatorButtonStyle, comparatorMenuItemStyle } } = this.context
    const labelStyle = { fontSize: '2em' }
    const button = (
      <FlatButton
        label={<FormattedMessage id={`numerical.comparator.${this.props.value}`} />}
        onClick={this.props.comparators ? this.handleOpenMenu : () => {}}
        style={comparatorButtonStyle}
        labelStyle={labelStyle}
        disabled={!this.props.comparators}
      />
    )
    return this.props.comparators && this.props.comparators.length > 1 ? (
      <div>
        <IconMenu
          iconButtonElement={button}
          open={this.state.openMenu}
          onChange={this.handleChange}
          onRequestChange={this.handleOnRequestChange}
          value={this.props.value}
        >
          {this.props.comparators.map(comparator => (
            <MenuItem
              style={comparatorMenuItemStyle}
              key={comparator}
              primaryText={<FormattedMessage id={`numerical.comparator.${comparator}`} />}
              value={comparator}
            />
          ))}
        </IconMenu>
      </div>
    ) : (
      button
    )
  }
}

export default withI18n(messages)(NumericalComparator)
