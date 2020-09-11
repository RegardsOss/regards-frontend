/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  CardActionsComponent,
  TableColumnBuilder,
  TableLayout,
  PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { ProcessingShapes } from '@regardsoss/shape'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import Card from 'material-ui/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import CardActions from 'material-ui/Card/CardActions'
import { processingMonitoringActions, processingMonitoringSelectors } from '../clients/ProcessingMonitoringClient'
import { tableActions } from '../clients/TableClient'
import ProcessingMonitoringStatusRenderer from './render/ProcessingMonitoringStatusRenderer'
import ProcessingMonitoringInfo from './monitoring/ProccesingMonitoringInfo'
import ProcessingMonitoringFiltersComponent from './monitoring/ProcessingMonitoringFiltersComponent'
import ProcessingMonitoringEntityInfoDialog from './monitoring/ProcessingMonitoringEntityInfoDialog'

/**
 * Component to monitor processing in project
 * @author Théo Lasserre
 */
export class ProcessingMonitoringComponent extends React.Component {
    static propTypes = {
      onRefresh: PropTypes.func.isRequired,
      backUrl: PropTypes.string.isRequired,
      processingList: ProcessingShapes.ProcessingList.isRequired,
    }

    static contextTypes = {
      ...i18nContextType,
      ...themeContextType,
    }

    static PAGE_SIZE = 100

    static EMPTY_COMPONENT = (
      <NoContentComponent
        titleKey="processing.monitoring.list.empty.title"
        Icon={AddToPhotos}
      />)

    state = {
      entityForInfos: null,
    }

    onCloseInfoDialog = () => this.showInformation(null)

    showInformation = (entity) => {
      this.setState({
        entityForInfos: entity,
      })
    }

    render() {
      const {
        onRefresh, backUrl, processingList,
      } = this.props
      const { intl: { formatMessage }, muiTheme } = this.context
      const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
      const style = {
        hoverButtonEdit: muiTheme.palette.primary1Color,
      }
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
            optionProps: { onClick: this.showInformation, hoverColor: style.hoverButtonEdit },
          }]).build(),
      ]

      return (
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'processing.management.list.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'processing.management.list.subtitle' })}
          />
          <CardText>
            <TableLayout>
              <ProcessingMonitoringFiltersComponent
                processingList={processingList}
                onRefresh={onRefresh}
              />
              <PageableInfiniteTableContainer
                name="processing-monitoring-table"
                minRowCount={minRowCount}
                maxRowCount={maxRowCount}
                pageActions={processingMonitoringActions}
                pageSelectors={processingMonitoringSelectors}
                tableActions={tableActions}
                pageSize={ProcessingMonitoringComponent.PAGE_SIZE}
                columns={columns}
                emptyComponent={ProcessingMonitoringComponent.EMPTY_COMPONENT}
              />
              <ProcessingMonitoringEntityInfoDialog
                entity={this.state.entityForInfos}
                onClose={this.onCloseInfoDialog}
              />
            </TableLayout>
          </CardText>
          <CardActions>
            <CardActionsComponent
              secondaryButtonLabel={formatMessage({ id: 'processing.management.list.cancel.button' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      )
    }
}

export default ProcessingMonitoringComponent
