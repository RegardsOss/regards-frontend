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
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import {
  TableDeleteOption,
  TableColumnBuilder,
  TableLayout,
  NoContentComponent,
  PageableInfiniteTableContainer,
  HelpMessageComponent,
  CardActionsComponent,
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { tableActions } from '../clients/TableClient'
import { processingChainActions, processingChainSelectors } from '../clients/ProcessingChainClient'
import IngestProcessingChainTableEditAction from './IngestProcessingChainTableEditAction'
import IngestProcessingChainTableExportAction from './IngestProcessingChainTableExportAction'
import { addDependencies } from '../dependencies'

/**
 * Displays the list of configurable IngestProcessingChains.
 * @author Sébastien Binda
 */
export class ProcessingChainListComponent extends React.Component {
  static propTypes = {
    fetchPage: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    queryPageSize: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      chainToDelete: null,
    }
  }

  onDelete = (chain) => {
    this.setState({
      chainToDelete: chain,
    })
  }

  onConfirmDelete = () => {
    this.closeDeleteDialog()
    if (this.state.chainToDelete) {
      this.props.onDelete(this.state.chainToDelete)
    }
  }

  closeDeleteDialog = () => {
    this.setState({
      chainToDelete: null,
    })
  }

  renderDeleteConfirmDialog = () => {
    if (this.state.chainToDelete) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'processing-chain.delete.confirm.title' }, { name: this.state.chainToDelete.content.name })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  render() {
    const { intl, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount }, fixedColumnsWidth } = muiTheme.components.infiniteTable

    // Table columns to display
    const columns = [
      TableColumnBuilder.buildSimplePropertyColumn('column.name', 'name', 'content.name'),
      TableColumnBuilder.buildSimplePropertyColumn('column.description', 'description', 'content.description'),
      TableColumnBuilder.buildOptionsColumn('', [{
        OptionConstructor: IngestProcessingChainTableExportAction,
        optionProps: { accessToken: this.props.accessToken },
      }, {
        OptionConstructor: IngestProcessingChainTableEditAction,
        optionProps: { onEdit: this.props.onEdit },
      }, {
        OptionConstructor: TableDeleteOption,
        optionProps: {
          fetchPage: this.props.fetchPage,
          onDelete: this.onDelete,
          queryPageSize: this.props.queryPageSize,
          handleHateoas: true,
          disableInsteadOfHide: true,
        },
      }], true, fixedColumnsWidth),
    ]

    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'processing-chain.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const infoMessage = (
      <span>
        {intl.formatMessage({ id: 'processing-chain.info.message' })}
        <ul>
          <li>{intl.formatMessage({ id: 'processing-chain.info.message.step1' })}</li>
          <li>{intl.formatMessage({ id: 'processing-chain.info.message.step2' })}</li>
          <li>{intl.formatMessage({ id: 'processing-chain.info.message.step3' })}</li>
          <li>{intl.formatMessage({ id: 'processing-chain.info.message.step4' })}</li>
          <li>{intl.formatMessage({ id: 'processing-chain.info.message.step5' })}</li>
        </ul>
      </span>
    )

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'processing-chain.list.title' })}
          subtitle={intl.formatMessage({ id: 'processing-chain.list.subtitle' })}
        />
        <CardText>
          <HelpMessageComponent message={infoMessage} />
          <TableLayout>
            <PageableInfiniteTableContainer
              name="ingest-processing-chain-table"
              pageActions={processingChainActions}
              pageSelectors={processingChainSelectors}
              tableActions={tableActions}
              columns={columns}
              emptyComponent={emptyComponent}
              displayColumnsHeader
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              queryPageSize={this.props.queryPageSize}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonClick={this.props.onCreate}
            mainHateoasDependencies={addDependencies}
            mainButtonLabel={intl.formatMessage({ id: 'processing-chain.addnew.button' })}
            secondaryButtonLabel={intl.formatMessage({ id: 'processing-chain.back.button' })}
            secondaryButtonClick={this.props.onBack}
          />
        </CardActions>
        {this.renderDeleteConfirmDialog()}
      </Card>
    )
  }
}

export default ProcessingChainListComponent
