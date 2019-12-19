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
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import NoContentIcon from 'material-ui/svg-icons/image/crop-free'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  TableHeaderOptionsArea, TableHeaderOptionGroup, DateValueRender,
  TableSelectionModes, NoContentComponent,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import FlatButton from 'material-ui/FlatButton'
import Filter from 'mdi-material-ui/Filter'
import Dialog from 'material-ui/Dialog'
import { requestActions, requestSelectors } from '../../clients/RequestClient'
import messages from '../../i18n'
import styles from '../../styles'
import { requestTableSelectors, requestTableActions } from '../../clients/RequestTableClient'
import OAISCriterionShape from '../../shapes/OAISCriterionShape'
import RequestValidateDialog from './RequestValidateDialog'
import RequestRelaunchDialog from './RequestRelaunchDialog'
import RequestDeleteDialog from './RequestDeleteDialog'
import RequestDeleteOption from './RequestDeleteOption'
import RequestValidateOption from './RequestValidateOption'
import RequestRelaunchOption from './RequestRelaunchOption'
import RequestStatusRenderCell from './RequestStatusRenderCell'
import RequestErrorDetailsComponent from './RequestErrorDetailsComponent'

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
class OAISRequestManagerComponent extends React.Component {
  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    featureManagerFilters: OAISCriterionShape,
    // onRefresh: PropTypes.func.isRequired,
    // tableSelection: PropTypes.arrayOf(IngestShapes.AIPEntity),
    selectionMode: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="oais.requests.empty.results"
    Icon={NoContentIcon}
  />

  static DELETION_SELECTION_MODE = {
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE',
  }

  static REQUEST_TYPES = {
    TO_SCHEDULE: 'TO_SCHEDULE',
    CREATED: 'CREATED',
    BLOCKED: 'BLOCKED',
    RUNNING: 'RUNNING',
    ERROR: 'ERROR',
  }

  static REQUEST_STATES = {
    STORE_METADATA: 'STORE_METADATA',
    UPDATE: 'UPDATE',
    AIP_UPDATES_CREATOR: 'AIP_UPDATES_CREATOR',
    INGEST: 'INGEST',
    STORAGE_DELETION: 'STORAGE_DELETION',
    OAIS_DELETION: 'OAIS_DELETION',
  }

  state = {
    componentFilters: {},
    requestParameters: {},
    // validationPayload: {},
    isValidateDialogOpened: false,
    isValidateSelectionDialogOpened: false,
    // relaunchPayload: {},
    isRelaunchDialogOpened: false,
    isRelaunchSelectionDialogOpened: false,
    // deletionPayload: {},
    isDeleteDialogOpened: false,
    isDeleteSelectionDialogOpened: false,
  }

  componentWillReceiveProps(nextProps) {
    const { featureManagerFilters } = this.state
    if (!isEqual(nextProps.featureManagerFilters, featureManagerFilters)) {
      this.setState({
        requestParameters: {
          ...this.state.requestParameters,
          ...nextProps.featureManagerFilters,
        },
      })
    }
  }

  onApplyFilters = () => {
    const { componentFilters, requestParameters } = this.state

    this.setState({
      componentFilters,
      requestParameters: {
        ...requestParameters,
        ...componentFilters,
      },
    })
  }

  onFilterUpdated = (newFilterValue) => {
    const { componentFilters } = this.state

    this.setState({
      componentFilters: {
        ...componentFilters,
        ...newFilterValue,
      },
    })
  }

  changeStateFilter = (event, index, values) => {
    this.onFilterUpdated({ state: values })
  }

  changeTypeFilter = (event, index, values) => {
    this.onFilterUpdated({ type: values })
  }

  onViewRequestErrors = (requestErrorsToView) => {
    this.setState({
      requestErrorsToView: requestErrorsToView || null,
    })
  }

  onCloseRequestErrors = () => {
    this.setState({
      requestErrorsToView: null,
    })
  }

  renderRequestErrorsDetail = () => {
    const { intl } = this.context
    const { requestErrorsToView } = this.state
    if (requestErrorsToView) {
      return (
        <Dialog
          title={intl.formatMessage({ id: 'oais.aips.list.aip-details.title' })}
          open
        >
          <RequestErrorDetailsComponent
            entity={requestErrorsToView}
            onClose={this.onCloseRequestErrors}
          />
        </Dialog>
      )
    }
    return null
  }

