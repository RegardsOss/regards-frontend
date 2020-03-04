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
import get from 'lodash/get'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { Checkbox } from 'material-ui'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import {
  TableLayout, InfiniteTableContainer, TableColumnBuilder, TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup,
  NoContentComponent, TableHeaderLineLoadingAndResults, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, PositionedDialog,
} from '@regardsoss/components'
import { StorageShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { storageLocationActions } from '../clients/StorageLocationClient'
import StorageLocationSizeRenderer from './StorageLocationSizeRenderer'
import StorageLocationStorageErrorRenderer from './StorageLocationStorageErrorRenderer'
import StorageLocationDeletionErrorRenderer from './StorageLocationDeletionErrorRenderer'
import StorageLocationListActions from './StorageLocationListActions'
import StorageRequestListComponent from './StorageRequestListComponent'
import StorageLocationActivityRenderer from './StorageLocationActivityRenderer'
import StorageCopyForm from './StorageCopyForm'
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
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static DIALOGS_TYPES = {
    DELETE: 'DELETE',
    RELAUNCH_ERRORS: 'RELAUNCH_ERRORS',
    DELETE_ERRORS: 'DELETE_ERRORS',
    VIEW_ERRORS: 'VIEW_ERRORS',
    DELETE_FILES: 'DELETE_FILES',
  }

  state = {
    entityTargeted: null,
    entitytoDeleteFiles: null,
    relaunchMonitoringDialog: null,
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
      case StorageLocationListComponent.DIALOGS_TYPES.DELETE:
        if (this.state.entityTargeted) {
          this.props.onDelete(this.state.entityTargeted.content.configuration.name).then(() => {
            this.props.onRefresh()
          })
        }
        break
      case StorageLocationListComponent.DIALOGS_TYPES.RELAUNCH_ERRORS:
        if (this.state.entityTargeted) {
          this.props.onRetryErrors(this.state.entityTargeted.content.configuration.name, errorsType).then(() => {
            this.props.onRefresh()
          })
        }
        break
      case StorageLocationListComponent.DIALOGS_TYPES.DELETE_ERRORS:
        if (this.state.entityTargeted) {
          this.props.onDeleteErrors(this.state.entityTargeted.content.configuration.name, errorsType).then(() => {
            this.props.onRefresh()
          })
        }
        break
      case StorageLocationListComponent.DIALOGS_TYPES.DELETE_FILES:
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
      dialogType: StorageLocationListComponent.DIALOGS_TYPES.DELETE,
    })
  }

  onDeleteFiles = (entitytoDeleteFiles) => {
    this.setState({
      entitytoDeleteFiles,
      dialogType: StorageLocationListComponent.DIALOGS_TYPES.DELETE_FILES,
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
      if (dialogType === StorageLocationListComponent.DIALOGS_TYPES.VIEW_ERRORS) {
        const actions = [
          <FlatButton
            key="close"
            label={formatMessage({ id: 'storage.location.dialogs.cancel' })}
            onClick={this.closeDialogs}
          />,
        ]
        return (
          <PositionedDialog
            title={this.context.intl.formatMessage({ id: title }, { name })}
            open={!!dialogType}
            actions={actions}
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
      />,
      <FlatButton
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
    const { intl: { formatMessage } } = this.context
    if (entitytoDeleteFiles) {
      const { name } = entitytoDeleteFiles.content.configuration
      const actions = [
        <FlatButton
          key="close"
          label={formatMessage({ id: 'storage.location.dialogs.cancel' })}
          onClick={this.closeDialogs}
        />,
        <FlatButton
          key="confirm"
          label={formatMessage({ id: 'storage.location.dialogs.confirm' })}
          primary
          onClick={this.onConfirmSimpleDialog}
        />,
      ]
      return (
        <PositionedDialog
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={formatMessage({ id: 'storage.location.delete.confirm.title' }, { name })}
          open={!!entitytoDeleteFiles}
          actions={actions}
          dialogHeightPercent={20}
          dialogWidthPercent={50}
        >
          <Checkbox onCheck={this.onCheckForceDelete} name="confirm-delete-file-force" checked={deleteFilesForce} label={formatMessage({ id: 'storage.location.delete.confirm.option' }, { name })} />
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
      const actions = [
        <FlatButton
          key="close"
          label={formatMessage({ id: 'storage.location.dialogs.cancel' })}
          onClick={this.closeDialogs}
        />,
        <FlatButton
          key="confirm"
          label={formatMessage({ id: 'storage.location.dialogs.confirm' })}
          primary
          onClick={this.onConfirmRelaunchMonitoring}
        />,
      ]
      return (
        <PositionedDialog
          dialogType={ConfirmDialogComponentTypes.POST}
          title={formatMessage({ id: 'storage.data-storage.monitoring.dialog.title' })}
          open={!!relaunchMonitoringDialog}
          actions={actions}
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

  formatType = entity => this.context.intl.formatMessage({ id: `storage.type.${get(entity, 'content.configuration.storageType', 'NONE')}` })

  render() {
    const {
      entities, isLoading, availableDependencies,
      onUpPriority, onDownPriority, onEdit, onRefresh,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    // Table columns to display
    const columns = [
      new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.name')
        .label(formatMessage({ id: 'storage.location.list.header.name.label' }))
        .fixedSizing(150)
        .build(),
      new TableColumnBuilder('column.storageType').titleHeaderCell()
        .valuesRenderCell([{ getValue: this.formatType }])
        .label(formatMessage({ id: 'storage.location.list.header.type.label' }))
        .fixedSizing(100)
        .build(),
      new TableColumnBuilder('column.nbFilesStored').titleHeaderCell().propertyRenderCell('content.nbFilesStored')
        .label(formatMessage({ id: 'storage.location.list.header.stored-file.label' }))
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
    ]

    const emptyComponent = (
      <NoContentComponent
        titleKey="storage.location.list.empty.title"
        Icon={AddToPhotos}
      />
    )
    const iconStyle = {
      margin: 5,
    }
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
        {this.renderRequestsDialog(ConfirmDialogComponentTypes.DELETE, 'storage.location.list.confirm.title', StorageLocationListComponent.DIALOGS_TYPES.DELETE)}
        {this.renderRequestsDialog(ConfirmDialogComponentTypes.POST, 'storage.location.errors.relaunch.confirm.title', StorageLocationListComponent.DIALOGS_TYPES.RELAUNCH_ERRORS)}
        {this.renderRequestsDialog(ConfirmDialogComponentTypes.DELETE, 'storage.location.errors.delete.confirm.title', StorageLocationListComponent.DIALOGS_TYPES.DELETE_ERRORS)}
        {this.renderRequestsDialog(null, 'storage.location.errors.view.title', StorageLocationListComponent.DIALOGS_TYPES.VIEW_ERRORS)}
        {this.renderDeleteFilesConfirmDialog()}
        {this.rendeStopConfirmDialog()}
        {this.renderCopyFilesConfirmDialog()}
        {this.renderRelaunchMonitoringConfirmDialog()}
        <TableLayout>
          <TableHeaderLineLoadingAndResults isFetching={isLoading} resultsCount={entities.length} />
          <TableHeaderLine key="filtersLine">
            <TableHeaderOptionsArea key="filtersArea" reducible alignRight>
              <TableHeaderOptionGroup>
                <RaisedButton
                  label={formatMessage({ id: 'storage.data-storage.monitoring.button' })}
                  onClick={this.onRelaunchMonitoring}
                  primary
                  style={iconStyle}
                />
                <RaisedButtonWithResourceDisplayControl
                  resourceDependencies={dependencies.stopDependencies}
                  label={formatMessage({ id: 'storage.data-storage.stop.button' })}
                  onClick={this.onSwitchConfirmStopDialog}
                  primary
                  style={iconStyle}
                />
                <RaisedButton
                  label={formatMessage({ id: 'storage.data-storage.refresh.button' })}
                  onClick={this.props.onRefresh}
                  primary
                  style={iconStyle}
                />
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
          <InfiniteTableContainer
            columns={columns}
            entities={sortedEntities}
            emptyComponent={emptyComponent}
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
ConnectedComponent.DIALOGS_TYPES = StorageLocationListComponent.DIALOGS_TYPES
export default ConnectedComponent
