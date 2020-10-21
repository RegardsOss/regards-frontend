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
import GroupIcon from 'mdi-material-ui/ChevronDown'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CriteriaEditableRow } from '../../../../../shapes/form/CriteriaEditableRow'

/**
 * Shows identifier cell for a group (as a static text)
 * @author Raphaël Mechali
 */
class IdentifierGroupCellComponent extends React.Component {
  static propTypes = {
    entity: CriteriaEditableRow.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { content: { searchPane: { groupIdCell } } } } } = this.context
    return (
      <div style={groupIdCell.root}>
        <GroupIcon color={groupIdCell.icon.color} />
        <div style={groupIdCell.text}>
          {formatMessage({
            id: 'search.results.form.configuration.search.pane.identifier.column.cell.label.group',
          }, {
            index: entity.groupIndex + 1,
          })}
        </div>
      </div>
    )
  }
}
export default IdentifierGroupCellComponent
