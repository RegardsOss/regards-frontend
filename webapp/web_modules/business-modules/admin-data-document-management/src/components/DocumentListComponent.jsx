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
import {
  CardActions, Card, CardTitle, CardText,
} from 'material-ui/Card'
import get from 'lodash/get'
import {
  CardActionsComponent,
  PageableInfiniteTableContainer,
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  ShowableAtRender,
  NoContentComponent,
  TableLayout,
  TableColumnBuilder,
} from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { tableActions } from '../clients/TableClient'
import { documentActions, documentSelectors } from '../clients/DocumentClient'
import EditDocumentTableAction from './EditDocumentTableAction'
import DeleteDocumentTableAction from './DeleteDocumentTableAction'
import CopyToClipBoardAction from './CopyToClipBoardAction'
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

  static CREATE_DEPENDENCIES = [documentActions.getDependency(RequestVerbEnum.POST)]

  static PAGE_SIZE = 10

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
   * @param entity Document to delete.
   */
  openDeleteDialog = (entity, rowIndex, pageSize) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDelete: entity.content,
      entityDeletePayload: {
        rowIndex, pageSize,
      },
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
            this.props.handleDelete(this.state.entityToDelete.id, this.state.entityDeletePayload)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }


  render() {
    const { intl, muiTheme } = this.context
    const { createUrl, backUrl, handleEdit } = this.props
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    const style = {
      hoverButtonEdit: muiTheme.palette.primary1Color,
      hoverButtonDelete: muiTheme.palette.accent1Color,
    }

    // Table columns to display
    const columns = [
      // 1 - label column
      new TableColumnBuilder('label').titleHeaderCell().propertyRenderCell('content.feature.label')
        .label(intl.formatMessage({ id: 'document.list.table.label' }))
        .build(),
      // 2 - model column
      new TableColumnBuilder('model').titleHeaderCell().propertyRenderCell('content.feature.model')
        .label(intl.formatMessage({ id: 'document.list.table.model' }))
        .build(),
      // 3 - Actions column
      new TableColumnBuilder().optionsColumn([{ // edit
        OptionConstructor: EditDocumentTableAction, // custom cell
        optionProps: {
          onEdit: handleEdit,
        },
      }, {
        OptionConstructor: CopyToClipBoardAction,
        optionProps: { hoverColor: style.hoverButtonEdit },
      }, {
        OptionConstructor: DeleteDocumentTableAction, // custom cell
        optionProps: {
          pageSize: DocumentListComponent.PAGE_SIZE,
          onDelete: this.openDeleteDialog,
        },
      }]).build(),
    ]

    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'document.no.document.title' })}
      />
    )

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'document.list.title' })}
          subtitle={intl.formatMessage({ id: 'document.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <PageableInfiniteTableContainer
              name="documents-table"
              pageActions={documentActions}
              pageSelectors={documentSelectors}
              tableActions={tableActions}
              columns={columns}
              emptyComponent={emptyComponent}
              displayColumnsHeader
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
            />
          </TableLayout>

          <CardActions>
            <CardActionsComponent
              mainButtonUrl={createUrl}
              mainButtonLabel={
                <FormattedMessage
                  id="document.list.action.add"
                />
              }
              mainHateoasDependencies={DocumentListComponent.CREATE_DEPENDENCIES}
              secondaryButtonLabel={intl.formatMessage({ id: 'document.list.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </CardText>
      </Card>
    )
  }
}

export default DocumentListComponent
