/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  TableLayout, InfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingAndResults, TableDeleteOption, ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
} from '@regardsoss/components'
import { StorageShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import PrioritizedDataStorageEditAction from './PrioritizedDataStorageEditAction'
import PrioritizedDataStorageDuplicateAction from './PrioritizedDataStorageDuplicateAction'
import PrioritizedDataStoragePriorityAction from './PrioritizedDataStoragePriorityAction'
import PrioritizedDataStorageActivationAction from './PrioritizedDataStorageActivationAction'
import { onlinePrioritizedDataStorageActions } from '../clients/PrioritizedDataStorageClient'
import messages from '../i18n'
import styles from '../styles'

/**
* Comment Here
* @author Sébastien Binda
*/
export class PrioritizedDataStorageListComponent extends React.Component {
  static addDependencies = [onlinePrioritizedDataStorageActions.getDependency(RequestVerbEnum.POST)]

  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    onUpPriority: PropTypes.func.isRequired,
    onDownPriority: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onActivateToggle: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    entities: StorageShapes.PrioritizedDataStorageArray,
    isLoading: PropTypes.bool.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    entitytoDelete: null,
  }

  onConfirmDelete = () => {
    this.closeDeleteDialog()
    if (this.state.entitytoDelete) {
      this.props.onDelete(this.state.entitytoDelete.content)
    }
  }

  onDelete = (entitytoDelete) => {
    this.setState({
      entitytoDelete,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      entitytoDelete: null,
    })
  }

  renderDeleteConfirmDialog = () => {
    const { entitytoDelete } = this.state
    if (entitytoDelete) {
      const name = entitytoDelete.content.dataStorageConfiguration.label
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'storage.data-storage.plugins.list.confirm.title' }, { name })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  render() {
    const {
      entities, isLoading, onUpPriority, onDownPriority,
      onEdit, onDuplicate, onActivateToggle, onRefresh,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { fixedColumnsWidth } = muiTheme.components.infiniteTable

    // Table columns to display
    const columns = [
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.priority',
        formatMessage({ id: 'storage.data-storage.plugins.list.header.priority.label' }),
        'content.priority',
        undefined, undefined, undefined, 75,
      ),
      TableColumnBuilder.buildSimplePropertyColumn('column.id', formatMessage({ id: 'storage.data-storage.plugins.list.header.id.label' }), 'content.dataStorageConfiguration.id'),
      TableColumnBuilder.buildSimplePropertyColumn('column.name', formatMessage({ id: 'storage.data-storage.plugins.list.header.name.label' }), 'content.dataStorageConfiguration.label'),
      TableColumnBuilder.buildSimplePropertyColumn('column.type', formatMessage({ id: 'storage.data-storage.plugins.list.header.type.label' }), 'content.dataStorageConfiguration.pluginId'),
      TableColumnBuilder.buildSimpleColumnWithCell('column.active', formatMessage({ id: 'storage.data-storage.plugins.list.header.active.label' }), {
        Constructor: PrioritizedDataStorageActivationAction, // custom cell
        props: { onToggle: onActivateToggle },
      }),
      TableColumnBuilder.buildOptionsColumn('options', [{
        OptionConstructor: PrioritizedDataStorageEditAction,
        optionProps: { onEdit },
      },
      {
        OptionConstructor: PrioritizedDataStorageDuplicateAction,
        optionProps: { onDuplicate },
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
        OptionConstructor: TableDeleteOption,
        optionProps: {
          onDelete: this.onDelete,
          fetchPage: onRefresh,
          handleHateoas: true,
          disableInsteadOfHide: true,
          queryPageSize: 20,
        },
      },
      ], true, fixedColumnsWidth),
    ]

    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'storage.data-storage.plugins.list.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    return (
      <div>
        {this.renderDeleteConfirmDialog()}
        <TableLayout>
          <TableHeaderLineLoadingAndResults isFetching={isLoading} resultsCount={entities.length} />
          <InfiniteTableContainer
            columns={columns}
            entities={entities}
            emptyComponent={emptyComponent}
            entitiesCount={entities.length}
            minRowCount={0}
            maxRowCount={30}
          />
        </TableLayout>
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(PrioritizedDataStorageListComponent))