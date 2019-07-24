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
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import FlatButton from 'material-ui/FlatButton'
import values from 'lodash/values'
import get from 'lodash/get'
import { datasetDependencies } from '@regardsoss/admin-data-dataset-management'
import {
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  NoContentComponent,
  TableColumnBuilder, TableHeaderLine, TableLayout, TableHeaderOptionsArea, TableHeaderOptionGroup, TableHeaderLoadingComponent,
  PageableInfiniteTableContainer,
  ShowableAtRender,
  CardActionsComponent,
} from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { tableActions, tableSelectors } from '../clients/TableClient'
import { datasetWithAccessRightActions, datasetWithAccessRightSelectors } from '../clients/DatasetWithAccessRightClient'
import AccessRightsMetadataAccessTableCustomCell from './AccessRightsMetadataAccessTableCustomCell'
import AccessRightsDataAccessTableCustomCell from './AccessRightsDataAccessTableCustomCell'
import AccessRightsTableEditAction from './AccessRightsTableEditAction'
import AccessRightsTableDeleteAction from './AccessRightsTableDeleteAction'
import AccessRightFormComponent from './AccessRightFormComponent'
import AccessRightListFiltersComponent from './AccessRightListFiltersComponent'
import messages from '../i18n'
import styles from '../styles'

const FlatButtonWithResourceDisplayControl = withResourceDisplayControl(FlatButton)

/**
 * Component to configure AccessRights for each dataset for a given AccessGroup.
 *
 * @author Sébastien Binda
 */
