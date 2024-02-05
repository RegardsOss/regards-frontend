/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import every from 'lodash/every'
import find from 'lodash/find'
import FlatButton from 'material-ui/FlatButton'
import Delete from 'mdi-material-ui/Delete'
import { LTAShapes } from '@regardsoss/shape'
import { withResourceDisplayControl, allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableHeaderOptionGroup, TableColumnsVisibilityOption,
} from '@regardsoss/components'
import DIALOG_TYPES from '../domain/dialogTypes'

const ResourceFlatButton = withResourceDisplayControl(FlatButton)

/**
  * @author Théo Lasserre
  */
class HeaderActionsBarComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    tableSelection: PropTypes.arrayOf(LTAShapes.Request),
    selectionMode: PropTypes.string.isRequired,
    areAllSelected: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,

    // table sorting, column visiblity & filters management
    onChangeColumnsVisibility: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Button is disabled if one of selected elements doesn't have required HATOAS link
   * @param {*} dialogType
   * @returns
   */
  isButtonDisabled = (dialogType) => {
    const { tableSelection, areAllSelected } = this.props
    let ret = !areAllSelected
    if (!isEmpty(tableSelection)) {
      ret = !every(tableSelection, (selection) => find(selection.links, (l) => l.rel === dialogType))
    }
    return ret
  }

  onDelete = () => {
    const { onDelete, tableSelection, selectionMode } = this.props
    onDelete(tableSelection, selectionMode)
  }

  render() {
    const {
      columns, onChangeColumnsVisibility,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <TableHeaderOptionGroup>
        <TableColumnsVisibilityOption
          columns={columns}
          onChangeColumnsVisibility={onChangeColumnsVisibility}
        />
        <ResourceFlatButton
          key="deleteSelection"
          displayLogic={allMatchHateoasDisplayLogic}
          title={formatMessage({ id: 'lta.actions.delete.title' })}
          label={formatMessage({ id: 'lta.actions.delete.label' })}
          icon={<Delete />}
          onClick={this.onDelete}
          disabled={this.isButtonDisabled(DIALOG_TYPES.DELETE_DIALOG)}
        />
      </TableHeaderOptionGroup>
    )
  }
}
export default HeaderActionsBarComponent
