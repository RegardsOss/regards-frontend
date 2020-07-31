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
import values from 'lodash/values'
import isEmpty from 'lodash/isEmpty'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import SelectVersionOptionIcon from 'mdi-material-ui/CogSync'
import RetryIcon from 'mdi-material-ui/Replay'
import DeleteIcon from 'mdi-material-ui/Delete'
import AbortIcon from 'mdi-material-ui/TableCancel'
import { IngestShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { TableSelectionModes, DropDownButton } from '@regardsoss/components'
import { IngestDomain } from '@regardsoss/domain'
import dependencies from '../../dependencies'

/**
 * Request operations menu: shows all possible operations. Disables itself when no operation is enabled
 * @author Raphaël Mechali
 */
export default class RequestOperationsMenuComponent extends React.Component {
  static propTypes = {
    pageMeta: CommonShapes.PageMetadata.isRequired,
    availableEndpoints: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    tableSelection: PropTypes.arrayOf(IngestShapes.RequestEntity),
    onSelectVersionOption: PropTypes.func.isRequired,
    onRetrySelection: PropTypes.func.isRequired,
    onAbort: PropTypes.func.isRequired,
    onDeleteSelection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**  Defines options to build menu automatically (cannot subclass elements in Menu, or MUI will handle it wrong */
  static OPTIONS_DEF = [{
    // 1 - Select modified product version option
    key: 'select.version.option',
    dependencies: [dependencies.selectVersionModeDependency],
    isDisabled: (selectionMode, selection, pageMeta) => {
      switch (selectionMode) {
        case TableSelectionModes.includeSelected:
          // any waiting version mode selected?
          return !selection.some((req) => req.content.state === IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE)
        case TableSelectionModes.excludeSelected:
        default:
          // check if there could be any waiting selected (ie: not all elements unselected)
          return selection.length >= pageMeta.totalElements
      }
    },
    onClickCallback: 'onSelectVersionOption',
    IconConstructor: SelectVersionOptionIcon,
    intlKey: 'oais.requests.list.filters.buttons.version.option',
  }, { // 2 - Retry option
    key: 'retry',
    dependencies: [dependencies.retryRequestDependency],
    isDisabled: RequestOperationsMenuComponent.isEmptySelection, // TODO: we can certainly do better here...
    onClickCallback: 'onRetry',
    IconConstructor: RetryIcon,
    intlKey: 'oais.requests.list.filters.buttons.retry',
  }, { // 3 - Delete option
    key: 'delete',
    dependencies: [dependencies.deleteRequestDependency],
    isDisabled: RequestOperationsMenuComponent.isEmptySelection, // TODO: we can certainly do better here...
    onClickCallback: 'onDelete',
    IconConstructor: DeleteIcon,
    intlKey: 'oais.requests.list.filters.buttons.delete',
  }, { // 4 - abort option (not related with selection)
    key: 'abort',
    dependencies: [dependencies.abortRequestsDependency],
    isDisabled: () => false, // never as it does not work on selection
    onClickCallback: 'onAbort',
    IconConstructor: AbortIcon,
    intlKey: 'oais.requests.list.filters.buttons.abort',
    addSeparator: true,
  }]

  /**
   * Is empty selection?
   * @param {string} selectionMode from TableSelectionModes
   * @param {[*]} selection matching array of IngestShapes.RequestEntity
   * @param {*} pageMeta results metadata matching CommonShapes.PageMetadata
   * @return {boolean} true if selection is empty, false otherwise
   */
  static isEmptySelection(selectionMode, selection, pageMeta) {
    // Empty when A) inclusive but no element included or B) exclusive but all elements excluded
    return (selectionMode === TableSelectionModes.includeSelected && isEmpty(selection)) // A)
    || (selectionMode === TableSelectionModes.excludeSelected && selection.length >= pageMeta.totalElements) // B)
  }

  /** On select version option callback */
  onSelectVersionOption = () => {
    const { selectionMode, tableSelection, onSelectVersionOption } = this.props
    onSelectVersionOption(selectionMode, tableSelection)
  }

  /** On retry option callback */
  onRetry = () => {
    const { selectionMode, tableSelection, onRetrySelection } = this.props
    onRetrySelection(selectionMode, tableSelection)
  }

  /** On delete option callback */
  onDelete = () => {
    const { selectionMode, tableSelection, onDeleteSelection } = this.props
    onDeleteSelection(selectionMode, tableSelection)
  }

  /** On abort option callback */
  onAbort = () => this.props.onAbort()

  /**
   * Builds options and related information (any option visible? any option enabled?)
   * @return {{someVisible: boolean, anyEnabled: boolean, components: [React.ReactNode]}}
  */
  buildOptionsAndInfo = () => {
    const {
      pageMeta, availableEndpoints, selectionMode, tableSelection,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return RequestOperationsMenuComponent.OPTIONS_DEF.reduce((acc, {
      key, addSeparator, dependencies: optDeps, isDisabled,
      onClickCallback, IconConstructor, intlKey,
    }) => {
      // 1 - a visible option
      if (allMatchHateoasDisplayLogic(optDeps, availableEndpoints)) {
        const disabled = isDisabled(selectionMode, tableSelection, pageMeta)
        return {
          anyVisible: true,
          anyEnabled: acc.anyEnabled || !disabled,
          components: [
            ...acc.components,
            // append separator when requested and any previous component
            addSeparator && acc.components.length ? <Divider key={`${key}.separator`} /> : null,
            <MenuItem
              key={key}
              onClick={this[onClickCallback]}
              primaryText={formatMessage({ id: intlKey })}
              leftIcon={<IconConstructor />}
              value={key} // ensures menu will close
              disabled={disabled}
            />],
        }
      }
      // 2 - an hidden option (previous results unchanged)
      return acc
    }, { anyVisible: false, anyEnabled: false, components: [] })
  }

  // TODO add here a dialog for abort!

  render() {
    const { intl: { formatMessage } } = this.context
    // 1 - build all components
    const { anyVisible, anyEnabled, components } = this.buildOptionsAndInfo()
    // 2 - When no component is visible (current user cannot use those options without changing account), hide button
    if (!anyVisible) {
      return null
    }
    return (
      <DropDownButton
        ButtonConstructor={FlatButton}
        label={formatMessage({ id: 'oais.requests.list.filters.buttons.operations.button' })}
        labelPosition="before"
        // Disable component when no option is enabled
        disabled={!anyEnabled}
      >
        { components }
      </DropDownButton>
    )
  }
}
