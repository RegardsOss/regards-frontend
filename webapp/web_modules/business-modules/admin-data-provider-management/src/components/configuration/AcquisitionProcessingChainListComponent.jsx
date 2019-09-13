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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import {
  TableDeleteOption,
  TableColumnBuilder,
  TableLayout,
  NoContentComponent,
  PageableInfiniteTableContainer,
  CardActionsComponent,
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  HelpMessageComponent,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { tableActions } from '../../clients/TableClient'
import { AcquisitionProcessingChainActions, AcquisitionProcessingChainSelectors } from '../../clients/AcquisitionProcessingChainClient'
import AcquisitionProcessingChainTableEditAction from './AcquisitionProcessingChainTableEditAction'
import AcquisitionProcessingChainTableDuplicateAction from './AcquisitionProcessingChainTableDuplicateAction'
import styles from '../../styles'
import messages from '../../i18n'
import dependencies from '../../dependencies'
/**
* AcquisitionProcessingChainListComponent
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainListComponent extends React.Component {
  static propTypes = {
    fetchPage: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    queryPageSize: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      chainToDelete: null,
    }
  }

  /**
   * Callback to open the delete confirm dialog
   * @param {*} chain : chain to delete
   */
  onDelete = (chain) => {
    this.setState({
      chainToDelete: chain,
    })
  }

  /**
   * Callback for deletion confirmation
   */
  onConfirmDelete = () => {
    this.closeDeleteDialog()
    if (this.state.chainToDelete) {
      this.props.onDelete(this.state.chainToDelete)
    }
  }

  /**
   * Callback to close delete confirm dialog
   */
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
          title={this.context.intl.formatMessage({ id: 'acquisition-chain.list.delete.confirm.title' }, { label: this.state.chainToDelete.content.label })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  render() {
    const { intl: { formatMessage }, muiTheme } = this.context
    const {
      onBack, onDuplicate, onEdit, fetchPage, queryPageSize, onCreate,
    } = this.props
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    const emptyComponent = (
      <NoContentComponent
        titleKey="acquisition-chain.list.empty.title"
        Icon={AddToPhotos}
      />
    )

    const columns = [
      new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.label')
        .label(formatMessage({ id: 'acquisition-chain.list.table.label' }))
        .build(),
      new TableColumnBuilder('column.mode').titleHeaderCell().propertyRenderCell('content.mode')
        .label(formatMessage({ id: 'acquisition-chain.list.table.mode' }))
        .build(),
      new TableColumnBuilder('column.enabled').titleHeaderCell().propertyRenderCell('content.enabled')
        .label(formatMessage({ id: 'acquisition-chain.list.table.enabled' }))
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell().propertyRenderCell('content.state')
        .label(formatMessage({ id: 'acquisition-chain.list.table.state' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: AcquisitionProcessingChainTableEditAction,
        optionProps: { onEdit },
      }, {
        OptionConstructor: AcquisitionProcessingChainTableDuplicateAction,
        optionProps: { onDuplicate },
      }, {
        OptionConstructor: TableDeleteOption,
        optionProps: {
          fetchPage,
          disableInsteadOfHide: true,
          onDelete: this.onDelete,
          queryPageSize,
          handleHateoas: true,
        },
      }]).build(),
    ]

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'acquisition-chain.list.title' })}
          subtitle={formatMessage({ id: 'acquisition-chain.list.subtitle' })}
        />
        <CardText>
          <HelpMessageComponent
            message={formatMessage({ id: 'acquisition-chain.list.delete.conditions' })}
          />
          <TableLayout>
            <PageableInfiniteTableContainer
              name="acquisition-chain-table"
              pageActions={AcquisitionProcessingChainActions}
              pageSelectors={AcquisitionProcessingChainSelectors}
              tableActions={tableActions}
              columns={columns}
              emptyComponent={emptyComponent}
              displayColumnsHeader
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              queryPageSize={queryPageSize}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonClick={onCreate}
            mainHateoasDependencies={dependencies.addDependencies}
            mainButtonLabel={formatMessage({ id: 'acquisition-chain.list.addnew.button' })}
            secondaryButtonLabel={formatMessage({ id: 'acquisition-chain.list.back.button' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
        {this.renderDeleteConfirmDialog()}
      </Card>
    )
  }
}
export default withI18n(messages)(withModuleStyle(styles)(AcquisitionProcessingChainListComponent))
