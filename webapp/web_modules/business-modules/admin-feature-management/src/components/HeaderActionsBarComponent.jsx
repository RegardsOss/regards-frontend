/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Refresh from 'mdi-material-ui/Refresh'
import FlatButton from 'material-ui/FlatButton'
import Delete from 'mdi-material-ui/Delete'
import ModeSend from 'mdi-material-ui/Send'
import { withResourceDisplayControl, allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { TableHeaderOptionGroup } from '@regardsoss/components'
import { FemDomain } from '@regardsoss/domain'
import { DIALOG_TYPES } from '../domain/dialogTypes'

const ResourceFlatButton = withResourceDisplayControl(FlatButton)

/**
  * @author Théo Lasserre
  */
export class HeaderActionsBarComponent extends React.Component {
  static propTypes = {
    tableSelection: PropTypes.arrayOf(PropTypes.object),
    selectionMode: PropTypes.string.isRequired,
    areAllSelected: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onRetry: PropTypes.func,
    onNotify: PropTypes.func,
    paneType: PropTypes.oneOf(FemDomain.REQUEST_TYPES).isRequired,
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

  onRetry = () => {
    const { onRetry, tableSelection, selectionMode } = this.props
    onRetry(tableSelection, selectionMode)
  }

  onNotify = () => {
    const { onNotify, tableSelection, selectionMode } = this.props
    onNotify(tableSelection, selectionMode)
  }

  render() {
    const { tableSelection, selectionMode, paneType } = this.props
    const { intl: { formatMessage }, moduleTheme: { headerActionBarStyle } } = this.context
    return (
      <div style={headerActionBarStyle}>
        <TableHeaderOptionGroup>
          {
          paneType === FemDomain.REQUEST_TYPES_ENUM.REFERENCES
            ? <ResourceFlatButton
                displayLogic={allMatchHateoasDisplayLogic}
                key="notifySelection"
                title={formatMessage({ id: 'feature.references.tooltip.selection.notify' })}
                label={formatMessage({ id: 'feature.references.list.filters.buttons.notify' })}
                icon={<ModeSend />}
                onClick={() => this.onNotify(tableSelection, selectionMode)}
                disabled={this.isButtonDisabled(DIALOG_TYPES.NOTIFY_DIALOG)}
            />
            : <ResourceFlatButton
                displayLogic={allMatchHateoasDisplayLogic}
                key="retrySelection"
                title={formatMessage({ id: 'feature.requests.tooltip.selection.retry' })}
                label={formatMessage({ id: 'feature.requests.list.filters.buttons.retry' })}
                icon={<Refresh />}
                onClick={() => this.onRetry(tableSelection, selectionMode)}
                disabled={this.isButtonDisabled(DIALOG_TYPES.RETRY_DIALOG)}
            />
        }
          <ResourceFlatButton
            key="deleteSelection"
            displayLogic={allMatchHateoasDisplayLogic}
            title={formatMessage({ id: 'feature.references.tooltip.selection.delete' })}
            label={formatMessage({ id: 'feature.references.list.filters.buttons.delete' })}
            icon={<Delete />}
            onClick={() => this.onDelete(tableSelection, selectionMode)}
            disabled={this.isButtonDisabled(DIALOG_TYPES.DELETE_DIALOG)}
          />
        </TableHeaderOptionGroup>
      </div>
    )
  }
}
export default HeaderActionsBarComponent
