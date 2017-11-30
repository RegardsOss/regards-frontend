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
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { tableActions } from '../clients/TableClient'
import { generationChainActions, generationChainSelectors } from '../clients/GenerationChainClient'
import GenerationChainTableEditAction from './GenerationChainTableEditAction'
import { addDependencies } from '../dependencies'
import styles from '../styles'
import messages from '../i18n'
/**
* GenerationChainListComponent
* @author Sébastien Binda
*/
class GenerationChainListComponent extends React.Component {

  static propTypes = {
    fetchPage: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
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

  renderDeleteConfirmDialog = () => {
    if (this.state.chainToDelete) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'generation-chain.delete.confirm.title' }, { label: this.state.chainToDelete.content.label })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  render() {
    const { maProp } = this.props
    const { intl } = this.context

    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'generation-chain.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const infoMessage = (
      <span>
        {intl.formatMessage({ id: 'generation-chain.info.message' })}
        <ul>
          <li>{intl.formatMessage({ id: 'generation-chain.info.message.step1' })}</li>
          <li>{intl.formatMessage({ id: 'generation-chain.info.message.step2' })}</li>
          <li>{intl.formatMessage({ id: 'generation-chain.info.message.step3' })}</li>
          <li>{intl.formatMessage({ id: 'generation-chain.info.message.step4' })}</li>
        </ul>
      </span>
    )

    const columns = []
    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'generation-chain.list.title' })}
          subtitle={intl.formatMessage({ id: 'generation-chain.list.subtitle' })}
        />
        <CardText>
          <HelpMessageComponent message={infoMessage} />
          <TableLayout>
            <PageableInfiniteTableContainer
              name="generation-chain-table"
              pageActions={generationChainActions}
              pageSelectors={generationChainSelectors}
              tableActions={tableActions}
              columns={columns}
              emptyComponent={emptyComponent}
              displayColumnsHeader
              displayedRowsCount={10}
              queryPageSize={this.props.queryPageSize}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonTouchTap={this.props.onCreate}
            mainHateoasDependencies={addDependencies}
            mainButtonLabel={intl.formatMessage({ id: 'generation-chain.addnew.button' })}
            secondaryButtonLabel={intl.formatMessage({ id: 'generation-chain.back.button' })}
            secondaryButtonTouchTap={this.props.onBack}
          />
        </CardActions>
        {this.renderDeleteConfirmDialog()}
      </Card>
    )
  }
}
export default withI18n(messages)(withModuleStyle(styles)(GenerationChainListComponent))