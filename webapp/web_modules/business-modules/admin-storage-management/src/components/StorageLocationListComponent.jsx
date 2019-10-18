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
import MenuItem from 'material-ui/MenuItem'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { Checkbox } from 'material-ui'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
import FlatButton from 'material-ui/FlatButton'
import {
  TableLayout, InfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingAndResults, TableDeleteOption, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, PositionedDialog,
} from '@regardsoss/components'
import { StorageShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import StorageLocationEditAction from './StorageLocationEditAction'
import StorageLocationCopyFilesAction from './StorageLocationCopyFilesAction'
import StorageLocationPriorityAction from './StorageLocationPriorityAction'
import { storageLocationActions } from '../clients/StorageLocationClient'
import StorageLocationSizeRenderer from './StorageLocationSizeRenderer'
import StorageLocationStorageErrorRenderer from './StorageLocationStorageErrorRenderer'
import StorageLocationDeletionErrorRenderer from './StorageLocationDeletionErrorRenderer'
import StorageLocationDeleteFilesAction from './StorageLocationDeleteFilesAction'
import messages from '../i18n'
import styles from '../styles'

/**
* Comment Here
* @author Sébastien Binda
*/
export class StorageLocationListComponent extends React.Component {
  static addDependencies = [storageLocationActions.getDependency(RequestVerbEnum.POST)]

  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    onUpPriority: PropTypes.func.isRequired,
    onDownPriority: PropTypes.func.isRequired,
    onRetryErrors: PropTypes.func.isRequired,
    onDeleteErrors: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteFiles: PropTypes.func.isRequired,
    onCopyFiles: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    entities: StorageShapes.StorageLocationArray,
    isLoading: PropTypes.bool.isRequired,
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
    DELETE_FILES: 'DELETE_FILES',
  }

  state = {
    entityTargeted: null,
    entitytoDeleteFiles: null,
    relaunchMonitoringDialog: null,
    entitytoCopyFiles: null,
    copyPathSource: '',
    copyPathTarget: '',
    copyStorageTarget: null,
    deleteFilesForce: false,
    dialogType: null,
    errorsType: null,
  }

  onConfirmSimpleDialog = () => {
    const { dialogType, errorsType } = this.state
    this.closeDialogs()
    switch (dialogType) {
      case StorageLocationListComponent.DIALOGS_TYPES.DELETE:
        if (this.state.entityTargeted) {
          this.props.onDelete(this.state.entityTargeted.content.configuration.name)
        }
        break
      case StorageLocationListComponent.DIALOGS_TYPES.RELAUNCH_ERRORS:
        if (this.state.entityTargeted) {
          this.props.onRetryErrors(this.state.entityTargeted.content.configuration.name, errorsType)
        }
        break
      case StorageLocationListComponent.DIALOGS_TYPES.DELETE_ERRORS:
        if (this.state.entityTargeted) {
          this.props.onDeleteErrors(this.state.entityTargeted.content.configuration.name, errorsType)
        }
        break
      case StorageLocationListComponent.DIALOGS_TYPES.DELETE_FILES:
        if (this.state.entitytoDeleteFiles) {
          this.props.onDeleteFiles(this.state.entitytoDeleteFiles.content.configuration.name, this.state.deleteFilesForce)
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

  onConfirmCopyFiles = () => {
    const { copyPathSource, copyPathTarget, copyStorageTarget } = this.state
    this.closeDialogs()
    if (this.state.entitytoCopyFiles) {
      this.props.onCopyFiles(this.state.entitytoCopyFiles.content.configuration.name, copyPathSource, copyStorageTarget, copyPathTarget)
    }
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
   * Dialog for Simple Confirm
   */
  renderConfirmDialog = (dialogKind, title, dialogSwitch) => {
    const { entityTargeted, dialogType } = this.state
    if (entityTargeted && dialogSwitch === dialogType) {
      const { name } = entityTargeted.content.configuration
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

  renderDeleteFilesConfirmDialog = () => {
    const { entitytoDeleteFiles, deleteFilesForce } = this.state
    const { intl: { formatMessage } } = this.context
    if (entitytoDeleteFiles) {
      const { name } = entitytoDeleteFiles.content.configuration
      const actions = [
        <FlatButton
          key="close"
          label={formatMessage({ id: 'storage.data-storage.plugins.dialogs.cancel' })}
          onClick={this.closeDialogs}
        />,
        <FlatButton
          key="confirm"
          label={formatMessage({ id: 'storage.data-storage.plugins.dialogs.confirm' })}
          primary
          onClick={this.onConfirmSimpleDialog}
        />,
      ]
      return (
        <PositionedDialog
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={formatMessage({ id: 'storage.data-storage.plugins.delete.confirm.title' }, { name })}
          open={!!entitytoDeleteFiles}
          actions={actions}
          dialogWidthPercent={50}
        >
          <Checkbox onCheck={this.onCheckForceDelete} name="confirm-delete-file-force" checked={deleteFilesForce} label={formatMessage({ id: 'storage.data-storage.plugins.delete.confirm.option' }, { name })} />
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
          label={formatMessage({ id: 'storage.data-storage.plugins.dialogs.cancel' })}
          onClick={this.closeDialogs}
        />,
        <FlatButton
          key="confirm"
          label={formatMessage({ id: 'storage.data-storage.plugins.dialogs.confirm' })}
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
        >
          {formatMessage({ id: 'storage.data-storage.monitoring.dialog.checkbox' })}
        </PositionedDialog>
      )
    }
    return null
  }

  /**
   * Dialog for Copy Files
   */
  handleStorageSelect = (event, key) => {
    const { entities } = this.props
    this.setState({ copyStorageTarget: entities[key].content.name })
  }

  handlePathSource = (event, value) => {
    this.setState({ copyPathSource: value })
  }

  handlePathDestination = (event, value) => {
    this.setState({ copyPathTarget: value })
  }

  renderCopyFilesConfirmDialog = () => {
    const {
      entitytoCopyFiles, copyPathSource, copyPathTarget, copyStorageTarget,
    } = this.state
    const { intl: { formatMessage }, moduleTheme: { dropdown } } = this.context
    if (entitytoCopyFiles) {
      const { name } = entitytoCopyFiles.content.configuration
      const actions = [
        <FlatButton
          key="close"
          label={formatMessage({ id: 'storage.data-storage.plugins.dialogs.cancel' })}
          onClick={this.closeDialogs}
        />,
        <FlatButton
          key="confirm"
          label={formatMessage({ id: 'storage.data-storage.plugins.dialogs.confirm' })}
          primary
          onClick={this.onConfirmCopyFiles}
          disabled={!copyStorageTarget}
        />,
      ]
      return (
        <PositionedDialog
          dialogType={ConfirmDialogComponentTypes.CONFIRM}
          title={formatMessage({ id: 'storage.data-storage.plugins.copy.confirm.title' }, { name })}
          open={!!entitytoCopyFiles}
          actions={actions}
          dialogWidthPercent={50}
        >
          <div>
            <div>
              De :
              {' '}
              {name}
            </div>
            <TextField
              hintText={formatMessage({ id: 'storage.data-storage.plugins.copy.confirm.path-source' })}
              value={copyPathSource}
              onChange={this.handlePathSource}
              fullWidth
            />
          </div>
          <div>
            <span>
              <b>Vers :</b>
              <DropDownMenu
                value={copyStorageTarget}
                onChange={this.handleStorageSelect}
                style={dropdown}
              >
                {map(this.props.entities, entity => (
                  <MenuItem
                    value={entity.content.name}
                    key={entity.content.name}
                    primaryText={entity.content.name}
                    disabled={entity.content.name === name}
                  />
                ))}
              </DropDownMenu>
            </span>
            <TextField
              hintText={formatMessage({ id: 'storage.data-storage.plugins.copy.confirm.path-destination' })}
              value={copyPathTarget}
              onChange={this.handlePathDestination}
              fullWidth
            />
          </div>
        </PositionedDialog>
      )
    }
    return null
  }

  render() {
    const {
      entities, isLoading, onUpPriority, onDownPriority,
      onEdit, onRefresh,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    // Table columns to display
    const columns = [
      new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.name')
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.name.label' }))
        .build(),
      new TableColumnBuilder('column.storageType').titleHeaderCell().propertyRenderCell('content.configuration.storageType')
        .optionsSizing(2)
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.type.label' }))
        .build(),
      new TableColumnBuilder('column.nbFilesStored').titleHeaderCell().propertyRenderCell('content.nbFilesStored')
        .optionsSizing(3)
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.stored-file.label' }))
        .build(),
      new TableColumnBuilder('column.totalSized').titleHeaderCell()
        .optionsSizing(3)
        .rowCellDefinition({ Constructor: StorageLocationSizeRenderer })
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.total-size.label' }))
        .build(),
      new TableColumnBuilder('column.nbStorageError').titleHeaderCell()
        .optionsSizing(2)
        .rowCellDefinition({ Constructor: StorageLocationStorageErrorRenderer, props: { onStorageErrors: this.onStorageErrors } })
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.storage-error.label' }))
        .build(),
      new TableColumnBuilder('column.nbDeletionError').titleHeaderCell()
        .optionsSizing(2)
        .rowCellDefinition({ Constructor: StorageLocationDeletionErrorRenderer, props: { onDeletionErrors: this.onDeletionErrors } })
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.deletion-error.label' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: StorageLocationEditAction,
        optionProps: { onEdit },
      },
      {
        OptionConstructor: StorageLocationCopyFilesAction,
        optionProps: { onCopyFiles: this.onCopyFiles },
      },
      {
        OptionConstructor: StorageLocationPriorityAction,
        optionProps: { onUp: onUpPriority },
      },
      {
        OptionConstructor: StorageLocationPriorityAction,
        optionProps: { onDown: onDownPriority },
      },
      {
        OptionConstructor: StorageLocationDeleteFilesAction,
        optionProps: { onDeleteFiles: this.onDeleteFiles },
      },
      {
        OptionConstructor: TableDeleteOption,
        optionProps: {
          onDelete: this.onDelete,
          fetchPage: onRefresh,
          handleHateoas: true,
          disableInsteadOfHide: true,
          queryPageSize: 20,
        },
      },
      ])
        .build(),
    ]

    const emptyComponent = (
      <NoContentComponent
        titleKey="storage.data-storage.plugins.list.empty.title"
        Icon={AddToPhotos}
      />
    )
    const orderTypes = { ONLINE: 1, NEARLINE: 2, OFFLINE: 3 }
    return (
      <div>
        {this.renderConfirmDialog(ConfirmDialogComponentTypes.DELETE, 'storage.data-storage.plugins.list.confirm.title', StorageLocationListComponent.DIALOGS_TYPES.DELETE)}
        {this.renderConfirmDialog(ConfirmDialogComponentTypes.POST, 'storage.data-storage.plugins.errors.relaunch.confirm.title', StorageLocationListComponent.DIALOGS_TYPES.RELAUNCH_ERRORS)}
        {this.renderConfirmDialog(ConfirmDialogComponentTypes.DELETE, 'storage.data-storage.plugins.errors.delete.confirm.title', StorageLocationListComponent.DIALOGS_TYPES.DELETE_ERRORS)}
        {this.renderDeleteFilesConfirmDialog()}
        {this.renderCopyFilesConfirmDialog()}
        {this.renderRelaunchMonitoringConfirmDialog()}
        <TableLayout>
          <TableHeaderLineLoadingAndResults isFetching={isLoading} resultsCount={entities.length}>
            <FlatButton
              label={formatMessage({ id: 'storage.data-storage.monitoring.button' })}
              onClick={this.onRelaunchMonitoring}
            />
          </TableHeaderLineLoadingAndResults>
          <InfiniteTableContainer
            columns={columns}
            entities={entities.sort((entityA, entityB) => orderTypes[entityA.content.configuration.storageType] - orderTypes[entityB.content.configuration.storageType] || entityA.content.configuration.priority - entityB.content.configuration.priority)}
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
