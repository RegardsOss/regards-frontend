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
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { Checkbox } from 'material-ui'
import FlatButton from 'material-ui/FlatButton'
import {
  TableLayout, InfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingAndResults, TableDeleteOption, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, PositionedDialog,
} from '@regardsoss/components'
import { StorageShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import PrioritizedDataStorageEditAction from './PrioritizedDataStorageEditAction'
import PrioritizedDataStorageDuplicateAction from './PrioritizedDataStorageDuplicateAction'
import PrioritizedDataStoragePriorityAction from './PrioritizedDataStoragePriorityAction'
import { storagesPluginActions } from '../clients/StoragesPluginClient'
import messages from '../i18n'
import styles from '../styles'
import StoragesPluginSizeRenderer from './StoragesPluginSizeRenderer'
import StoragesPluginStorageErrorRenderer from './StoragesPluginStorageErrorRenderer'
import StoragesPluginDeletionErrorRenderer from './StoragesPluginDeletionErrorRenderer'
import PrioritizedDataStorageDeleteFilesAction from './PrioritizedDataStorageDeleteFilesAction'

/**
* Comment Here
* @author Sébastien Binda
*/
export class PrioritizedDataStorageListComponent extends React.Component {
  static addDependencies = [storagesPluginActions.getDependency(RequestVerbEnum.POST)]

  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    onUpPriority: PropTypes.func.isRequired,
    onDownPriority: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteFiles: PropTypes.func.isRequired,
    onCopyFiles: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    entities: StorageShapes.PrioritizedDataStorageArray,
    isLoading: PropTypes.bool.isRequired,
    onRelaunchStoragesErrors: PropTypes.func.isRequired,
    onRelaunchDeletionsErrors: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    entitytoDelete: null,
    entitytoDeleteFiles: null,
    deleteFilesForce: false,
    entitytoCopyFiles: null,
  }

  onConfirmDelete = () => {
    this.closeDialogs()
    if (this.state.entitytoDelete) {
      this.props.onDelete(this.state.entitytoDelete.content.configuration.name)
    }
  }

  onConfirmDeleteFiles = () => {
    this.closeDialogs()
    if (this.state.entitytoDeleteFiles) {
      this.props.onDeleteFiles(this.state.entitytoDeleteFiles.content.configuration.name, this.state.deleteFilesForce)
    }
  }

  onConfirmCopyFiles = () => {
    this.closeDialogs()
    if (this.state.entitytoCopyFiles) {
      this.props.onCopyFiles(this.state.entitytoCopyFiles.content.configuration.name)
    }
  }

  onDelete = (entitytoDelete) => {
    this.setState({
      entitytoDelete,
    })
  }

  onDeleteFiles = (entitytoDeleteFiles) => {
    this.setState({
      entitytoDeleteFiles,
    })
  }

  onCopyFiles = (entitytoCopyFiles) => {
    this.setState({
      entitytoCopyFiles,
    })
  }

  closeDialogs = () => {
    this.setState({
      entitytoDelete: null,
      entitytoDeleteFiles: null,
      entitytoCopyFiles: null,
    })
  }

  renderDeleteConfirmDialog = () => {
    const { entitytoDelete } = this.state
    if (entitytoDelete) {
      const { name } = entitytoDelete.content.configuration
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'storage.data-storage.plugins.list.confirm.title' }, { name })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDialogs}
        />
      )
    }
    return null
  }

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
          primary
          onClick={this.closeDialogs}
        />,
        <FlatButton
          key="confirm"
          label={formatMessage({ id: 'storage.data-storage.plugins.dialogs.confirm' })}
          primary
          onClick={this.onConfirmDeleteFiles}
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

  renderCopyFilesConfirmDialog = () => {
    const { entitytoCopyFiles } = this.state
    if (entitytoCopyFiles) {
      const { name } = entitytoCopyFiles.content.configuration
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.CONFIRM}
          title={this.context.intl.formatMessage({ id: 'storage.data-storage.plugins.list.confirm.title' }, { name })}
          onConfirm={this.onConfirmCopyFiles}
          onClose={this.closeDialogs}
        />
      )
    }
    return null
  }

  render() {
    const {
      entities, isLoading, onUpPriority, onDownPriority,
      onEdit, onRefresh, onRelaunchStoragesErrors, onRelaunchDeletionsErrors,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    // Table columns to display
    const columns = [
      new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.name')
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.name.label' }))
        .build(),
      new TableColumnBuilder('column.storageType').titleHeaderCell().propertyRenderCell('content.configuration.storageType')
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.type.label' }))
        .build(),
      new TableColumnBuilder('column.nbFilesStored').titleHeaderCell().propertyRenderCell('content.nbFilesStored')
        .optionsSizing(3)
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.stored-file.label' }))
        .build(),
      new TableColumnBuilder('column.totalSized').titleHeaderCell()
        .rowCellDefinition({ Constructor: StoragesPluginSizeRenderer })
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.total-size.label' }))
        .build(),
      new TableColumnBuilder('column.nbStorageError').titleHeaderCell()
        .rowCellDefinition({ Constructor: StoragesPluginStorageErrorRenderer, props: { onRelaunchStoragesErrors } })
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.storage-error.label' }))
        .build(),
      new TableColumnBuilder('column.nbDeletionError').titleHeaderCell()
        .rowCellDefinition({ Constructor: StoragesPluginDeletionErrorRenderer, props: { onRelaunchDeletionsErrors } })
        .label(formatMessage({ id: 'storage.data-storage.plugins.list.header.deletion-error.label' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: PrioritizedDataStorageEditAction,
        optionProps: { onEdit },
      },
      {
        OptionConstructor: PrioritizedDataStorageDuplicateAction,
        optionProps: { onCopyFiles: this.onCopyFiles },
      },
      {
        OptionConstructor: PrioritizedDataStoragePriorityAction,
        optionProps: { onUp: onUpPriority },
      },
      {
        OptionConstructor: PrioritizedDataStoragePriorityAction,
        optionProps: { onDown: onDownPriority },
      },
      {
        OptionConstructor: PrioritizedDataStorageDeleteFilesAction,
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
        title={formatMessage({ id: 'storage.data-storage.plugins.list.empty.title' })}
        Icon={AddToPhotos}
      />
    )
    const orderTypes = { ONLINE: 1, NEARLINE: 2, OFFLINE: 3 }
    return (
      <div>
        {this.renderDeleteConfirmDialog()}
        {this.renderDeleteFilesConfirmDialog()}
        {this.renderCopyFilesConfirmDialog()}
        <TableLayout>
          <TableHeaderLineLoadingAndResults isFetching={isLoading} resultsCount={entities.length} />
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
export default withModuleStyle(styles)(withI18n(messages)(PrioritizedDataStorageListComponent))
