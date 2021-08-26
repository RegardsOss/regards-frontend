/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import lowerCase from 'lodash/lowerCase'
import isEmpty from 'lodash/isEmpty'
import startsWith from 'lodash/startsWith'
import get from 'lodash/get'
import filter from 'lodash/filter'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'

import {
  CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender,
  TableLayout, InfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingSelectAllAndResults,
} from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { modelActions } from '../clients/ModelClient'
import ModelListFiltersComponent from './ModelListFiltersComponent'
import ModelListActionsRenderer from './ModelListActionsRenderer'

/**
 * React components to list project.
 */
export class ModelListComponent extends React.Component {
  static propTypes = {
    modelList: DataManagementShapes.ModelList,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleBindAttributes: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [modelActions.getDependency(RequestVerbEnum.POST)]

  state = {
    deleteDialogOpened: false,
    entityToDelete: null,
    nameFilter: null,
  }

  getType = (type) => {
    const { intl: { formatMessage } } = this.context

    switch (type) {
      case 'COLLECTION':
        return formatMessage({ id: 'model.type.collection' })
      case 'DOCUMENT':
        return formatMessage({ id: 'model.type.document' })
      case 'DATA':
        return formatMessage({ id: 'model.type.data' })
      case 'DATASET':
        return formatMessage({ id: 'model.type.dataset' })
      default:
        return null
    }
  }

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      entityToDelete: null,
    })
  }

  openDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDelete: entity,
    })
  }

  renderDeleteConfirmDialog = () => {
    const { intl: { formatMessage } } = this.context

    const name = this.state.entityToDelete ? this.state.entityToDelete.content.name : ' '
    const title = formatMessage({ id: 'model.list.delete.title' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => {
            this.props.handleDelete(this.state.entityToDelete.content.name)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  onFilter = (event, value) => {
    this.setState({
      nameFilter: value,
    })
  }

  render() {
    const {
      modelList, accessToken, handleEdit, handleDuplicate, createUrl, handleBindAttributes, backUrl, isLoading,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    // Table columns to display
    const columns = [
      new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.name')
        .label(formatMessage({ id: 'model.list.table.name' }))
        .build(),
      new TableColumnBuilder('column.description').titleHeaderCell().propertyRenderCell('content.description')
        .label(formatMessage({ id: 'model.list.table.description' }))
        .build(),
      new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.type')
        .label(formatMessage({ id: 'model.list.table.type' }))
        .build(),
      new TableColumnBuilder('column.actions').titleHeaderCell()
        .rowCellDefinition({
          Constructor: ModelListActionsRenderer,
          props: {
            accessToken,
            openDeleteDialog: this.openDeleteDialog,
            handleEdit,
            handleDuplicate,
            handleBindAttributes,
          },
        })
        .label(formatMessage({ id: 'model.list.table.actions' }))
        .build(),
    ]

    const emptyComponent = (
      <NoContentComponent
        titleKey="model.list.no.content.message"
        Icon={AddToPhotos}
      />
    )

    const filteredModelList = filter(modelList, (a) => isEmpty(this.state.nameFilter) || startsWith(lowerCase(get(a, 'content.name', '')), lowerCase(this.state.nameFilter)))

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'model.list.title' })}
          subtitle={formatMessage({ id: 'model.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <ModelListFiltersComponent onFilter={this.onFilter} />
            <TableHeaderLineLoadingSelectAllAndResults isFetching={isLoading} resultsCount={filteredModelList.length} />
            <InfiniteTableContainer
              columns={columns}
              entities={filteredModelList}
              emptyComponent={emptyComponent}
              entitiesCount={filteredModelList.length}
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={
              formatMessage({ id: 'model.list.action.add' })
            }
            mainHateoasDependencies={ModelListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={formatMessage({ id: 'model.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ModelListComponent
