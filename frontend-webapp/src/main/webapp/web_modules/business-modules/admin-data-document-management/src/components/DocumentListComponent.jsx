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
import { CardActions, Card, CardTitle, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import FlatButton from 'material-ui/FlatButton'
import values from 'lodash/values'
import get from 'lodash/get'
import {
  CardActionsComponent,
  TableContainer,
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  ShowableAtRender,
  NoContentComponent,
} from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'

import { withResourceDisplayControl } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { tableActions, tableSelectors } from '../clients/TableClient'
import { documentActions, documentSelectors } from '../clients/DocumentClient'
import DocumentTableCustomCellActions from './DocumentTableCustomCellActions'

/**
 * Component to list Document
 *
 * @author Léo Mieulet
 */
class DocumentListComponent extends React.Component {

  static propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    createUrl: PropTypes.string.isRequired,
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
      entityToDelete: null,
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
   * Render the confirmation delete dialog
   * @returns {XML}
   */
  renderDeleteConfirmDialog = () => {
    const name = get(this.state.entityToDelete, 'label', ' ')
    const title = this.context.intl.formatMessage({ id: 'document.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => {
            this.props.handleDelete(this.state.entityToDelete.id)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const { intl } = this.context
    const { createUrl, backUrl, handleEdit } = this.props
    const tableConfiguration = {
      displayColumnsHeader: true,
      lineHeight: 47,
      displayCheckbox: false,
      displaySelectAll: false,
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
        label: intl.formatMessage({ id: 'document.list.table.label' }),
        // Entity attributes to display as cell in the column
        attributes: ['label'],
        // True to hide the column label in the header line of the table
        hideLabel: false,
        // Does the column is sortable
        sortable: false,
      },
      {
        label: intl.formatMessage({ id: 'document.list.table.model' }),
        attributes: ['model.name'],
      },
      {
        label: intl.formatMessage({ id: 'document.list.table.actions' }),
        attributes: [],
        customCell: {
          component: DocumentTableCustomCellActions,
          props: {
            onDelete: this.openDeleteDialog,
            onEdit: handleEdit,
            intl,
          },
        },
      },
    ]

    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'document.no.dataset.title' })}
      />
    )

    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'document.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'document.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <TableContainer
            name="documents-table"
            pageActions={documentActions}
            pageSelectors={documentSelectors}
            tableActions={tableActions}
            tableSelectors={tableSelectors}
            tableConfiguration={tableConfiguration}
            tablePaneConfiguration={tablePaneConfiguration}
            pageSize={10}
            columns={columns}
            emptyComponent={emptyComponent}
          />

          <CardActions>
            <CardActionsComponent
              mainButtonUrl={createUrl}
              mainButtonLabel={
                <FormattedMessage
                  id="document.list.action.add"
                />
              }
              mainHateoasDependencies={[documentActions.getDependency(RequestVerbEnum.POST)]}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'document.list.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </CardText>
      </Card>
    )
  }

}

export default DocumentListComponent
