/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Checked from 'material-ui/svg-icons/toggle/check-box'
import Unchecked from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * A checkbox cell for infinite table.
 *
 * @author Raphaël Mechali
 */
export class CheckBoxCell extends React.Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    onToggleSelection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { selected, onToggleSelection } = this.props
    const { intl: { formatMessage }, moduleTheme: { checkButton: { styles, checkedIcon, uncheckedIcon } } } = this.context

    const Icon = selected ? Checked : Unchecked
    return (
      <IconButton
        style={styles}
        iconStyle={selected ? checkedIcon : uncheckedIcon}
        onClick={onToggleSelection}
        title={formatMessage({ id: selected ? 'table.unselect.row.tooltip' : 'table.select.row.tooltip' })}
      >
        <Icon />
      </IconButton>)
  }
}

export default CheckBoxCell
