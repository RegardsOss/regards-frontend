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
import Checkbox from 'material-ui/Checkbox'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CriteriaEditableRow } from '../../../../../shapes/form/CriteriaEditableRow'
import { CriteriaRowsHelper } from './CriteriaRowsHelper'

/**
 * Show label cell component: allows editing showTitle groups property
 * @author Raphaël Mechali
 */
class ShowLabelCellComponent extends React.Component {
  static propTypes = {
    entity: CriteriaEditableRow.isRequired,
    onUpdateGroupShowTitle: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: toggles show title value
   */
  onToggleShowTitle = () => {
    const { entity: { groupIndex, showTitle }, onUpdateGroupShowTitle } = this.props
    onUpdateGroupShowTitle(groupIndex, !showTitle)
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage } } = this.context
    if (CriteriaRowsHelper.isCriterion(entity)) {
      return null
    }
    return (
      <Checkbox
        label={entity.showTitle
          ? formatMessage({ id: 'search.results.form.configuration.search.pane.show.label.column.cell.shown' })
          : formatMessage({ id: 'search.results.form.configuration.search.pane.show.label.column.cell.hidden' })}
        checked={entity.showTitle}
        onCheck={this.onToggleShowTitle}
      />)
  }
}
export default ShowLabelCellComponent
