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
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  TableLayout, InfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingAndResults, TableDeleteOption, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, CardActionsComponent, ShowableAtRender,
} from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { datasourceActions } from '../clients/DatasourceClient'
import DatasourceListEditAction from './DatasourceListEditAction'
import DatasourceListActivationAction from './DatasourceListActivationAction'

/**
 * React component to list datasources.
 */
export default class DatasourceListComponent extends React.Component {
  static CREATE_DEPENDENCIES = [datasourceActions.getDependency(RequestVerbEnum.POST)]

  static propTypes = {
    datasourceList: PropTypes.arrayOf(DataManagementShapes.Datasource),
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    refreshDatasourceList: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    onToggleState: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

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
    const title = this.context.intl.formatMessage({ id: 'datasource.list.delete.title' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
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
      datasourceList, onToggleState, handleEdit, createUrl, backUrl, refreshDatasourceList,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { fixedColumnsWidth } = muiTheme.components.infiniteTable

    // Table columns to display
    const columns = [
      TableColumnBuilder.buildSimplePropertyColumn('column.name', formatMessage({ id: 'datasource.list.table.label' }), 'content.label'),
      TableColumnBuilder.buildSimpleColumnWithCell('column.active', formatMessage({ id: 'datasource.list.table.active' }), {
        Constructor: DatasourceListActivationAction, // custom cell
        props: { onToggle: onToggleState },
      }),
      TableColumnBuilder.buildOptionsColumn('options', [{
        OptionConstructor: DatasourceListEditAction,
        optionProps: { handleEdit },
      },
      {
        OptionConstructor: TableDeleteOption,
        optionProps: {
          onDelete: this.openDeleteDialog,
          fetchPage: refreshDatasourceList,
          handleHateoas: true,
          disableInsteadOfHide: true,
          queryPageSize: 20,
        },
      },
      ], true, fixedColumnsWidth),
    ]

    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'datasource.list.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'datasource.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'datasource.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <TableHeaderLineLoadingAndResults resultsCount={datasourceList.length} />
            <InfiniteTableContainer
              columns={columns}
              entities={datasourceList}
              emptyComponent={emptyComponent}
              entitiesCount={datasourceList.length}
              minRowCount={0}
              maxRowCount={30}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={
              <FormattedMessage
                id="datasource.list.action.add"
              />
            }
            mainHateoasDependencies={DatasourceListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'datasource.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}
