/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import { FormattedMessage } from 'react-intl'
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
import { CollectionListContainer } from '../containers/CollectionListContainer'

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

  state = {
    deleteDialogOpened: false,
    entityToDelete: null,
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
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.label : ' '
    const title = this.context.intl.formatMessage(
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
    const { fixedColumnsWidth } = this.context.muiTheme.components.infiniteTable
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }
    const { intl } = this.context

    const emptyContentAction = (
      <FlatButtonWithResourceDisplayControl
        resourceDependencies={collectionDependencies.addDependencies}
        label={intl.formatMessage({ id: 'collection.no.collection.subtitle' })}
        onClick={navigateToCreateCollection}
        primary
      />
    )
    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'collection.no.collection.title' })}
        Icon={AddToPhotos}
        action={emptyContentAction}
      />
    )

    const columns = [
      // 1 - label column
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.label',
        intl.formatMessage({ id: 'collection.list.table.label' }),
        'content.label',
      ),
      // 2 - model column
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.model',
        intl.formatMessage({ id: 'collection.list.table.model' }),
        'content.model.name',
      ),
      TableColumnBuilder.buildOptionsColumn(
        '',
        [
          {
            OptionConstructor: CollectionListEditAction,
            optionProps: { handleEdit, hoverColor: style.hoverButtonEdit },
          },
          {
            OptionConstructor: CollectionListDuplicateAction,
            optionProps: {
              handleDuplicate,
              hoverColor: style.hoverButtonDuplicate,
              dependency: CollectionListComponent.DEPENDENCY,
            },
          },
          {
            OptionConstructor: CollectionListDeleteAction,
            optionProps: {
              openDeleteDialog: this.openDeleteDialog,
              hoverColor: style.hoverButtonDelete,
            },
          },
        ],
        true,
        fixedColumnsWidth,
      ),
    ]
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'collection.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'collection.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <CollectionListFiltersComponent onRefresh={onRefresh} />
            <TableHeaderLine>
              <TableHeaderOptionsArea>
                <TableHeaderOptionGroup>
                  <FlatButton
                    label={intl.formatMessage({ id: 'collection.table.refresh.button' })}
                    icon={<Refresh />}
                    onClick={this.props.onRefresh}
                  />
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
            </TableHeaderLine>
            <PageableInfiniteTableContainer
              name="collection-management-table"
              minRowCount={0}
              pageActions={collectionActions}
              pageSelectors={collectionSelectors}
              tableActions={tableActions}
              pageSize={CollectionListContainer.PAGE_SIZE}
              columns={columns}
              emptyComponent={emptyComponent}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={<FormattedMessage id="collection.list.action.add" />}
            mainHateoasDependencies={CollectionListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={this.context.intl.formatMessage({
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
