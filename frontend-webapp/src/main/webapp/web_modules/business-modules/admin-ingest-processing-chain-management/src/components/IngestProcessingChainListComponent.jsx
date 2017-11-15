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
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import {
  TableColumnBuilder,
  TableLayout,
  NoContentComponent,
  PageableInfiniteTableContainer,
  HelpMessageComponent,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { tableActions, tableSelectors } from '../clients/TableClient'
import { processingChainActions, processingChainSelectors } from '../clients/ProcessingChainClient'
import IngestProcessingChainTableEditAction from './IngestProcessingChainTableEditAction'
import IngestProcessingChainTableDeleteAction from './IngestProcessingChainTableDeleteAction'

/**
 * Displays the list of configurable IngestProcessingChains.
 */
export class ProcessingChainListComponent extends React.Component {

  static propTypes = {
    onDelete : PropTypes.func.isRequired,
    onEdit : PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { intl, muiTheme } = this.context
    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth

    // Table columns to display
    const columns = [
      TableColumnBuilder.buildSimplePropertyColumn('column.name', 'name', 'content.name'),
      TableColumnBuilder.buildSimplePropertyColumn('column.description', 'description', 'content.description'),
      TableColumnBuilder.buildOptionsColumn('', [{
        OptionConstructor: IngestProcessingChainTableEditAction,
        optionProps: { onEdit: this.props.onEdit },
      }, {
        OptionConstructor: IngestProcessingChainTableDeleteAction,
        optionProps:  { onDelete: this.props.onDelete },
      }], true, fixedColumnWidth),
    ]

    /**const emptyContentAction = (
      <FlatButtonWithResourceDisplayControl
        resourceDependencies={datasetDependencies.addDependencies}
        label={formatMessage({ id: 'accessright.no.dataset.subtitle' })}
        onTouchTap={navigateToCreateDataset}
        primary
      />
    )*/
    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'processing-chain.empty.title' })}
        Icon={AddToPhotos}
        action={undefined}
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

export default ProcessingChainListComponent
