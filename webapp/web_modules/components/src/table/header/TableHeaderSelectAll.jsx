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
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import FlatButton from 'material-ui/FlatButton'
import CheckBoxOutLineIcon from 'mdi-material-ui/CheckboxBlankOutline'
import CheckBoxIcon from 'mdi-material-ui/CheckboxMarked'

import TableHeaderOptionsSeparator from './TableHeaderOptionsSeparator'

/**
* A button that allows user to select all entities from the table
* @author Léo Mieulet
*/
class TableHeaderSelectAll extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    allSelected: PropTypes.bool,
    onToggleSelectAll: PropTypes.func,
    selectionEnabled: PropTypes.bool,
    isFetching: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { allSelected, disabled, onToggleSelectAll, selectionEnabled, isFetching } = this.props
    const [icon, labelKey] = !allSelected
      // select all
      ? [<CheckBoxOutLineIcon key="0" />, 'table.select.all.label']
      // deselect all
      : [<CheckBoxIcon key="1" />, 'table.deselect.all.label']
    return selectionEnabled && !isFetching && (
      <>
        <FlatButton
          disabled={disabled}
          onClick={onToggleSelectAll}
          icon={icon}
          label={this.context.intl.formatMessage({ id: labelKey })}
        />
        <TableHeaderOptionsSeparator />
      </>
    )
  }
}
export default TableHeaderSelectAll
