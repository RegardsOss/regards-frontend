/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import Clear from 'mdi-material-ui/Close'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import messages from './i18n'

/**
* Common button to clear a field
* @author Raphaël Mechali
*/
export class ClearFieldButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    displayed: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static DISPLAYED_STYLES = { transform: 'scale(1)' }

  static HIDDEN_STYLES = { transform: 'scale(0)' }

  render() {
    const { onClick, displayed } = this.props
    const { formatMessage } = this.context.intl
    return (
      <IconButton
        title={formatMessage({ id: 'clear.button.tooltip' })}
        style={displayed ? ClearFieldButton.DISPLAYED_STYLES : ClearFieldButton.HIDDEN_STYLES}
        onClick={onClick}
      >
        <Clear />
      </IconButton>
    )
  }
}

export default withI18n(messages)(ClearFieldButton)
