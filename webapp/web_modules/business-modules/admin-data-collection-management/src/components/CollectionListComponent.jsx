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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Refresh from 'mdi-material-ui/Refresh'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'

import {
  NoContentComponent,
  CardActionsComponent,
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  ShowableAtRender,
  TableColumnBuilder,
  TableLayout,
  TableHeaderLine,
  TableHeaderOptionsArea,
  TableHeaderOptionGroup,
  PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { collectionDependencies } from '@regardsoss/admin-data-collection-management'
import { i18nContextType } from '@regardsoss/i18n'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { collectionActions, collectionSelectors } from '../clients/CollectionClient'
import { tableActions } from '../clients/TableClient'
import CollectionListEditAction from './CollectionListEditAction'
import CollectionListDuplicateAction from './CollectionListDuplicateAction'
import CollectionListDeleteAction from './CollectionListDeleteAction'
import CollectionListFiltersComponent from './CollectionListFiltersComponent'
import EntityInfoDialog from './EntityInfoDialog'
import CollectionListInfoAction from './CollectionListInfoAction'
import CopyToClipBoardAction from './CopyToClipBoardAction'

const FlatButtonWithResourceDisplayControl = withResourceDisplayControl(FlatButton)

/**
 * React component to list collections.
 */
export class CollectionListComponent extends React.Component {
  static propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    navigateToCreateCollection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [collectionActions.getDependency(RequestVerbEnum.POST)]

  static PAGE_SIZE = 100

  state = {
    deleteDialogOpened: false,
    entityToDelete: null,
    entityForInfos: null,
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

  onCloseInfoDialog = () => this.showInformation(null)

  showInformation = (entity) => {
    this.setState({
      entityForInfos: entity,
    })
  }

  renderDeleteConfirmDialog = () => {
    const { intl: { formatMessage } } = this.context

    const name = this.state.entityToDelete ? this.state.entityToDelete.content.label : ' '
    const title = formatMessage(
      { id: 'collection.list.delete.message' },
      { name },
    )
    return (
      <ShowableAtRender show={this.state.deleteDialogOpened}>
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => {
            this.props.handleDelete(this.state.entityToDelete.content.id)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const {
      handleEdit, handleDuplicate, createUrl, backUrl, onRefresh, navigateToCreateCollection,
    } = this.props
    const { muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const style = {
      hoverButtonEdit: muiTheme.palette.primary1Color,
      hoverButtonDelete: muiTheme.palette.accent1Color,
      hoverButtonDuplicate: muiTheme.palette.primary3Color,
    }
    const { intl: { formatMessage } } = this.context

    const emptyContentAction = (
      <FlatButtonWithResourceDisplayControl
        resourceDependencies={collectionDependencies.addDependencies}
        label={formatMessage({ id: 'collection.no.collection.subtitle' })}
        onClick={navigateToCreateCollection}
        primary
      />
    )
    const emptyComponent = (
      <NoContentComponent
        titleKey="collection.no.collection.title"
        Icon={AddToPhotos}
        action={emptyContentAction}
      />
    )

    const columns = [
      // 1 - label column
      new TableColumnBuilder('column.label').titleHeaderCell().propertyRenderCell('content.feature.label')
        .label(formatMessage({ id: 'collection.list.table.label' }))
        .build(),
      // 2 - model column
      new TableColumnBuilder('column.model').titleHeaderCell().propertyRenderCell('content.feature.model')
        .label(formatMessage({ id: 'collection.list.table.model' }))
        .build(),
      // 3 - options
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: CollectionListInfoAction,
        optionProps: { onClick: this.showInformation, hoverColor: style.hoverButtonEdit },
      }, {
        OptionConstructor: CopyToClipBoardAction,
        optionProps: { hoverColor: style.hoverButtonEdit },
      }, { // edit
        OptionConstructor: CollectionListEditAction,
        optionProps: { handleEdit, hoverColor: style.hoverButtonEdit },
      }, { // duplicate
        OptionConstructor: CollectionListDuplicateAction,
        optionProps: {
          handleDuplicate,
          hoverColor: style.hoverButtonDuplicate,
          dependency: CollectionListComponent.DEPENDENCY,
        },
      }, { // delete
        OptionConstructor: CollectionListDeleteAction,
        optionProps: {
          openDeleteDialog: this.openDeleteDialog,
          hoverColor: style.hoverButtonDelete,
        },
      }]).build(),
    ]
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'collection.list.title' })}
          subtitle={formatMessage({ id: 'collection.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <CollectionListFiltersComponent onRefresh={onRefresh} />
            <TableHeaderLine>
              <TableHeaderOptionsArea>
                <TableHeaderOptionGroup>
                  <FlatButton
                    label={formatMessage({ id: 'collection.table.refresh.button' })}
                    icon={<Refresh />}
                    onClick={this.props.onRefresh}
                  />
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
            </TableHeaderLine>
            <PageableInfiniteTableContainer
              name="collection-management-table"
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              pageActions={collectionActions}
              pageSelectors={collectionSelectors}
              tableActions={tableActions}
              pageSize={CollectionListComponent.PAGE_SIZE}
              columns={columns}
              emptyComponent={emptyComponent}
            />
            <EntityInfoDialog
              entity={this.state.entityForInfos}
              onClose={this.onCloseInfoDialog}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={formatMessage({ id: 'collection.list.action.add' })}
            mainHateoasDependencies={CollectionListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={formatMessage({
              id: 'collection.list.action.cancel',
            })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default CollectionListComponent
