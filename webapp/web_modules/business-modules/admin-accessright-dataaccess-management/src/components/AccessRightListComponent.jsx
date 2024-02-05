/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import Refresh from 'mdi-material-ui/Refresh'
import Edit from 'mdi-material-ui/Pencil'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import FlatButton from 'material-ui/FlatButton'
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
    // eslint-disable-next-line react/forbid-prop-types
    selectedDatasetsWithAccessright: PropTypes.arrayOf(PropTypes.object).isRequired,
    // Callback to navigate to dataset creation
    navigateToCreateDataset: PropTypes.func.isRequired,
    backURL: PropTypes.string.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static PAGE_SIZE = 10

  state = {
    // Edit dialog management
    editAccessDialogOpened: false,
    datasetAccessRightsToEdit: null, // Array of access rights to edit

    // Delete dialog management
    deleteDialogOpened: false,
    entityToDelete: null,

    // common: submission error
    submitError: false,
  }

  /**
    * Lifecycle method: component will mount. Used here to detect first properties change and update local state
    */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (!isEqual(oldProps.accessGroup, newProps.accessGroup)) {
      this.setState({
        pathParams: {
          accessGroupName: newProps.accessGroup.name,
        },
      })
    }
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
      datasetAccessRightsToEdit: null,
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
   * @param {*} dataset to edit, matching Data
   */
  openEditDialog = (dataset) => {
    this.setState({
      editAccessDialogOpened: true,
      datasetAccessRightsToEdit: dataset ? [dataset] : this.props.selectedDatasetsWithAccessright,
    })
  }

  /**
   * Callback: opens edit dialog for current selection
   */
  openEditSelectionDialog = () => this.openEditDialog()

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
   * Submit access rights
   * @param {[*]} datasetAccessRightsToEdit edited dataset access rights array, each element matching DataManagementShapes.DatasetWithAccessRight shape
   * @param {*} accessRightValues edited access rights values, from corresponding form
   */
  handleSubmitAccessRights = (datasetAccessRightsToEdit, accessRightValues) => this.props.submitAccessRights(datasetAccessRightsToEdit, accessRightValues)
    .then(this.handleSubmitResult)

  /**
   * Render the dialog containing the AccessRight Configuration form
   * @return {React.ReactElement} render element
   */
  renderAccessRightFormDialog = () => {
    const { editAccessDialogOpened, datasetAccessRightsToEdit } = this.state
    return (
      <ShowableAtRender
        show={editAccessDialogOpened}
      >
        <Dialog
          title={this.context.intl.formatMessage({ id: 'accessright.form.title' })}
          modal
          open={this.state.editAccessDialogOpened}
          onrequestclose={this.closeEditDialog}
          autoScrollBodyContent
        >
          <AccessRightFormComponent
            datasetAccessRightsToEdit={datasetAccessRightsToEdit}
            onCancel={this.closeEditDialog}
            onSubmit={this.handleSubmitAccessRights}
            isSubmitting={this.props.isSubmitting}
            errorMessage={this.state.submitError ? this.context.intl.formatMessage({ id: 'accessright.form.error.message' }) : null}
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
          onClick={this.openEditSelectionDialog}
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
    const { pathParams } = this.state
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
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
        titleKey="accessright.no.dataset.title"
        Icon={AddToPhotos}
        action={emptyContentAction}
      />
    )

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
              // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
              columns={[ // eslint wont fix: API rework required
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
              ]}
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
                formatMessage({ id: 'accessright.form.action.back' })
              }
            />
          </CardActions>
        </CardText>
      </Card>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(AccessRightListComponent))
