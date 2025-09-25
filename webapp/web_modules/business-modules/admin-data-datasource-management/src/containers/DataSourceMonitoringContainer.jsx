/**
 * Copyright 2017-2025 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import filter from 'lodash/filter'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { crawlerDatasourceActions } from '../clients/CrawlerDatasourceClient'
import { scheduleCrawlerDatasourceActions } from '../clients/ScheduleCrawlerDatasourceClient'
import DataSourceMonitoringComponent from '../components/DataSourceMonitoringComponent'

/**
*DataSourceMonitoringComponent
* @author Sébastien Binda
*/
export class DataSourceMonitoringContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchCrawlerDatasources: () => dispatch(crawlerDatasourceActions.fetchEntityList()),
      deleteCrawlerDatasource: (crawlerId) => dispatch(crawlerDatasourceActions.deleteEntity(crawlerId)),
      scheduleCrawlerDatasource: (crawlerId, scheduleDateValue) => dispatch(scheduleCrawlerDatasourceActions.scheduleDatasourceIngestion(crawlerId, scheduleDateValue)),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapDispatchToProps
    fetchCrawlerDatasources: PropTypes.func.isRequired,
    deleteCrawlerDatasource: PropTypes.func.isRequired,
    scheduleCrawlerDatasource: PropTypes.func.isRequired,
  }

  state = {
    crawlerDatasourcesCurrent: [],
    crawlerDatasourcesBuilding: [],
  }

  componentDidMount() {
    this.fetchDatasources()
  }

  fetchDatasources = () => {
    const { fetchCrawlerDatasources } = this.props
    fetchCrawlerDatasources().then((actionResult) => {
      if (!actionResult.error) {
        const crawlerDatasources = get(actionResult, 'payload.entities.crawlerDatasource')
        const newCrawlerDatasourcesCurrent = filter(crawlerDatasources, (crawlerDatasource) => !get(crawlerDatasource, 'content.building'))
        const newCrawlerDatasourcesBuilding = filter(crawlerDatasources, (crawlerDatasource) => !!get(crawlerDatasource, 'content.building'))
        this.setState({
          crawlerDatasourcesCurrent: newCrawlerDatasourcesCurrent,
          crawlerDatasourcesBuilding: newCrawlerDatasourcesBuilding,
        })
      }
    })
  }

  onDelete = (crawlerId) => {
    this.props.deleteCrawlerDatasource(crawlerId).then((actionResults) => {
      this.fetchDatasources()
    })
  }

  onSchedule = (crawlerId, scheduleDateValue) => this.props.scheduleCrawlerDatasource(crawlerId, scheduleDateValue).then((actionResults) => this.fetchDatasources())

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  render() {
    const { crawlerDatasourcesCurrent, crawlerDatasourcesBuilding } = this.state
    return (
      <DataSourceMonitoringComponent
        crawlerDatasourcesCurrent={crawlerDatasourcesCurrent}
        crawlerDatasourcesBuilding={crawlerDatasourcesBuilding}
        onBack={this.onBack}
        onRefresh={this.fetchDatasources}
        onDelete={this.onDelete}
        onSchedule={this.onSchedule}
      />
    )
  }
}
export default connect(
  null,
  DataSourceMonitoringContainer.mapDispatchToProps,
)(DataSourceMonitoringContainer)
