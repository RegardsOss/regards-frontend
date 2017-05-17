import { Card, CardTitle, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import { FormattedMessage } from 'react-intl'
import { AccessGroup, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import {
  TableContainer,
  MainActionButtonComponent,
  ConfirmDialogComponent,
  ShowableAtRender,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import DatasetActions from '../model/DatasetActions'
import DatasetSelectors from '../model/DatasetSelectors'
import AccessRightsMetadataAccessTableCustomCell from './AccessRightsMetadataAccessTableCustomCell'
import AccessRightsDataAccessTableCustomCell from './AccessRightsDataAccessTableCustomCell'
import AccessRightsActionsTableCustomCell from './AccessRightsActionsTableCustomCell'
import AccessRightFormComponent from './AccessRightFormComponent'

class AccessRightListComponent extends React.Component {

  static propTypes = {
    accessGroup: AccessGroup.isRequired,
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration).isRequired,
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData).isRequired,
    deleteAccessRight: PropTypes.func.isRequired,
    submitAccessRights: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      deleteDialogOpened: false,
      editAccessDialogOpened: false,
      accessRightToEdit: null,
      datasetAccessRightToEdit: null,
      selectedDatasets: [],
    }
  }

  setSelectedDataset = (selected) => {
    this.setState({
      selectedDatasets: selected,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      entityToDelete: null,
    })
  }

  closeEditDialog = () => {
    this.setState({
      editAccessDialogOpened: false,
      accessRightToEdit: null,
      datasetAccessRightToEdit: null,
    })
  }

  openDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDelete: entity,
    })
  }

  openEditDialog = (accessRight, dataset) => {
    this.setState({
      editAccessDialogOpened: true,
      accessRightToEdit: accessRight,
      datasetAccessRightToEdit: dataset,
    })
  }

  /**
   * Submit access rights modification for all selected datasets
   * @param values
   */
  handleSubmitAccessRights = (values) => {
    this.props.submitAccessRights(this.state.selectedDatasets, values)
  }

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
            // If a unique accessright is in edition only submit the one. Else, submit for all selected datasets
          selectedDatasets={this.state.datasetAccessRightToEdit ? [this.state.datasetAccessRightToEdit] : this.state.selectedDatasets}
          currentAccessRight={this.state.accessRightToEdit}
          pluginConfigurationList={this.props.pluginConfigurationList}
          pluginMetaDataList={this.props.pluginMetaDataList}
        />
      </Dialog>
    </ShowableAtRender>
    )

  renderDeleteConfirmDialog = () => {
    const name = this.state.entityToDelete ? this.state.entityToDelete.dataSet.label : ' '
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
            accessGroup: this.props.accessGroup,
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
            accessGroup: this.props.accessGroup,
          },
        },
      },
      {
        label: this.context.intl.formatMessage({ id: 'accessright.table.actions' }),
        attributes: ['label', 'id'],
        customCell: {
          component: AccessRightsActionsTableCustomCell,
          props: {
            accessGroup: this.props.accessGroup,
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
          subtitle={<FormattedMessage id="accessright.subtitle" />}
        />
        <CardText>
          {this.renderAccessRightFormDialog()}
          {this.renderDeleteConfirmDialog()}
          <MainActionButtonComponent
            label={<FormattedMessage id="accessright.edit.multiples.button.label" />}
            disabled={this.state.selectedDatasets.length === 0}
            onTouchTap={() => this.openEditDialog()}
          />
          <TableContainer
            name="access-rights-datasets-table"
            PageActions={DatasetActions}
            PageSelector={DatasetSelectors}
            tableConfiguration={tableConfiguration}
            tablePaneConfiguration={tablePaneConfiguration}
            pageSize={10}
            columns={columns}
            onSelectionChange={(mode, selecteEntities) => {
              this.setSelectedDataset(selecteEntities)
            }}
          />
        </CardText>
      </Card>

    )
  }

}

export default AccessRightListComponent
