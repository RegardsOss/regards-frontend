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
import values from 'lodash/values'
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
    pageMeta: CommonShapes.PageMetadata,
    availableEndpoints: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    tableSelection: PropTypes.arrayOf(IngestShapes.RequestEntity),
    onSelectVersionOption: PropTypes.func.isRequired,
    onRetrySelection: PropTypes.func.isRequired,
    onDeleteSelection: PropTypes.func.isRequired,
    onAbort: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**  Defines options to build menu automatically (cannot subclass elements in Menu, or MUI will handle it wrong */
  static OPTIONS_DEF = [{
    // 1 - Select modified product version option
    key: 'select.version.option',
    dependencies: [dependencies.selectVersionModeDependency],
    isDisabled: (selectionMode, selection, pageMeta) => !RequestOperationsMenuComponent.isEnabled(selectionMode, selection, pageMeta, RequestOperationsMenuComponent.isSelectVersionAllowed),
    onClickCallback: 'onSelectVersionOption',
    IconConstructor: SelectVersionOptionIcon,
    intlKey: 'oais.requests.list.filters.buttons.version.option',
  }, { // 2 - Retry option
    key: 'retry',
    dependencies: [dependencies.retryRequestDependency],
    isDisabled: (selectionMode, selection, pageMeta) => !RequestOperationsMenuComponent.isEnabled(selectionMode, selection, pageMeta, RequestOperationsMenuComponent.isRetryAllowed),
    onClickCallback: 'onRetry',
    IconConstructor: RetryIcon,
    intlKey: 'oais.requests.list.filters.buttons.retry',
  }, { // 3 - Delete option
    key: 'delete',
    dependencies: [dependencies.deleteRequestDependency],
    isDisabled: (selectionMode, selection, pageMeta) => !RequestOperationsMenuComponent.isEnabled(selectionMode, selection, pageMeta, RequestOperationsMenuComponent.isDeleteAllowed),
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
   * Is selection version mode allowed for request as parameter?
   * @param {*} request matching IngestShapes.Request
   * @return {boolean} true when select version mode is allowed
   */
  static isSelectVersionAllowed(request) {
    return request.content.state === IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE
  }

  /**
   * Is retry allowed for request as parameter?
   * @param {*} request matching IngestShapes.Request
   * @return {boolean} true retry is allowed
   */
  static isRetryAllowed(request) {
    return [IngestDomain.AIP_REQUEST_STATUS_ENUM.ERROR, IngestDomain.AIP_REQUEST_STATUS_ENUM.ABORT].includes(request.content.state)
  }

  /**
   * Is delete allowed for request as parameter?
   * @param {*} request matching IngestShapes.Request
   * @return {boolean} true retry is allowed
   */
  static isDeleteAllowed(request) {
    return request.content.state !== IngestDomain.AIP_REQUEST_STATUS_ENUM.RUNNING
  }

  /**
   * Is operation enabled
   * @param {string} selectionMode selection mode, from TableSelectionModes
   * @param {[*]} selection as an array of IngestShapes.Request
   * @param {Function} allowPredicate like (request) => (boolean). When true, operation is allowed
   * @return {boolean} true when operation should be enabled for selection:
   * (A) In inclusive mode, a valid request must be found
   * 'B) In exclusive mode, selection must be non empty (infinite selection, finite case not tested)
   */
  static isEnabled(selectionMode, selection, pageMeta, allowPredicate) {
    if (selectionMode === TableSelectionModes.includeSelected) { // A
      return selection.length && selection.some((request) => allowPredicate(request))
    }
    // B
    return selection.length < pageMeta.totalElements
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
