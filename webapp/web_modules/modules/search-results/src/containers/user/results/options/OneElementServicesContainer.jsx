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
import omit from 'lodash/omit'
import { connect } from '@regardsoss/redux'
import { AccessDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { PluginServiceRunModel, target } from '@regardsoss/entities-common'
import runPluginServiceActions from '../../../../models/services/RunPluginServiceActions'
import OneElementServicesComponent from '../../../../components/user/results/options/OneElementServicesComponent'

/**
* One element services option container
* @author Raphaël Mechali
*/
export class OneElementServicesContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchRunService: (service, serviceTarget) => dispatch(runPluginServiceActions.runService(service, serviceTarget)),
    }
  }

  static propTypes = {
    // from table cell API, mentionned here only to be excluded from children properties
    rowIndex: PropTypes.number,
    // Entity. Note: when used in options column, this is provided by the table cell API
    entity: AccessShapes.EntityWithServices.isRequired,
    // from mapDispatchToProps
    dispatchRunService: PropTypes.func.isRequired,
  }

  /** Properties that will not be reported to sub component */
  static NON_REPORTED_PROPS = ['entity', 'rowIndex', 'dispatchRunService']

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // detect entity change to update the available services (the service that can be applied to one entity)
    if (oldProps.entity !== newProps.entity) {
      const entityType = get(newProps.entity, 'content.entityType')
      this.setState({
        services: get(newProps.entity, 'content.services', [])
          // keep only services that have one element application mode and
          // entity type as target
          .filter(({ content: { applicationModes, entityTypes } }) => applicationModes.includes(AccessDomain.applicationModes.ONE)
            && entityTypes.includes(entityType)),
      })
    }
  }

  /**
   * Callback: on service started by user. Dispatches run service event
   * @param service service wrapped in content
   */
  onServiceStarted = ({ content: service }) => {
    const { entity, dispatchRunService } = this.props
    dispatchRunService(new PluginServiceRunModel(
      service,
      target.buildOneElementTarget(entity.content.id),
    ))
  }

  render() {
    const subComponentProperties = omit(this.props, OneElementServicesContainer.NON_REPORTED_PROPS)
    const { services } = this.state
    return (
      <OneElementServicesComponent
        services={services}
        onServiceStarted={this.onServiceStarted}
        {...subComponentProperties}
      />
    )
  }
}
export default connect(
  OneElementServicesContainer.mapStateToProps,
  OneElementServicesContainer.mapDispatchToProps,
)(OneElementServicesContainer)
