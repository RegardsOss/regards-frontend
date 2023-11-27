/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import get from 'lodash/get'
import { serviceProviderActions, serviceProviderSelectors } from '../clients/ServiceProviderClient'
import ServiceProviderFormComponent, { FORM_MODE } from '../components/ServiceProviderFormComponent'

/**
* Container to handle create/edit/duplicate form of a service provider
* @author Théo Lasserre
*/
export class ServiceProviderFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} ownProps: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      serviceProvider: get(ownProps, 'params.serviceName') ? serviceProviderSelectors.getById(state, ownProps.params.serviceName) : null,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} ownProps: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetch: (serviceName) => dispatch(serviceProviderActions.fetchEntity(serviceName)),
      create: (serviceProvider) => dispatch(serviceProviderActions.createEntity(serviceProvider)),
      update: (entityId, serviceProvider) => dispatch(serviceProviderActions.updateEntity(entityId, serviceProvider)),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      serviceName: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    serviceProvider: CommonShapes.ServiceProvider,
    // from mapDispatchToProps
    fetch: PropTypes.func,
    update: PropTypes.func,
    create: PropTypes.func,
  }

  state = {
    isLoading: !!get(this.props, 'params.serviceName', false),
  }

  UNSAFE_componentWillMount() {
    const { params: { serviceName } } = this.props
    // Fetch serviceProvider if exist
    if (serviceName) {
      this.props.fetch(serviceName).then((actionResult) => {
        if (!actionResult.error) {
          this.setState({
            isLoading: false,
          })
        }
      })
    }
  }

  /**
   * Create or Update a serviceProviderConf from the PluginConfiguration fields & SelectedRole field.
   * @param {*} fields
   */
  onSubmit = (fields) => {
    const {
      params: { mode }, serviceProvider, create, update,
    } = this.props

    // Creation of a plugin conf thanks to form fields
    const pluginConfiguration = fields.pluginConfiguration ? {
      ...PluginFormUtils.formatPluginConf(fields.pluginConfiguration),
    } : null
    const serviceProviderConf = {
      name: get(fields, 'serviceProviderName'),
      authUrl: get(fields, 'serviceProviderUrl'),
      logoutUrl: get(fields, 'serviceProviderLogoutUrl'),
      descriptionFr: get(fields, 'serviceProviderDescriptionFr'),
      descriptionEn: get(fields, 'serviceProviderDescriptionEn'),
      pluginConfiguration,
    }

    // Action to do depending on form mode
    let action
    switch (mode) {
      case FORM_MODE.CREATE:
        action = create(serviceProviderConf)
        break
      case FORM_MODE.EDIT:
        action = update(get(serviceProvider, 'content.name'), serviceProviderConf)
        break
      default:
        throw new Error('FORM MODE Unknown')
    }

    // Action execution
    action.then((actionResults) => {
      if (!actionResults.error) {
        browserHistory.push(this.getBackUrl())
      }
    })
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/authenticationplugins/list`
  }

  render() {
    const {
      params: { mode }, serviceProvider,
    } = this.props

    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        <ServiceProviderFormComponent
          mode={mode}
          serviceProvider={serviceProvider}
          onSubmit={this.onSubmit}
          backUrl={this.getBackUrl()}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

export default connect(
  ServiceProviderFormContainer.mapStateToProps,
  ServiceProviderFormContainer.mapDispatchToProps)(ServiceProviderFormContainer)
