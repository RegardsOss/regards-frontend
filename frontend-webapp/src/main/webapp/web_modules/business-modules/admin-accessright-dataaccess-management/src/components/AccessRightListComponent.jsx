/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import { FormattedMessage } from 'react-intl'
import values from 'lodash/values'
import { AccessGroup, AccessRight, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import {
  TableContainer,
  MainActionButtonComponent,
  ConfirmDialogComponent,
  ShowableAtRender,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { tableActions, tableSelectors } from '../clients/TableClient'
import { datasetActions, datasetSelectors } from '../clients/DatasetClient'
import AccessRightsMetadataAccessTableCustomCell from './AccessRightsMetadataAccessTableCustomCell'
import AccessRightsDataAccessTableCustomCell from './AccessRightsDataAccessTableCustomCell'
import AccessRightsActionsTableCustomCell from './AccessRightsActionsTableCustomCell'
import AccessRightFormComponent from './AccessRightFormComponent'

/**
 * Component to configure AccessRights for each dataset for a given AccessGroup.
 *
 * @author Sébastien Binda
 */
class AccessRightListComponent extends React.Component {

  static propTypes = {
    // Access group to configure.
    accessGroup: AccessGroup.isRequired,
    // Access rights for the given access group
    accessRights: PropTypes.objectOf(AccessRight),
    // Availables plugin configuration for custom access rights delegated to plugins
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration).isRequired,
    // Availables plugin definitions for custom access rights delegated to plugins
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData).isRequired,
    // Callback to delete an AccessRight
    deleteAccessRight: PropTypes.func.isRequired,
    // Callback to submit AccessRight(s) configuration (updates and creation)
    submitAccessRights: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    selectedDatasets: PropTypes.objectOf(PropTypes.object).isRequired,
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
      this.props.submitAccessRights(values(this.props.selectedDatasets), accessRightValues).then(this.handleSubmitResult)
    }
  }

  /**
   * Render the dialog containing the AccessRight Configuration form.
   */
  renderAccessRightFormDialog = () => (
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
          selectedDatasets={this.state.datasetAccessRightToEdit ? [this.state.datasetAccessRightToEdit] : values(this.props.selectedDatasets)}
          currentAccessRight={this.state.accessRightToEdit}
          pluginConfigurationList={this.props.pluginConfigurationList}
          pluginMetaDataList={this.props.pluginMetaDataList}
        />
      </Dialog>
    </ShowableAtRender>
  )

  /**
   * Render the confirmation delete dialog
   * @returns {XML}
   */
  renderDeleteConfirmDialog = () => {
    const name = this.state.entityToDelete ? this.state.entityToDelete.dataset.label : ' '
    const title = this.context.intl.formatMessage({ id: 'accessright.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponent.dialogTypes.DELETE}
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
    const tableConfiguration = {
      displayColumnsHeader: true,
      lineHeight: 47,
      displayCheckbox: true,
      onSortByColumn: () => {
      },
    }

    // TableConfiguration
    const tablePaneConfiguration = {
      // adds tabs buttons to results table
      resultsTabsButtons: [],
      // shows a custom table header area instand of results count, just above columns
      customTableHeaderArea: undefined,
      // should show parameters button?
      showParameters: false,
      // Display table header toolbar ?
      displayTableHeader: false,
      // adds custom table options on tabs bar right side
      customTableOptions: [],
      // adds table context actions on tabs bar center
      contextOptions: [],
      // Table advanced options, displayed as children in 'Plus' Menu
      advancedOptions: [],
    }

    // Table columns to display
    const columns = [
      {
        // Label of the column
        label: this.context.intl.formatMessage({ id: 'accessright.table.dataset.label' }),
        // Entity attributes to display as cell in the column
        attributes: ['label'],
        // True to hide the column label in the header line of the table
        hideLabel: false,
        // Does the column is sortable
        sortable: false,
      },
      {
        label: this.context.intl.formatMessage({ id: 'accessright.form.meta.accessLevel' }),
        attributes: ['label', 'id'],
        customCell: {
          component: AccessRightsMetadataAccessTableCustomCell,
          props: {
            intl: this.context.intl,
            accessRights: this.props.accessRights,
          },
        },
      },
      {
        label: this.context.intl.formatMessage({ id: 'accessright.form.data.accessLevel' }),
        attributes: ['label', 'id'],
        customCell: {
          component: AccessRightsDataAccessTableCustomCell,
          props: {
            intl: this.context.intl,
            accessRights: this.props.accessRights,
          },
        },
      },
      {
        label: this.context.intl.formatMessage({ id: 'accessright.table.actions' }),
        attributes: ['label', 'id'],
        customCell: {
          component: AccessRightsActionsTableCustomCell,
          props: {
            accessRights: this.props.accessRights,
            onDelete: this.openDeleteDialog,
            onEdit: this.openEditDialog,
            intl: this.context.intl,
          },
        },
      },
    ]

    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="accessright.title" values={{ name: this.props.accessGroup.content.name }} />}
          subtitle={<FormattedMessage id="accessright.subtitle" values={{ name: this.props.accessGroup.content.name }} />}
        />
        <CardText>
          {this.renderAccessRightFormDialog()}
          {this.renderDeleteConfirmDialog()}
          <MainActionButtonComponent
            disabled={values(this.props.selectedDatasets).length === 0}
            label={this.context.intl.formatMessage({ id: 'accessright.edit.multiples.button.label' })}
            onTouchTap={() => this.openEditDialog()}
          />
          <TableContainer
            name="access-rights-datasets-table"
            pageActions={datasetActions}
            pageSelectors={datasetSelectors}
            tableActions={tableActions}
            tableSelectors={tableSelectors}
            tableConfiguration={tableConfiguration}
            tablePaneConfiguration={tablePaneConfiguration}
            pageSize={10}
            columns={columns}
          />
        </CardText>
      </Card>

    )
  }

}

export default AccessRightListComponent
