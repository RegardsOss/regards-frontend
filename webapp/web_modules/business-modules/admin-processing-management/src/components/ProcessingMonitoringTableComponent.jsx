/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  NoContentComponent,
  TableColumnBuilder,
  TableLayout,
  PageableInfiniteTableContainer,
  TableHeaderLineLoadingSelectAllAndResults,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import { processingMonitoringActions, processingMonitoringSelectors } from '../clients/ProcessingMonitoringClient'
import { tableActions } from '../clients/TableClient'
import ProcessingMonitoringStatusRenderer from './render/ProcessingMonitoringStatusRenderer'
import ProcessingMonitoringInfo from './monitoring/ProccesingMonitoringInfo'
import ProcessingMonitoringEntityInfoDialog from './monitoring/ProcessingMonitoringEntityInfoDialog'

/**
 * Component to monitor processing in project
 * @author Théo Lasserre
 */
export class ProcessingMonitoringTableComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    resultsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number,

    // table sorting, column visiblity & filters management
    bodyParameters: TableFilterSortingAndVisibilityContainer.BODY_PARAMETERS_PROP_TYPE,
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="processing.monitoring.list.empty.title"
      Icon={AddToPhotos}
    />)

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="processing.monitoring.list.loading.title"
      Icon={SearchIcon}
    />)

  state = {
    entityForInfos: null,
  }

  onCloseInfoDialog = () => this.showInformation(null)

  showInformation = (processing) => {
    this.setState({
      entityForInfos: processing,
    })
  }

  render() {
    const {
      requestParameters, project, entitiesLoading, resultsCount, pageSize, bodyParameters,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - process name column
      new TableColumnBuilder('column.processName')
        .titleHeaderCell()
        .propertyRenderCell('content.processName')
        .label(formatMessage({ id: 'processing.monitoring.list.header.name.label' }))
        .build(),
      // 2 - user name column
      new TableColumnBuilder('column.userName')
        .titleHeaderCell()
        .propertyRenderCell('content.userName')
        .label(formatMessage({ id: 'processing.monitoring.list.header.username.label' }))
        .build(),
      // 3 - created time column
      new TableColumnBuilder('column.created')
        .titleHeaderCell()
        .propertyRenderCell('content.created')
        .label(formatMessage({ id: 'processing.monitoring.list.header.created.label' }))
        .build(),
      // 4 - status column
      new TableColumnBuilder('column.status')
        .titleHeaderCell()
        .rowCellDefinition({ Constructor: ProcessingMonitoringStatusRenderer })
        .label(formatMessage({ id: 'processing.monitoring.list.header.status' }))
        .build(),
      // 5 - options
      new TableColumnBuilder('column.options')
        .label(formatMessage({ id: 'processing.monitoring.list.header.option' }))
        .optionsColumn([{
          OptionConstructor: ProcessingMonitoringInfo,
          optionProps: { onClick: this.showInformation },
        }]).build(),
    ]
    return (
      <TableLayout>
        <TableHeaderLineLoadingSelectAllAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
        <PageableInfiniteTableContainer
          name="processing-monitoring-table"
          minRowCount={minRowCount}
          maxRowCount={maxRowCount}
          pageActions={processingMonitoringActions}
          pageSelectors={processingMonitoringSelectors}
          tableActions={tableActions}
          requestParams={{ ...requestParameters, tenant: project }}
          pageSize={pageSize}
          columns={columns}
          bodyParams={bodyParameters}
          fetchUsingPostMethod
          emptyComponent={entitiesLoading ? ProcessingMonitoringTableComponent.LOADING_COMPONENT : ProcessingMonitoringTableComponent.EMPTY_COMPONENT}
        />
        <ProcessingMonitoringEntityInfoDialog
          processing={this.state.entityForInfos}
          onClose={this.onCloseInfoDialog}
        />
      </TableLayout>
    )
  }
}

export default ProcessingMonitoringTableComponent
