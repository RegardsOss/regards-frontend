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
  NoContentComponent,
  PageableInfiniteTableContainer,
  HelpMessageComponent,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { tableActions, tableSelectors } from '../clients/TableClient'
import { processingChainActions, processingChainSelectors } from '../clients/ProcessingChainClient'

/**
 * Displays the list of configurable IngestProcessingChains.
 */
export class ProcessingChainListComponent extends React.Component {

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { intl } = this.context

    const tableConfiguration = {
      displayColumnsHeader: true,
      lineHeight: 47,
      displayCheckbox: true,
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
        label: intl.formatMessage({ id: 'processing-chain.table.name' }),
        // Entity attributes to display as cell in the column
        attributes: ['name'],
        // True to hide the column label in the header line of the table
        hideLabel: false,
        // Does the column is sortable
        sortable: false,
      },
      {
        // Label of the column
        label: intl.formatMessage({ id: 'processing-chain.table.description' }),
        // Entity attributes to display as cell in the column
        attributes: ['description'],
        // True to hide the column label in the header line of the table
        hideLabel: false,
        // Does the column is sortable
        sortable: false,
      },
    ]

    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'processing-chain.empty.title' })}
        Icon={AddToPhotos}
        action={null}
      />
    )

    const infoMessage = (
      <span>
        {intl.formatMessage({ id: 'processinghain.info.message' })}
        <ul>
          <li>{intl.formatMessage({ id: 'processinghain.info.message.step1' })}</li>
          <li>{intl.formatMessage({ id: 'processinghain.info.message.step2' })}</li>
          <li>{intl.formatMessage({ id: 'processinghain.info.message.step3' })}</li>
          <li>{intl.formatMessage({ id: 'processinghain.info.message.step4' })}</li>
        </ul>
      </span>
    )


    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'processinghain.list.title' })}
          subtitle={intl.formatMessage({ id: 'processinghain.list.subtitle' })}
        />
        <CardText>
          <HelpMessageComponent message={infoMessage} />
          <PageableInfiniteTableContainer
            name="ingest-processing-chain-table"
            pageActions={processingChainActions}
            pageSelectors={processingChainSelectors}
            tableActions={tableActions}
            tableSelectors={tableSelectors}
            tableConfiguration={tableConfiguration}
            tablePaneConfiguration={tablePaneConfiguration}
            pageSize={10}
            columns={columns}
            emptyComponent={emptyComponent}
          />
        </CardText>
      </Card>
    )
  }

}

export default ProcessingChainListComponent