  onConfirmValidate = () => {

  }

  onValidate = () => {
    this.setState({
      isValidateDialogOpened: true,
    })
  }

  onCloseValidateDialog = () => {
    this.setState({
      isValidateDialogOpened: false,
    })
  }

  renderValidateConfirmDialog = () => {
    const { isValidateDialogOpened } = this.state
    if (isValidateDialogOpened) {
      return (
        <RequestValidateDialog
          onConfirmValidate={this.onConfirmValidate}
          onClose={this.onCloseValidateDialog}
        />
      )
    }
    return null
  }

  onValidateSelection = () => {
    const { selectionMode } = this.props

    switch (selectionMode) {
      case TableSelectionModes.includeSelected:
        this.setState({
          isValidateSelectionDialogOpened: true,
          // validationPayload: {
          //   selectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
          // },
        })
        break
      case TableSelectionModes.excludeSelected:
        this.setState({
          isValidateSelectionDialogOpened: true,
          // validationPayload: {
          //   selectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
          // },
        })
        break
      default:
        break
    }
  }

  onCloseValidateSelectionDialog = () => {
    this.setState({
      isValidateSelectionDialogOpened: false,
    })
  }

  renderValidateSelectionConfirmDialog = () => {
    const { isValidateSelectionDialogOpened, tableSelection } = this.state

    if (isValidateSelectionDialogOpened && !isEmpty(tableSelection)) {
      return (
        <RequestValidateDialog
          featureManagerFilters={this.props.featureManagerFilters}
          onConfirmValidate={this.onConfirmValidate}
          requestParameters={this.state.requestParameters}
          onClose={this.onCloseValidateSelectionDialog}
        />
      )
    }
    return null
  }

  onConfirmRelaunch = () => {

  }

  onRelaunch = () => {
    this.setState({
      isRelaunchDialogOpened: true,
      // relaunchPayload: {
      // },
    })
  }

  onCloseRelaunchDialog = () => {
    this.setState({
      isRelaunchDialogOpened: false,
    })
  }

  renderRelaunchConfirmDialog = () => {
    const { isRelaunchDialogOpened } = this.state
    if (isRelaunchDialogOpened) {
      return (
        <RequestRelaunchDialog
          onConfirmRelaunch={this.onConfirmRelaunch}
          onClose={this.onCloseRelaunchDialog}
        />
      )
    }
    return null
  }

  onRelaunchSelection = () => {
    this.setState({
      isRelaunchSelectionDialogOpened: true,
    })
  }

  onCloseRelaunchSelectionDialog = () => {
    this.setState({
      isRelaunchSelectionDialogOpened: false,
    })
  }

  renderRelaunchSelectionConfirmDialog = () => {
    const { isRelaunchSelectionDialogOpened, tableSelection } = this.state
    if (isRelaunchSelectionDialogOpened && !isEmpty(tableSelection)) {
      return (
        <RequestRelaunchDialog
          onConfirmRelaunch={this.onConfirmRelaunch}
          onClose={this.onCloseRelaunchSelectionDialog}
        />
      )
    }
    return null
  }

  onConfirmDelete = () => {

  }

  onDelete = () => {
    this.setState({
      isDeleteDialogOpened: true,
      // deletionPayload: {
      //   selectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
      // },
    })
  }

  onCloseDeleteDialog = () => {
    this.setState({
      isDeleteDialogOpened: false,
    })
  }

  renderDeleteConfirmDialog = () => {
    const { isDeleteDialogOpened } = this.state
    if (isDeleteDialogOpened) {
      return (
        <RequestDeleteDialog
          onConfirmDelete={this.onConfirmDelete}
          onClose={this.onCloseDeleteDialog}
        />
      )
    }
    return null
  }

  onDeleteSelection = () => {
    const { selectionMode } = this.props

    switch (selectionMode) {
      case TableSelectionModes.includeSelected:
        this.setState({
          isDeleteSelectionDialogOpened: true,
          // deletionPayload: {
          //   selectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
          // },
        })
        break
      case TableSelectionModes.excludeSelected:
        this.setState({
          isDeleteSelectionDialogOpened: true,
          // deletionPayload: {
          //   selectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
          // },
        })
        break
      default:
        break
    }
  }

  onCloseDeleteSelectionDialog = () => {
    this.setState({
      isDeleteSelectionDialogOpened: false,
    })
  }