export class AccessRightListComponent extends React.Component {
  static propTypes = {
    // Access group to configure.
    accessGroup: DataManagementShapes.AccessGroupContent.isRequired,
    // Callback to delete an AccessRight
    deleteAccessRight: PropTypes.func.isRequired,
    // Callback to submit AccessRight(s) configuration (updates and creation)
    submitAccessRights: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    filters: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    selectedDatasetsWithAccessright: PropTypes.arrayOf(PropTypes.object).isRequired,
    // Callback to navigate to dataset creation
    navigateToCreateDataset: PropTypes.func.isRequired,
    backURL: PropTypes.string.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static PAGE_SIZE = 10

  state = {
    // Define if the confirm delete dialog is opened
    deleteDialogOpened: false,
    // Define it the AccessRight configuration dialog is opened
    editAccessDialogOpened: false,
    // Set the AccessRight to edit into the AccessRight configuration dialog.
    // If this accessRight is not set, then the AccessRight configuration dialog configure
    // access for multiples accessRights at a time and the selectedDatasets is used to define which ones.
    accessRightToEdit: null,
    // Set to define a new AccessRight for the given dataset into the AccessRight configuration dialog.
    datasetAccessRightToEdit: null,
    submitError: false,
    entityToDelete: null,
  }


  onDelete = () => {
    this.props.deleteAccessRight(this.state.entityToDelete)
  }

  /**
   * Callback to close the confirm delete dialog.
   */
  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      entityToDelete: null,
    })
  }

  /**
   * Callback to close the AccessRight configuration dialog.
   */
  closeEditDialog = () => {
    this.setState({
      editAccessDialogOpened: false,
      accessRightToEdit: null,
      datasetAccessRightToEdit: null,
      submitError: false,
    })
  }

  /**
   * Callback to open the delete confirmation dialog.
   * @param entity Dataset to delete.
   */
  openDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDelete: entity,
    })
  }

  /**
   * Callback to open the AccessRight configuration dialog.
   * If an AccessRight is given, then the edition is set for an existing AccessRight
   * If a dataset is given, then the edition is set to create a new AccessRight for the given dataset.
   *
   * @param accessRight Entity to edit
   * @param dataset Entity to edit.
   */
  openEditDialog = (accessRight, dataset) => {
    this.setState({
      editAccessDialogOpened: true,
      accessRightToEdit: accessRight,
      datasetAccessRightToEdit: dataset,
    })
  }

  handleSubmitResult = (result) => {
    if (!result.error) {
      this.closeEditDialog()
    } else {
      this.setState({
        submitError: true,
      })
    }
  }

  /**
   * Submit access rights modification for all selected datasets with the given accessRightValues
   *
   * @param accessRightValues
   */
  handleSubmitAccessRights = (accessRightValues) => {
    if (this.state.datasetAccessRightToEdit) {
      // Only one accessRight to submit for the given dataset
      this.props.submitAccessRights([this.state.datasetAccessRightToEdit], accessRightValues).then(this.handleSubmitResult)
    } else {
      // Many accessRight to submit. One for each selected datasets.
      this.props.submitAccessRights(values(this.props.selectedDatasetsWithAccessright), accessRightValues).then(this.handleSubmitResult)
    }
  }

  /**
   * Render the dialog containing the AccessRight Configuration form.
   */
  renderAccessRightFormDialog = () => {
    const selectedDatasetsWithAccessright = this.state.datasetAccessRightToEdit ? [this.state.datasetAccessRightToEdit] : values(this.props.selectedDatasetsWithAccessright)
    return (
      <ShowableAtRender
        show={this.state.editAccessDialogOpened}
      >
        <Dialog
          title={this.context.intl.formatMessage({ id: 'accessright.form.title' })}
          modal
          open={this.state.editAccessDialogOpened}
          onrequestclose={this.closeEditDialog}
          autoScrollBodyContent
        >
          <AccessRightFormComponent
            onCancel={this.closeEditDialog}
            onSubmit={this.handleSubmitAccessRights}
            errorMessage={this.state.submitError ? this.context.intl.formatMessage({ id: 'accessright.form.error.message' }) : null}
            selectedDatasetsWithAccessright={selectedDatasetsWithAccessright}
            currentAccessRight={this.state.accessRightToEdit}
          />
        </Dialog>
      </ShowableAtRender>
    )
  }

  /**
   * Render the confirmation delete dialog
   * @returns {XML}
   */
  renderDeleteConfirmDialog = () => {
    const name = get(this.state.entityToDelete, 'dataset.label', ' ')
    const title = this.context.intl.formatMessage({ id: 'accessright.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={this.onDelete}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  renderActionsLine = () => {
    const { selectedDatasetsWithAccessright, isFetching } = this.props
    const { intl: { formatMessage } } = this.context
    let configureButton = null
    if (selectedDatasetsWithAccessright && selectedDatasetsWithAccessright.length > 0) {
      configureButton = (
        <FlatButton
          icon={<Edit />}
          disabled={values(selectedDatasetsWithAccessright).length === 0}
          label={formatMessage({ id: 'accessright.edit.multiples.button.label' })}
          onClick={() => this.openEditDialog()}
        />
      )
    }
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea>
          {configureButton}
        </TableHeaderOptionsArea>
        <TableHeaderLoadingComponent loading={isFetching} />
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
            <FlatButton
              label={this.context.intl.formatMessage({ id: 'accessright.table.refresh.button' })}
              icon={<Refresh />}
              onClick={this.props.onRefresh}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }

  render() {
    const {
      accessGroup, navigateToCreateDataset, backURL, filters,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    // Table columns to display
    const columns = [
      // 1 - selection column
      new TableColumnBuilder().selectionColumn(false, datasetWithAccessRightSelectors, tableActions, tableSelectors).build(),
      // 2 - label column
      new TableColumnBuilder('column.label').titleHeaderCell().propertyRenderCell('content.dataset.feature.label')
        .label(formatMessage({ id: 'accessright.table.dataset.label' }))
        .build(),
      // 3 - Meta access level column
      new TableColumnBuilder('column.meta.access.level').titleHeaderCell()
        .label(formatMessage({ id: 'accessright.form.meta.accessLevel' })).rowCellDefinition({
          Constructor: AccessRightsMetadataAccessTableCustomCell, // custom cell
        })
        .build(),
      // 4 - Data access level
      new TableColumnBuilder('column.data.access.level').titleHeaderCell()
        .label(formatMessage({ id: 'accessright.form.data.accessLevel' }))
        .rowCellDefinition({
          Constructor: AccessRightsDataAccessTableCustomCell, // custom cell
        })
        .build(),
      // 5 - Options
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: AccessRightsTableEditAction,
        optionProps: { onEdit: this.openEditDialog },
      }, {
        OptionConstructor: AccessRightsTableDeleteAction,
        optionProps: { onDelete: this.openDeleteDialog },
      }]).build(),
    ]

    const emptyContentAction = (
      <FlatButtonWithResourceDisplayControl
        resourceDependencies={datasetDependencies.addDependencies}
        label={formatMessage({ id: 'accessright.no.dataset.subtitle' })}
        onClick={navigateToCreateDataset}
        primary
      />
    )
    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'accessright.no.dataset.title' })}
        Icon={AddToPhotos}
        action={emptyContentAction}
      />
    )

    const pathParams = {
      accessGroupName: this.props.accessGroup.name,
    }

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'accessright.title' }, { name: accessGroup.name })}
          subtitle={formatMessage({ id: 'accessright.subtitle' }, { name: accessGroup.name })}
        />
        <CardText>
          {this.renderAccessRightFormDialog()}
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <AccessRightListFiltersComponent
              onFilter={this.props.onFilter}
            />
            {this.renderActionsLine()}
            <PageableInfiniteTableContainer
              name="access-rights-datasets-table"
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              pageActions={datasetWithAccessRightActions}
              pageSelectors={datasetWithAccessRightSelectors}
              tableActions={tableActions}
              pageSize={AccessRightListComponent.PAGE_SIZE}
              columns={columns}
              pathParams={pathParams}
              requestParams={filters}
              emptyComponent={emptyComponent}
              displayColumnsHeader
            />
          </TableLayout>

          <CardActions>
            <CardActionsComponent
              mainButtonUrl={backURL}
              mainButtonLabel={
                <FormattedMessage
                  id="accessright.form.action.back"
                />
              }
            />
          </CardActions>
        </CardText>
      </Card>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(AccessRightListComponent))
