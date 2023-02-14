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
import reduce from 'lodash/reduce'
import get from 'lodash/get'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  CardHeaderActions,
  TableFilterSortingAndVisibilityAndChipsComponent,
} from '@regardsoss/components'
import Card from 'material-ui/Card'
import CardText from 'material-ui/Card/CardText'
import { ProcessingShapes } from '@regardsoss/shape'
import { CommonDomain } from '@regardsoss/domain'
import { processingMonitoringActions, processingMonitoringSelectors } from '../clients/ProcessingMonitoringClient'
import ProcessingMonitoringFiltersComponent from './monitoring/ProcessingMonitoringFiltersComponent'
import ProcessingMonitoringTableComponent from './ProcessingMonitoringTableComponent'
import { filtersActions, filtersSelectors } from '../clients/FiltersClient'
import { FILTERS_I18N, FILTER_PARAMS } from '../domain/filters'

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
    filtersI18n: FILTERS_I18N,
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

  buildFiltersI18n = () => {
    const { processingList } = this.props
    const { filtersI18n } = this.state
    return ({
      ...filtersI18n,
      [FILTER_PARAMS.PROCESS_BID]: {
        labelKey: FILTERS_I18N[FILTER_PARAMS.PROCESS_BID].labelKey,
        chipValueKeys: reduce(processingList, (acc, process) => ({
          ...acc,
          [get(process, 'content.pluginConfiguration.businessId')]: get(process, 'content.pluginConfiguration.label'),
        }), {}),
        displayedDirectValues: true, // we dont provide in chipValueKeys multiple i18n keys but direct values instead since they are user made.
      },
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
          <TableFilterSortingAndVisibilityAndChipsComponent
            pageActions={processingMonitoringActions}
            pageSelectors={processingMonitoringSelectors}
            isPagePostFetching
            updateRefreshParameters={this.updateRefreshParameters}
            filtersActions={filtersActions}
            filtersSelectors={filtersSelectors}
            filtersI18n={this.buildFiltersI18n()}
          >
            <ProcessingMonitoringFiltersComponent
              key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
              isPaneOpened={isPaneOpened}
              onCloseFiltersPane={this.handleFiltersPane}
              processingList={processingList}
            />
            <ProcessingMonitoringTableComponent
              key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
              project={project}
              entitiesLoading={entitiesLoading}
              resultsCount={resultsCount}
            />
          </TableFilterSortingAndVisibilityAndChipsComponent>
        </CardText>
      </Card>
    )
  }
}

export default ProcessingMonitoringComponent
