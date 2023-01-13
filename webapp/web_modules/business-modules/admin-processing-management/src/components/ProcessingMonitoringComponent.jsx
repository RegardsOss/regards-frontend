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
  CardHeaderActions,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import Card from 'material-ui/Card'
import CardText from 'material-ui/Card/CardText'
import { ProcessingShapes } from '@regardsoss/shape'
import { processingMonitoringActions, processingMonitoringSelectors } from '../clients/ProcessingMonitoringClient'
import ProcessingMonitoringFiltersComponent from './monitoring/ProcessingMonitoringFiltersComponent'
import ProcessingMonitoringTableComponent from './ProcessingMonitoringTableComponent'
import ProcessingMonitoringChipsComponent from './ProcessingMonitoringChipsComponent'
import { filtersActions, filtersSelectors } from '../clients/FiltersClient'

/**
 * Component to monitor processing in project
 * @author Théo Lasserre
 */
export class ProcessingMonitoringComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    resultsCount: PropTypes.number.isRequired,
    processingList: ProcessingShapes.ProcessingList.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    isPaneOpened: false,
    currentRequestParameters: {},
  }

  onRefresh = () => {
    const { onRefresh } = this.props
    const { currentRequestParameters } = this.state
    onRefresh(currentRequestParameters)
  }

  handleFiltersPane = () => {
    const { isPaneOpened } = this.state
    this.setState({
      isPaneOpened: !isPaneOpened,
    })
  }

  updateRefreshParameters = (requestParameters) => {
    this.setState({
      currentRequestParameters: requestParameters,
    })
  }

  render() {
    const {
      onBack, project, entitiesLoading, resultsCount, processingList,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { processingMonitoring: { filterButtonStyle } } } = this.context
    const { isPaneOpened } = this.state
    return (
      <Card>
        <CardHeaderActions
          title={formatMessage({ id: 'processing.management.list.title' })}
          subtitle={formatMessage({ id: 'processing.management.list.subtitle' })}
          mainButtonLabel={formatMessage({ id: 'processing.monitoring.refresh.button' })}
          mainButtonType="submit"
          mainButtonClick={this.onRefresh}
          secondaryButtonLabel={formatMessage({ id: 'processing.monitoring.filter.button' })}
          secondaryButtonClick={this.handleFiltersPane}
          secondaryButtonStyle={filterButtonStyle}
          thirdButtonLabel={formatMessage({ id: 'processing.monitoring.back.button' })}
          thirdButtonClick={onBack}
        />
        <CardText>
          <ProcessingMonitoringChipsComponent
            filtersActions={filtersActions}
            filtersSelectors={filtersSelectors}
            processingList={processingList}
          />
          <TableFilterSortingAndVisibilityContainer
            pageActions={processingMonitoringActions}
            pageSelectors={processingMonitoringSelectors}
            isPagePostFetching
            updateRefreshParameters={this.updateRefreshParameters}
          >
            <ProcessingMonitoringFiltersComponent
              key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.FILTER}
              isPaneOpened={isPaneOpened}
              onCloseFiltersPane={this.handleFiltersPane}
              filtersActions={filtersActions}
              filtersSelectors={filtersSelectors}
              processingList={processingList}
            />
            <ProcessingMonitoringTableComponent
              key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.COMPONENT}
              project={project}
              entitiesLoading={entitiesLoading}
              resultsCount={resultsCount}
            />
          </TableFilterSortingAndVisibilityContainer>
        </CardText>
      </Card>
    )
  }
}

export default ProcessingMonitoringComponent
