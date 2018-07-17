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
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { searchEngineConfigurationsActions, searchEngineConfigurationsSelectors } from '../../clients/SearchEngineConfigurationsClient'
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
      entity: get(ownProps, 'params.confId') ? searchEngineConfigurationsSelectors.getById(state, ownProps.params.confId) : null,
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
    entity: CommonShapes.PluginConfiguration,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: !!get(props, 'params.confId', false),
    }
  }

  componentWillMount() {
    const { params: { confId }, fetch } = this.props
    if (confId) {
      fetch(confId).then(() => this.setState({ isLoading: false }))
    }
  }

  render() {
    const {
      params: { mode, project }, entity, update, create,
    } = this.props
    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        {() => (
          <SearchEngineConfigurationFormComponent
            mode={mode || 'create'}
            searchEngineConfigurations={entity}
            backUrl={`/admin/${project}/dataaccess/searchengines/list`}
            onUpdate={update}
            onCreate={create}
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
