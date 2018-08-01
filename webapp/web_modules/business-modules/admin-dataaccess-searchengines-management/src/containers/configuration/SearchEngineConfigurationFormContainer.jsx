/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { CommonShapes, CatalogShapes } from '@regardsoss/shape'
import { CatalogDomain } from '@regardsoss/domain'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { searchEngineConfigurationsActions, searchEngineConfigurationsSelectors } from '../../clients/SearchEngineConfigurationsClient'
import { pluginConfigurationActions, pluginConfigurationSelectors } from '../../clients/PluginConfigurationClient'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../../clients/PluginMetadataClient'
import SearchEngineConfigurationFormComponent from '../../components/configuration/SearchEngineConfigurationFormComponent'

const MICROSERVICE = STATIC_CONF.MSERVICES.CATALOG
/**
* Container to handle create/edit/duplicate form of a SearchEngine configuration
* @author Sébastien Binda
*/
export class SearchEngineConfigurationFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      searchEngine: get(ownProps, 'params.confId') ? searchEngineConfigurationsSelectors.getById(state, ownProps.params.confId) : null,
      pluginConfigurationList: pluginConfigurationSelectors.getList(state),
      pluginMetaDataList: pluginMetaDataSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, ownProps) {
    return {
      fetch: entityId => dispatch(searchEngineConfigurationsActions.fetchEntity(entityId, { microserviceName: MICROSERVICE })),
      create: entity => dispatch(searchEngineConfigurationsActions.createEntity(entity)),
      update: (entity, confId) => dispatch(searchEngineConfigurationsActions.updateEntity(confId, entity)),
      fetchPluginConfigurationList: () => dispatch(pluginConfigurationActions.fetchEntityList(
        { microserviceName: MICROSERVICE }, {
          pluginType: CatalogDomain.PluginTypeEnum.SEARCHENGINES,
        })),
      fetchPluginMetaDataList: microserviceName => dispatch(pluginMetaDataActions.fetchEntityList(
        { microserviceName: MICROSERVICE }, {
          pluginType: CatalogDomain.PluginTypeEnum.SEARCHENGINES,
        })),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      confId: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    searchEngine: CatalogShapes.SearchEngineConfiguration,
    pluginConfigurationList: CommonShapes.PluginConfigurationList,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    fetchPluginMetaDataList: PropTypes.func.isRequired,
    fetchPluginConfigurationList: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    const { params: { confId }, fetch } = this.props
    const actions = []
    if (confId) {
      actions.push(fetch(confId))
    }
    actions.push(this.props.fetchPluginMetaDataList())
    actions.push(this.props.fetchPluginConfigurationList())

    Promise.all(actions)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/dataaccess/searchengines/list`
    browserHistory.push(url)
  }

  render() {
    const {
      params: { mode }, searchEngine, update, create, pluginMetaDataList, pluginConfigurationList,
    } = this.props
    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        {() => (
          <SearchEngineConfigurationFormComponent
            mode={mode || 'create'}
            searchEngineConfiguration={searchEngine}
            onBack={this.onBack}
            onUpdate={update}
            onCreate={create}
            pluginConfigurationList={pluginConfigurationList}
            pluginMetaDataList={pluginMetaDataList}
          />
        )
        }
      </LoadableContentDisplayDecorator >
    )
  }
}
export default connect(
  SearchEngineConfigurationFormContainer.mapStateToProps,
  SearchEngineConfigurationFormContainer.mapDispatchToProps)(SearchEngineConfigurationFormContainer)