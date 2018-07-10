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
import { securityDelegationActions, securityDelegationByPluginIdActions, securityDelegationSelectors } from '../../clients/SecurityDelegationClient'
import SecurityDelegationFormComponent from '../../components/security/SecurityDelegationFormComponent'

const MICROSERVICE = STATIC_CONF.MSERVICES.STORAGE
/**
* Container to handle create/edit/duplicate form of a security delegation plugin
* @author Sébastien Binda
*/
export class SecurityDelegationFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      entity: get(ownProps, 'params.id') ? securityDelegationSelectors.getById(state, ownProps.params.id) : null,
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
      fetch: entityId => dispatch(securityDelegationActions.fetchEntity(entityId, { microserviceName: MICROSERVICE })),
      create: entity => dispatch(securityDelegationActions.createEntity(entity, { microserviceName: MICROSERVICE })),
      update: (entityId, entity) => dispatch(securityDelegationByPluginIdActions.updateEntity(entityId, entity, { microserviceName: MICROSERVICE, pluginId: entity.pluginId })),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      id: PropTypes.string,
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
      isLoading: !!get(props, 'params.id', false),
    }
  }

  componentWillMount() {
    const { params: { id }, fetch } = this.props
    if (id) {
      fetch(id).then(() => this.setState({ isLoading: false }))
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
          <SecurityDelegationFormComponent
            mode={mode || 'create'}
            pluginConfiguration={entity}
            backUrl={`/admin/${project}/data/acquisition/storage/security`}
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
  SecurityDelegationFormContainer.mapStateToProps,
  SecurityDelegationFormContainer.mapDispatchToProps)(SecurityDelegationFormContainer)
