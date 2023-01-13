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
import FlatButton from 'material-ui/FlatButton'
import ModeEdit from 'mdi-material-ui/Pencil'
import Delete from 'mdi-material-ui/Delete'
import { IngestShapes } from '@regardsoss/shape'
import { withResourceDisplayControl, allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { TableHeaderOptionGroup } from '@regardsoss/components'
import { IngestDomain } from '@regardsoss/domain'
import RequestOperationsMenuContainer from '../containers/requests/RequestOperationsMenuContainer'
import dependencies from '../dependencies'

const ResourceFlatButton = withResourceDisplayControl(FlatButton)

/**
  * @author Théo Lasserre
  */
class HeaderActionsBarComponent extends React.Component {
  static propTypes = {
    tableSelection: PropTypes.arrayOf(IngestShapes.RequestEntity),
    selectionMode: PropTypes.string.isRequired,
    areAllSelected: PropTypes.bool.isRequired,
    onModify: PropTypes.func,
    onSelectVersionOption: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    onRetry: PropTypes.func,
    onAbort: PropTypes.func,
    paneType: PropTypes.oneOf(IngestDomain.REQUEST_TYPES).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  isButtonDisabled = () => {
    const { tableSelection, areAllSelected } = this.props
    return !areAllSelected && isEmpty(tableSelection)
  }

  onModify = () => {
    const { onModify, tableSelection, selectionMode } = this.props
    onModify(tableSelection, selectionMode, true)
  }

  onDelete = () => {
    const { onDelete, tableSelection, selectionMode } = this.props
    onDelete(tableSelection, selectionMode, true)
  }

  onRetry = () => {
    const { onRetry, tableSelection, selectionMode } = this.props
    onRetry(tableSelection, selectionMode, true)
  }

  onSelectVersionOption = () => {
    const { onSelectVersionOption, tableSelection, selectionMode } = this.props
    onSelectVersionOption(tableSelection, selectionMode, true)
  }

  onAbort = () => {
    const { onAbort, tableSelection, selectionMode } = this.props
    onAbort(tableSelection, selectionMode, true)
  }

  render() {
    const {
      tableSelection, selectionMode, paneType,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { headerActionBarStyle } } = this.context
    return (
      <div style={headerActionBarStyle}>
        <TableHeaderOptionGroup>
          {
            paneType === IngestDomain.REQUEST_TYPES_ENUM.AIP ? [
              <ResourceFlatButton
                displayLogic={allMatchHateoasDisplayLogic}
                resourceDependencies={dependencies.updateDependency}
                key="modifySelection"
                title={formatMessage({ id: 'oais.packages.tooltip.selection.modify' })}
                label={formatMessage({ id: 'oais.packages.list.filters.buttons.modify' })}
                icon={<ModeEdit />}
                onClick={this.onModify}
                disabled={this.isButtonDisabled()}
              />,
              <ResourceFlatButton
                key="deleteSelection"
                displayLogic={allMatchHateoasDisplayLogic}
                resourceDependencies={dependencies.deleteDependency}
                title={formatMessage({ id: 'oais.packages.tooltip.selection.delete' })}
                label={formatMessage({ id: 'oais.packages.list.filters.buttons.delete' })}
                icon={<Delete />}
                onClick={this.onDelete}
                disabled={this.isButtonDisabled()}
              />]
              : <RequestOperationsMenuContainer
                  selectionMode={selectionMode}
                  tableSelection={tableSelection}
                  onSelectVersionOption={this.onSelectVersionOption}
                  onRetrySelection={this.onRetry}
                  onDeleteSelection={this.onDelete}
                  onAbort={this.onAbort}
              />
          }
        </TableHeaderOptionGroup>
      </div>
    )
  }
}
export default HeaderActionsBarComponent
