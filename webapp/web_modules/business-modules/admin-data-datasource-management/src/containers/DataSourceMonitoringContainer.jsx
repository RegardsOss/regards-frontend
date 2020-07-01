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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { crawlerDatasourceActions, crawlerDatasourceSelectors } from '../clients/CrawlerDatasourceClient'
import { scheduleCrawlerDatasourceActions } from '../clients/ScheduleCrawlerDatasourceClient'
import DataSourceMonitoringComponent from '../components/DataSourceMonitoringComponent'

/**
*DataSourceMonitoringComponent
* @author Sébastien Binda
*/
export class DataSourceMonitoringContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      crawlerDatasources: crawlerDatasourceSelectors.getOrderedList(state),
    }
  }

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
      scheduleCrawlerDatasource: (crawlerId) => dispatch(scheduleCrawlerDatasourceActions.scheduleDatasourceIngestion(crawlerId)),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    crawlerDatasources: DataManagementShapes.CrawlerDatasourceArray.isRequired,
    // from mapDispatchToProps
    fetchCrawlerDatasources: PropTypes.func.isRequired,
    deleteCrawlerDatasource: PropTypes.func.isRequired,
    scheduleCrawlerDatasource: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchCrawlerDatasources()
  }

  onDelete = (crawlerId) => {
    this.props.deleteCrawlerDatasource(crawlerId).then((actionResults) => {
      this.props.fetchCrawlerDatasources()
    })
  }

  onSchedule = (crawlerId) => this.props.scheduleCrawlerDatasource(crawlerId).then((actionResults) => this.props.fetchCrawlerDatasources())

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  render() {
    const { crawlerDatasources } = this.props
    return (
      <DataSourceMonitoringComponent
        crawlerDatasources={crawlerDatasources}
        onBack={this.onBack}
        onRefresh={this.props.fetchCrawlerDatasources}
        onDelete={this.onDelete}
        onSchedule={this.onSchedule}
      />
    )
  }
}
export default connect(
  DataSourceMonitoringContainer.mapStateToProps,
  DataSourceMonitoringContainer.mapDispatchToProps,
)(DataSourceMonitoringContainer)
