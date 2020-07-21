/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
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
  PageableInfiniteTableContainer,
  TableHeaderLine,
  TableHeaderOptionsArea,
  TableHeaderOptionGroup,
} from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { datasetDependencies } from '@regardsoss/admin-data-dataset-management'
import { datasetActions, datasetSelectors } from '../clients/DatasetClient'
import { tableActions } from '../clients/TableClient'
import DatasetListEditAction from './DatasetListEditAction'
import DatasetListDeleteAction from './DatasetListDeleteAction'
import DatasetListInfoAction from './DatasetListInfoAction'
import DatasetListFiltersComponent from './DatasetListFiltersComponent'
import EntityInfoDialog from './EntityInfoDialog'
import CopyToClipBoardAction from './CopyToClipBoardAction'

const FlatButtonWithResourceDisplayControl = withResourceDisplayControl(FlatButton)

/**
 * React component to list datasets.
 */
export class DatasetListComponent extends React.Component {
  static propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    onRefresh: PropTypes.func.isRequired,
    navigateToCreateDataset: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [datasetActions.getDependency(RequestVerbEnum.POST)]

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
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.name : ' '
    const title = this.context.intl.formatMessage({ id: 'dataset.list.delete.title' }, { name })
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
      handleEdit, createUrl, backUrl, onRefresh, navigateToCreateDataset,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const style = {
      hoverButtonEdit: muiTheme.palette.primary1Color,
      hoverButtonDelete: muiTheme.palette.accent1Color,
    }

    const emptyContentAction = (
      <FlatButtonWithResourceDisplayControl
        resourceDependencies={datasetDependencies.addDependencies}
        label={formatMessage({ id: 'dataset.no.dataset.subtitle' })}
        onClick={navigateToCreateDataset}
        primary
      />
    )
    const emptyComponent = (
      <NoContentComponent
        titleKey="dataset.no.dataset.title"
        Icon={AddToPhotos}
        action={emptyContentAction}
      />
    )

    const columns = [
      // 1 - label column
      new TableColumnBuilder('column.label').titleHeaderCell().propertyRenderCell('content.feature.label')
        .label(formatMessage({ id: 'dataset.list.table.label' }))
        .build(),
      // 2 - model column
      new TableColumnBuilder('column.model').titleHeaderCell().propertyRenderCell('content.feature.model')
        .label(formatMessage({ id: 'dataset.list.table.model' }))
        .build(),
      // 3 - options
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: DatasetListInfoAction,
        optionProps: { onClick: this.showInformation, hoverColor: style.hoverButtonEdit },
      }, {
        OptionConstructor: CopyToClipBoardAction,
        optionProps: { hoverColor: style.hoverButtonEdit },
      }, {
        OptionConstructor: DatasetListEditAction,
        optionProps: { handleEdit, hoverColor: style.hoverButtonEdit },
      },
      {
        OptionConstructor: DatasetListDeleteAction,
        optionProps: {
          openDeleteDialog: this.openDeleteDialog,
          hoverColor: style.hoverButtonDelete,
        },
      },
      ]).build(),
    ]

    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'dataset.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'dataset.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <DatasetListFiltersComponent onRefresh={onRefresh} />
            <TableHeaderLine>
              <TableHeaderOptionsArea>
                <TableHeaderOptionGroup>
                  <FlatButton
                    label={formatMessage({ id: 'dataset.table.refresh.button' })}
                    icon={<Refresh />}
                    onClick={this.props.onRefresh}
                  />
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
            </TableHeaderLine>
            <PageableInfiniteTableContainer
              name="dataset-management-table"
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              pageActions={datasetActions}
              pageSelectors={datasetSelectors}
              tableActions={tableActions}
              pageSize={DatasetListComponent.PAGE_SIZE}
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
            mainButtonLabel={<FormattedMessage id="dataset.list.action.add" />}
            mainHateoasDependencies={DatasetListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={this.context.intl.formatMessage({
              id: 'dataset.list.action.cancel',
            })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetListComponent
