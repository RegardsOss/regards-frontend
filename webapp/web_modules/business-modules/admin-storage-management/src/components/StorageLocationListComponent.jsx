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
import get from 'lodash/get'
import find from 'lodash/find'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import {
  TableLayout, InfiniteTableContainer, TableColumnBuilder, TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup,
  NoContentComponent, TableHeaderLineLoadingSelectAllAndResults, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, PositionedDialog,
} from '@regardsoss/components'
import { StorageShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { storageLocationActions } from '../clients/StorageLocationClient'
import StorageLocationSizeRenderer from './StorageLocationSizeRenderer'
import StorageLocationStorageErrorRenderer from './StorageLocationStorageErrorRenderer'
import StorageLocationNbFilesStoredRenderer from './StorageLocationNbFilesStoredRenderer'
import StorageLocationDeletionErrorRenderer from './StorageLocationDeletionErrorRenderer'
import StorageLocationListActions from './StorageLocationListActions'
import StorageRequestListComponent from './StorageRequestListComponent'
import StorageLocationActivityRenderer from './StorageLocationActivityRenderer'
import StorageCopyForm from './StorageCopyForm'
import { DIALOG_OPTIONS } from '../domain/StorageLocationDialogOptionsEnum'
import messages from '../i18n'
import styles from '../styles'
import dependencies from '../dependencies'

const RaisedButtonWithResourceDisplayControl = withResourceDisplayControl(RaisedButton)

/**
* Comment Here
* @author Sébastien Binda
*/
export class StorageLocationListComponent extends React.Component {
  static addDependencies = [storageLocationActions.getDependency(RequestVerbEnum.POST)]

  static propTypes = {
    entities: StorageShapes.StorageLocationArray,
    isLoading: PropTypes.bool.isRequired,
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onEdit: PropTypes.func.isRequired,
    onUpPriority: PropTypes.func.isRequired,
    onDownPriority: PropTypes.func.isRequired,
    onRetryErrors: PropTypes.func.isRequired,
    onDeleteErrors: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteFiles: PropTypes.func.isRequired,
    onCopyFiles: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onRelaunchMonitoring: PropTypes.func.isRequired,
    onRunPendingActions: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static ICON_STYLE = {
    margin: 5,
  }

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="storage.location.list.empty.title"
      Icon={AddToPhotos}
    />)

  state = {
    entityTargeted: null,
    entitytoDeleteFiles: null,
    relaunchMonitoringDialog: null,
    pendingActionsDialogOpened: false,
    entitytoCopyFiles: null,
    deleteFilesForce: false,
    dialogType: null,
    errorsType: null,
    confirmStop: false,
  }

  timerId = null

  componentDidMount() {
    this.autoRefresh()
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
  }

  autoRefresh = () => {
    this.props.onRefresh()
    this.timerId = setTimeout(this.autoRefresh, 10000)
  }

  onConfirmSimpleDialog = () => {
    const { dialogType, errorsType } = this.state
    this.closeDialogs()
    switch (dialogType) {
      case DIALOG_OPTIONS.DELETE:
        if (this.state.entityTargeted) {
          this.props.onDelete(this.state.entityTargeted.content.configuration.name).then(() => {
            this.props.onRefresh()
          })
        }
        break
      case DIALOG_OPTIONS.RELAUNCH_ERRORS:
        if (this.state.entityTargeted) {
          this.props.onRetryErrors(this.state.entityTargeted.content.configuration.name, errorsType).then(() => {
            this.props.onRefresh()
          })
        }
        break
      case DIALOG_OPTIONS.DELETE_ERRORS:
        if (this.state.entityTargeted) {
          this.props.onDeleteErrors(this.state.entityTargeted.content.configuration.name, errorsType).then(() => {
            this.props.onRefresh()
          })
        }
        break
      case DIALOG_OPTIONS.DELETE_FILES:
        if (this.state.entitytoDeleteFiles) {
          this.props.onDeleteFiles(this.state.entitytoDeleteFiles.content.configuration.name, this.state.deleteFilesForce).then(() => {
            this.props.onRefresh()
          })
        }
        break
      default:
        break
    }
  }

  onConfirmRelaunchMonitoring = () => {
    const resetMode = true
    const { onRelaunchMonitoring } = this.props
    this.closeDialogs()
    onRelaunchMonitoring(resetMode)
  }

  onDelete = (entityTargeted) => {
    this.setState({
      entityTargeted,
      dialogType: DIALOG_OPTIONS.DELETE,
    })
  }

  onDeleteFiles = (entitytoDeleteFiles) => {
    this.setState({
      entitytoDeleteFiles,
      dialogType: DIALOG_OPTIONS.DELETE_FILES,
    })
  }

  onStorageErrors = (entityTargeted, dialogType) => {
    this.setState({
      entityTargeted,
      dialogType,
      errorsType: 'STORAGE',
    })
  }

  onDeletionErrors = (entityTargeted, dialogType) => {
    this.setState({
      entityTargeted,
      dialogType,
      errorsType: 'DELETION',
    })
  }

  onCopyFiles = (entitytoCopyFiles) => {
    this.setState({
      entitytoCopyFiles,
    })
  }

  onRelaunchMonitoring = () => {
    this.setState({ relaunchMonitoringDialog: true })
  }

  onSwitchConfirmStopDialog = () => {
    this.setState({
      confirmStop: !this.state.confirmStop,
    })
  }

  onSwitchConfirmPendingActionsDialog = () => {
    this.setState({
      pendingActionsDialogOpened: !this.state.pendingActionsDialogOpened,
    })
  }

  /**
   * Close all dialogs
   */
  closeDialogs = () => {
    this.setState({
      entityTargeted: null,
      entitytoDeleteFiles: null,
      entitytoCopyFiles: null,
      relaunchMonitoringDialog: null,
      dialogType: null,
      errorsType: null,
    })
  }

  /**
   * Dialog to display actions about storage location requests
   */
  renderRequestsDialog = (dialogKind, title, dialogSwitch) => {
    const { entityTargeted, dialogType, errorsType } = this.state
    const { intl: { formatMessage } } = this.context
    if (entityTargeted && dialogSwitch === dialogType) {
      const { name } = entityTargeted.content
      if (dialogType === DIALOG_OPTIONS.VIEW_ERRORS) {
        return (
          <PositionedDialog
            title={this.context.intl.formatMessage({ id: title }, { name })}
            open={!!dialogType}
            actions={<>
              <FlatButton
                key="close"
                label={formatMessage({ id: 'storage.location.dialogs.cancel' })}
                onClick={this.closeDialogs}
              />
            </>}
            dialogWidthPercent={75}
            dialogHeightPercent={75}
          >
            <StorageRequestListComponent
              storageLocation={name}
              requestsType={errorsType}
              requestsStatus="ERROR"
            />
          </PositionedDialog>
        )
      }
      return (
        <ConfirmDialogComponent
          dialogType={dialogKind}
          title={this.context.intl.formatMessage({ id: title }, { name })}
          onConfirm={this.onConfirmSimpleDialog}
          onClose={this.closeDialogs}
        />
      )
    }
    return null
  }

  /**
   * Dialog for Delete Files
   */
  onCheckForceDelete = () => {
    this.setState({ deleteFilesForce: !this.state.deleteFilesForce })
  }

  onStop = () => {
    this.onSwitchConfirmStopDialog()
    this.props.onStop()
  }

  rendeStopConfirmDialog = () => {
    const { intl: { formatMessage } } = this.context
    const actions = [
      <FlatButton
        key="close"
        label={formatMessage({ id: 'storage.location.dialogs.cancel' })}
        onClick={this.onSwitchConfirmStopDialog}
      />, <FlatButton
        key="confirm"
        label={formatMessage({ id: 'storage.location.dialogs.confirm' })}
        primary
        onClick={this.onStop}
      />,
    ]
    return (
      <PositionedDialog
        dialogType={ConfirmDialogComponentTypes.CONFIRM}
        title={formatMessage({ id: 'storage.location.stop.confirm.title' })}
        open={this.state.confirmStop}
        actions={actions}
        dialogHeightPercent={20}
        dialogWidthPercent={50}
      >
        <span>{formatMessage({ id: 'storage.location.stop.confirm.message' })}</span>
      </PositionedDialog>
    )
  }

  renderDeleteFilesConfirmDialog = () => {
    const { entitytoDeleteFiles, deleteFilesForce } = this.state
    const { intl: { formatMessage }, moduleTheme: { storageTable: { dialog: { warning, messageDiv } } } } = this.context
    if (entitytoDeleteFiles) {
      const { name } = entitytoDeleteFiles.content.configuration
      const { allowsPhysicalDeletion } = entitytoDeleteFiles.content
      return (
        <PositionedDialog
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={formatMessage({ id: 'storage.location.delete.confirm.title' }, { name })}
          open={!!entitytoDeleteFiles}
          actions={<>
            <FlatButton
              key="close"
              label={formatMessage({ id: 'storage.location.dialogs.cancel' })}
              onClick={this.closeDialogs}
            />
            <FlatButton
              key="confirm"
              label={formatMessage({ id: 'storage.location.dialogs.confirm' })}
              primary
              onClick={this.onConfirmSimpleDialog}
            />
          </>}
          dialogHeightPercent={20}
          dialogWidthPercent={50}
        >
          {
            allowsPhysicalDeletion
              ? <div>
                <div style={messageDiv}>{formatMessage({ id: 'storage.location.delete.confirm.message.option' })}</div>
                <Checkbox onCheck={this.onCheckForceDelete} name="confirm-delete-file-force" checked={deleteFilesForce} label={formatMessage({ id: 'storage.location.delete.confirm.option' }, { name })} />
              </div>
              : <div>
                <span style={warning}>{formatMessage({ id: 'storage.location.delete.message.warning.option' })}</span>
                <span>{formatMessage({ id: 'storage.location.delete.message.option' })}</span>
              </div>
          }
        </PositionedDialog>
      )
    }
    return null
  }

  /**
   * Dialog for Relaunch Monitoring
   */

  renderRelaunchMonitoringConfirmDialog = () => {
    const { relaunchMonitoringDialog } = this.state
    const { intl: { formatMessage } } = this.context
    if (relaunchMonitoringDialog) {
      return (
        <PositionedDialog
          dialogType={ConfirmDialogComponentTypes.POST}
          title={formatMessage({ id: 'storage.data-storage.monitoring.dialog.title' })}
          open={!!relaunchMonitoringDialog}
          actions={<>
            <FlatButton
              key="close"
              label={formatMessage({ id: 'storage.location.dialogs.cancel' })}
              onClick={this.closeDialogs}
            />
            <FlatButton
              key="confirm"
              label={formatMessage({ id: 'storage.location.dialogs.confirm' })}
              primary
              onClick={this.onConfirmRelaunchMonitoring}
            />
          </>}
          dialogWidthPercent={50}
          dialogHeightPercent={30}
        >
          <div>
            {formatMessage({ id: 'storage.data-storage.monitoring.dialog.checkbox' })}
          </div>
        </PositionedDialog>
      )
    }
    return null
  }

  renderCopyFilesConfirmDialog = () => {
    const { entitytoCopyFiles } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <PositionedDialog
        title={formatMessage({ id: 'storage.location.copy.confirm.title' }, { name: get(entitytoCopyFiles, 'content.name', null) })}
        open={!!entitytoCopyFiles}
        dialogHeightPercent={20}
        dialogWidthPercent={50}
      >
        <StorageCopyForm
          storageLocation={entitytoCopyFiles}
          availablableDestinations={this.props.entities}
          onSubmit={this.props.onCopyFiles}
          onClose={this.closeDialogs}
        />
      </PositionedDialog>
    )
  }

  renderPendingActionsConfirmDialog = () => {
    const { onRunPendingActions } = this.props
    const { pendingActionsDialogOpened } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <ConfirmDialogComponent
        open={pendingActionsDialogOpened}
        dialogType={ConfirmDialogComponentTypes.CONFIRM}
        onConfirm={() => {
          onRunPendingActions()
        }}
        onClose={this.onSwitchConfirmPendingActionsDialog}
        title={formatMessage({ id: 'storage.location.list.confirm.pending.actions.dialog.title' })}
      />)
  }

  formatType = (entity) => this.context.intl.formatMessage({ id: `storage.type.${get(entity, 'content.configuration.storageType', 'NONE')}` })

  isPendingActionsExist = (entities) => find(entities, (entity) => get(entity, 'content.nbFilesStoredWithPendingActionRemaining', 0) > 0)

  render() {
    const {
      entities, isLoading, availableDependencies,
      onUpPriority, onDownPriority, onEdit, onRefresh,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const orderTypes = {
      ONLINE: 1, NEARLINE: 2, OFFLINE: 3, CACHE: 4,
    }
    const sortedEntities = entities.sort(
      (entityA, entityB) => {
        const storageTypeA = entityA.content.configuration ? entityA.content.configuration.storageType : 'OFFLINE'
        const priorityA = entityA.content.configuration ? entityA.content.configuration.priority : 0
        const storageTypeB = entityB.content.configuration ? entityB.content.configuration.storageType : 'OFFLINE'
        const priorityB = entityB.content.configuration ? entityB.content.configuration.priority : 0
        return orderTypes[storageTypeA] - orderTypes[storageTypeB] || priorityA - priorityB
      })
    return (
      <div>
        {this.renderRequestsDialog(ConfirmDialogComponentTypes.DELETE, 'storage.location.list.confirm.title', DIALOG_OPTIONS.DELETE)}
        {this.renderRequestsDialog(ConfirmDialogComponentTypes.POST, 'storage.location.errors.relaunch.confirm.title', DIALOG_OPTIONS.RELAUNCH_ERRORS)}
        {this.renderRequestsDialog(ConfirmDialogComponentTypes.DELETE, 'storage.location.errors.delete.confirm.title', DIALOG_OPTIONS.DELETE_ERRORS)}
        {this.renderRequestsDialog(null, 'storage.location.errors.view.title', DIALOG_OPTIONS.VIEW_ERRORS)}
        {this.renderDeleteFilesConfirmDialog()}
        {this.rendeStopConfirmDialog()}
        {this.renderCopyFilesConfirmDialog()}
        {this.renderRelaunchMonitoringConfirmDialog()}
        {this.renderPendingActionsConfirmDialog()}
        <TableLayout>
          <TableHeaderLineLoadingSelectAllAndResults isFetching={isLoading} resultsCount={entities.length} />
          <TableHeaderLine key="filtersLine">
            <TableHeaderOptionsArea key="filtersArea" reducible alignRight>
              <TableHeaderOptionGroup>
                <RaisedButton
                  label={formatMessage({ id: 'storage.data-storage.monitoring.button' })}
                  onClick={this.onRelaunchMonitoring}
                  primary
                  style={StorageLocationListComponent.ICON_STYLE}
                />
                <RaisedButtonWithResourceDisplayControl
                  resourceDependencies={dependencies.stopDependencies}
                  label={formatMessage({ id: 'storage.data-storage.stop.button' })}
                  onClick={this.onSwitchConfirmStopDialog}
                  primary
                  style={StorageLocationListComponent.ICON_STYLE}
                />
                <RaisedButton
                  label={formatMessage({ id: 'storage.data-storage.refresh.button' })}
                  onClick={this.props.onRefresh}
                  primary
                  style={StorageLocationListComponent.ICON_STYLE}
                />
                <RaisedButton
                  label={formatMessage({ id: 'storage.data-storage.waiting.actions.button' })}
                  onClick={this.onSwitchConfirmPendingActionsDialog}
                  primary
                  style={StorageLocationListComponent.ICON_STYLE}
                  disabled={!this.isPendingActionsExist(entities)}
                />
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
          <InfiniteTableContainer
            // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
            columns={[ // eslint wont fix: Major API rework required
              new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.name')
                .label(formatMessage({ id: 'storage.location.list.header.name.label' }))
                .fixedSizing(150)
                .build(),
              new TableColumnBuilder('column.storageType').titleHeaderCell()
                .valuesRenderCell([{ getValue: this.formatType }])
                .label(formatMessage({ id: 'storage.location.list.header.type.label' }))
                .fixedSizing(100)
                .build(),
              new TableColumnBuilder('column.nbFilesStored').titleHeaderCell()
                .label(formatMessage({ id: 'storage.location.list.header.stored-file.label' }))
                .rowCellDefinition({
                  Constructor: StorageLocationNbFilesStoredRenderer,
                })
                .fixedSizing(150)
                .build(),
              new TableColumnBuilder('column.totalSized').titleHeaderCell()
                .fixedSizing(150)
                .rowCellDefinition({ Constructor: StorageLocationSizeRenderer })
                .label(formatMessage({ id: 'storage.location.list.header.total-size.label' }))
                .build(),
              new TableColumnBuilder('column.nbStorageError').titleHeaderCell()
                .rowCellDefinition({
                  Constructor: StorageLocationStorageErrorRenderer,
                  props: {
                    availableDependencies,
                    onStorageErrors: this.onStorageErrors,
                  },
                })
                .fixedSizing(110)
                .label(formatMessage({ id: 'storage.location.list.header.storage-error.label' }))
                .build(),
              new TableColumnBuilder('column.nbDeletionError').titleHeaderCell()
                .rowCellDefinition({ Constructor: StorageLocationDeletionErrorRenderer, props: { onDeletionErrors: this.onDeletionErrors } })
                .fixedSizing(110)
                .label(formatMessage({ id: 'storage.location.list.header.deletion-error.label' }))
                .build(),
              new TableColumnBuilder('column.activity').titleHeaderCell()
                .label(formatMessage({ id: 'storage.location.list.header.activity' }))
                .rowCellDefinition({ Constructor: StorageLocationActivityRenderer })
                .fixedSizing(60)
                .build(),
              new TableColumnBuilder('column.customActions').titleHeaderCell()
                .rowCellDefinition({
                  Constructor: StorageLocationListActions,
                  props: {
                    onEdit,
                    onCopyFiles: this.onCopyFiles,
                    onUp: onUpPriority,
                    onDown: onDownPriority,
                    onDeleteFiles: this.onDeleteFiles,
                    onDelete: this.onDelete,
                    onRefresh,
                  },
                })
                .build(),
            ]}
            entities={sortedEntities}
            emptyComponent={StorageLocationListComponent.EMPTY_COMPONENT}
            entitiesCount={entities.length}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
          />
        </TableLayout>
      </div>
    )
  }
}

// report static for ease of use
const ConnectedComponent = withModuleStyle(styles)(withI18n(messages)(StorageLocationListComponent))
ConnectedComponent.DIALOGS_TYPES = DIALOG_OPTIONS
export default ConnectedComponent