  renderDeleteSelectionConfirmDialog = () => {
    const { isDeleteSelectionDialogOpened, tableSelection } = this.state
    if (isDeleteSelectionDialogOpened && !isEmpty(tableSelection)) {
      return (
        <RequestDeleteDialog
          onConfirmDelete={this.onConfirmDelete}
          onClose={this.onCloseDeleteSelectionDialog}
        />
      )
    }
    return null
  }

  render() {
    const { intl, muiTheme, moduleTheme: { filter } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const { pageSize } = this.props
    const { componentFilters, requestParameters } = this.state
    const types = OAISRequestManagerComponent.REQUEST_TYPES
    const states = OAISRequestManagerComponent.REQUEST_STATES
    const columns = [
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, requestSelectors, requestTableActions, requestTableSelectors)
        .build(),
      new TableColumnBuilder('column.providerId').titleHeaderCell().propertyRenderCell('content.providerId')
        .label(intl.formatMessage({ id: 'oais.requests.list.filters.providerId' }))
        .build(),
      new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.dtype')
        .label(intl.formatMessage({ id: 'oais.requests.list.filters.type' }))
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell()
        .rowCellDefinition({ Constructor: RequestStatusRenderCell, props: { onViewRequestErrors: this.onViewRequestErrors } })
        .label(intl.formatMessage({ id: 'oais.requests.list.filters.state' }))
        .build(),
      new TableColumnBuilder('column.creationDate').titleHeaderCell().propertyRenderCell('content.creationDate', DateValueRender)
        .label(intl.formatMessage({ id: 'oais.requests.list.filters.lastSubmission' }))
        .build(),
      new TableColumnBuilder('column.actions').titleHeaderCell()
        .label(intl.formatMessage({ id: 'oais.requests.list.filters.actions' }))
        .optionsColumn([
          {
            OptionConstructor: RequestRelaunchOption,
            optionProps: { onRelaunch: this.onRelaunch },
          },
          {
            OptionConstructor: RequestValidateOption,
            optionProps: { onValidate: this.onValidate },
          },
          {
            OptionConstructor: RequestDeleteOption,
            optionProps: { onDelete: this.onDelete },
          }])
        .build(),
    ]

    return (
      <div>
        <TableLayout>
          <TableHeaderOptionsArea key="filtersArea" reducible alignLeft>
            <TableHeaderOptionGroup key="first">
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={intl.formatMessage({
                  id: 'oais.requests.list.filters.type',
                })}
                value={componentFilters.type}
                onChange={this.changeTypeFilter}
              >
                {map(types, type => <MenuItem key={type} value={type} primaryText={type} />)}
                <MenuItem key="" value="" primaryText="" />
              </SelectField>
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={intl.formatMessage({
                  id: 'oais.packages.list.filters.state',
                })}
                value={componentFilters.state}
                onChange={this.changeStateFilter}
              >
                {map(states, state => <MenuItem key={state} value={state} primaryText={state} />)}
                <MenuItem key="" value="" primaryText="" />
              </SelectField>
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="validate"
                label={this.context.intl.formatMessage({ id: 'oais.requests.list.filters.buttons.validate' })}
                icon={<Filter />}
                onClick={this.onValidateSelection}
              />
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="relaunch"
                label={this.context.intl.formatMessage({ id: 'oais.requests.list.filters.buttons.relaunch' })}
                icon={<Filter />}
                onClick={this.onRelaunchSelection}
              />
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="delete"
                label={this.context.intl.formatMessage({ id: 'oais.requests.list.filters.buttons.delete' })}
                icon={<Filter />}
                onClick={this.onDeleteSelection}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
          <PageableInfiniteTableContainer
            name="request-management-table"
            pageActions={requestActions}
            pageSelectors={requestSelectors}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            columns={columns}
            requestParams={requestParameters}
            emptyComponent={OAISRequestManagerComponent.EMPTY_COMPONENT}
          />
        </TableLayout>
        {this.renderRequestErrorsDetail()}
        {this.renderValidateConfirmDialog()}
        {this.renderValidateSelectionConfirmDialog()}
        {this.renderRelaunchConfirmDialog()}
        {this.renderRelaunchSelectionConfirmDialog()}
        {this.renderDeleteConfirmDialog()}
        {this.renderDeleteSelectionConfirmDialog()}
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(OAISRequestManagerComponent))
