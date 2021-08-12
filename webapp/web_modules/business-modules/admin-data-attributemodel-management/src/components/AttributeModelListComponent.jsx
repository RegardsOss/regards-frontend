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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'

import { RequestVerbEnum } from '@regardsoss/store-utils'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender,
  TableLayout, InfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingSelectAllAndResults,
} from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { attributeModelActions } from '../clients/AttributeModelClient'
import AttributeModelListActionsRenderer from './AttributeModelListActionsRenderer'
import AttributeModelListFragmentRenderer from './AttributeModelListFragmentRenderer'
import AttributeModelListFiltersComponent from './AttributeModelListFiltersComponent'

/**
 * React components to list project.
 */
export class AttributeModelListComponent extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    attrModelArray: DataManagementShapes.AttributeModelArray,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [attributeModelActions.getDependency(RequestVerbEnum.POST)]

  state = {
    deleteDialogOpened: false,
    entityToDelete: null,
    nameFilter: null,
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

  onFilter = (event, value) => {
    this.setState({
      nameFilter: value,
    })
  }

  /** User callback: delete confirmed */
  onDeleteConfirmed = () => {
    const { handleDelete } = this.props
    const { entityToDelete } = this.state
    handleDelete(entityToDelete.id)
  }

  renderDeleteConfirmDialog = () => {
    const name = get(this.state, 'entityToDelete.name', '')
    const title = this.context.intl.formatMessage({ id: 'attrmodel.list.delete.title' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={this.onDeleteConfirmed}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const {
      attrModelArray, handleEdit, createUrl, backUrl, isLoading,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    const emptyComponent = (
      <NoContentComponent
        titleKey="attrmodel.list.empty.title"
        Icon={AddToPhotos}
      />
    )

    const filteredList = filter(attrModelArray, (a) => isEmpty(this.state.nameFilter) || startsWith(lowerCase(get(a, 'content.name', '')), lowerCase(this.state.nameFilter)))

    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'attrmodel.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'attrmodel.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <AttributeModelListFiltersComponent onFilter={this.onFilter} />
            <TableHeaderLineLoadingSelectAllAndResults isFetching={isLoading} resultsCount={filteredList.length} />
            <InfiniteTableContainer
              // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
              columns={[ // eslint wont fix: API issue, major rework required
                new TableColumnBuilder('column.fragment').titleHeaderCell()
                  .label(formatMessage({ id: 'attrmodel.list.table.fragment' }))
                  .rowCellDefinition({
                    Constructor: AttributeModelListFragmentRenderer,
                    props: {
                      handleEdit,
                    },
                  })
                  .build(),
                new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.name')
                  .label(formatMessage({ id: 'attrmodel.list.table.name' }))
                  .build(),
                new TableColumnBuilder('column.label').titleHeaderCell().propertyRenderCell('content.label')
                  .label(formatMessage({ id: 'attrmodel.list.table.label' }))
                  .build(),
                new TableColumnBuilder('column.description').titleHeaderCell().propertyRenderCell('content.description')
                  .label(formatMessage({ id: 'attrmodel.list.table.description' }))
                  .build(),
                new TableColumnBuilder('column.actions').titleHeaderCell()
                  .rowCellDefinition({
                    Constructor: AttributeModelListActionsRenderer,
                    props: {
                      openDeleteDialog: this.openDeleteDialog,
                      handleEdit,
                    },
                  })
                  .label(formatMessage({ id: 'attrmodel.list.table.actions' }))
                  .build(),
              ]}
              entities={filteredList}
              emptyComponent={emptyComponent}
              entitiesCount={filteredList.length}
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={
              formatMessage({ id: 'attrmodel.list.action.add' })
            }
            mainHateoasDependencies={AttributeModelListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'attrmodel.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default AttributeModelListComponent
