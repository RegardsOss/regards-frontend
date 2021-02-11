/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { searchEngineConfigurationsActions, searchEngineConfigurationsSelectors } from '../../clients/SearchEngineConfigurationsClient'
import SearchEngineConfigurationListComponent from '../../components/configuration/SearchEngineConfigurationListComponent'
import { datasetActions, datasetSelectors } from '../../clients/DatasetClient'

/**
* Container to handle search engine configurations list
* @author Sébastien Binda
*/
export class SearchEngineConfigurationListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, props) {
    return {
      meta: searchEngineConfigurationsSelectors.getMetaData(state),
      isLoading: searchEngineConfigurationsSelectors.isFetching(state),
      datasetList: datasetSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, props) {
    return {
      fetchPage: (pageIndex, pageSize, requestParams) => dispatch(searchEngineConfigurationsActions.fetchPagedEntityList(pageIndex, pageSize, {}, requestParams)),
      fetchDatasetList: () => dispatch(datasetActions.fetchPagedEntityList(0, 1000)),
      update: (conf) => dispatch(searchEngineConfigurationsActions.updateEntity(conf.id, conf)),
      delete: (conf) => dispatch(searchEngineConfigurationsActions.deleteEntity(conf.id)),
    }
  }

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
    }),
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    isLoading: PropTypes.bool.isRequired,
    datasetList: DataManagementShapes.DatasetList,
    // from mapDispatchToProps
    fetchPage: PropTypes.func.isRequired,
    fetchDatasetList: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  UNSAFE_componentWillMount = () => {
    this.props.fetchDatasetList()
  }

  onEdit = (pluginConfToEdit) => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/dataaccess/searchengines/${pluginConfToEdit.id}/edit`)
  }

  onDelete = (conf) => {
    this.props.delete(conf)
  }

  goToCreateForm = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/dataaccess/searchengines/create`)
  }

  goToBoard = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/dataaccess/board`)
  }

  render() {
    const {
      datasetList, fetchPage, isLoading, meta: { totalElements },
    } = this.props
    return (
      <SearchEngineConfigurationListComponent
        onBack={this.goToBoard}
        onAddNewConf={this.goToCreateForm}
        onEdit={this.onEdit}
        onDelete={this.onDelete}
        fetchPage={fetchPage}
        datasetList={datasetList}
        isLoading={isLoading}
        resultsCount={totalElements}
      />
    )
  }
}
export default connect(
  SearchEngineConfigurationListContainer.mapStateToProps,
  SearchEngineConfigurationListContainer.mapDispatchToProps)(SearchEngineConfigurationListContainer)
