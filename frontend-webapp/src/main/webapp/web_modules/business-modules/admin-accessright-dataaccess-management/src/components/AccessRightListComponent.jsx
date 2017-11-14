/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import FlatButton from 'material-ui/FlatButton'
import values from 'lodash/values'
import get from 'lodash/get'
import { datasetDependencies } from '@regardsoss/admin-data-dataset-management'
import {
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  MainActionButtonComponent,
  NoContentComponent,
  PageableInfiniteTableContainer,
  ShowableAtRender,
  TableColumnBuilder,
  TableLayout,
} from '@regardsoss/components'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { tableActions, tableSelectors } from '../clients/TableClient'
import { datasetActions, datasetSelectors } from '../clients/DatasetClient'
import AccessRightsMetadataAccessTableCustomCell from './AccessRightsMetadataAccessTableCustomCell'
import AccessRightsDataAccessTableCustomCell from './AccessRightsDataAccessTableCustomCell'
import AccessRightsTableEditAction from './AccessRightsTableEditAction'
import AccessRightsTableDeleteAction from './AccessRightsTableDeleteAction'
import AccessRightFormComponent from './AccessRightFormComponent'

const FlatButtonWithResourceDisplayControl = withResourceDisplayControl(FlatButton)

/**
 * Component to configure AccessRights for each dataset for a given AccessGroup.
 *
 * @author Sébastien Binda
 */
class AccessRightListComponent extends React.Component {

  static propTypes = {
    // Access group to configure.
    accessGroup: DataManagementShapes.AccessGroup.isRequired,
    // Access rights for the given access group
    accessRights: DataManagementShapes.AccessRightList,
    // Availables plugin configuration for custom access rights delegated to plugins
    pluginConfigurationList: CommonShapes.PluginConfigurationList.isRequired,
    // Availables plugin definitions for custom access rights delegated to plugins
    pluginMetaDataList: CommonShapes.PluginMetaDataList.isRequired,
    // Callback to delete an AccessRight
    deleteAccessRight: PropTypes.func.isRequired,
    // Callback to submit AccessRight(s) configuration (updates and creation)
    submitAccessRights: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    selectedDatasets: PropTypes.objectOf(PropTypes.object).isRequired,
    // Callback to navigate to dataset creation
    navigateToCreateDataset: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
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
    }
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
      entityToDelete: entity.content,
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
      this.props.submitAccessRights(values(this.props.selectedDatasets), accessRightValues).then(this.handleSubmitResult)
    }
  }

  /**
   * Render the dialog containing the AccessRight Configuration form.
   */
  renderAccessRightFormDialog = () => {
    const selectedDatasets = this.state.datasetAccessRightToEdit ? [this.state.datasetAccessRightToEdit] : values(this.props.selectedDatasets)
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
            // If a unique accessright is in edition only submit the one. Else, submit for all selected datasets
            selectedDatasets={selectedDatasets}
            currentAccessRight={this.state.accessRightToEdit}
            pluginConfigurationList={this.props.pluginConfigurationList}
            pluginMetaDataList={this.props.pluginMetaDataList}
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
          onConfirm={() => {
            this.props.deleteAccessRight(this.state.entityToDelete)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const { accessRights, accessGroup, navigateToCreateDataset, selectedDatasets } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth

    // Table columns to display
    const columns = [
      // 1 - selection column
      TableColumnBuilder.buildSelectionColumn('', false, datasetSelectors, tableActions, tableSelectors, true, fixedColumnWidth),
      // 2 - label column
      TableColumnBuilder.buildSimplePropertyColumn('column.label', formatMessage({ id: 'accessright.table.dataset.label' }), 'content.label'),
      // 3 - Meta access level column
      TableColumnBuilder.buildSimpleColumnWithCell('column.meta.access.level', formatMessage({ id: 'accessright.form.meta.accessLevel' }), {
        Constructor: AccessRightsMetadataAccessTableCustomCell, // custom cell
        props: { accessRights },
      }),
      // 4 - Data access level
      TableColumnBuilder.buildSimpleColumnWithCell('column.data.access.level', formatMessage({ id: 'accessright.form.data.accessLevel' }), {
        Constructor: AccessRightsDataAccessTableCustomCell, // custom cell
        props: { accessRights },
      }),
      // 5 - Options
      TableColumnBuilder.buildOptionsColumn('', [{
        OptionConstructor: AccessRightsTableEditAction,
        optionProps: { accessRights, onEdit: this.openEditDialog },
      }, {
        OptionConstructor: AccessRightsTableDeleteAction,
        optionProps: { accessRights, onDelete: this.openDeleteDialog },
      }], true, fixedColumnWidth),
    ]

    const emptyContentAction = (
      <FlatButtonWithResourceDisplayControl
        resourceDependencies={datasetDependencies.addDependencies}
        label={formatMessage({ id: 'accessright.no.dataset.subtitle' })}
        onTouchTap={navigateToCreateDataset}
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

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'accessright.title' }, { name: accessGroup.content.name })}
          subtitle={formatMessage({ id: 'accessright.subtitle' }, { name: accessGroup.content.name })}
        />
        <CardText>
          {this.renderAccessRightFormDialog()}
          {this.renderDeleteConfirmDialog()}
          <MainActionButtonComponent
            disabled={values(selectedDatasets).length === 0}
            label={formatMessage({ id: 'accessright.edit.multiples.button.label' })}
            onTouchTap={() => this.openEditDialog()}
          />
          <TableLayout>
            <PageableInfiniteTableContainer
              name="access-rights-datasets-table"
              pageActions={datasetActions}
              pageSelectors={datasetSelectors}
              tableActions={tableActions}
              pageSize={10}
              columns={columns}
              emptyComponent={emptyComponent}
              displayColumnsHeader
            />
          </TableLayout>
        </CardText>
      </Card>
    )
  }

}

export default AccessRightListComponent
