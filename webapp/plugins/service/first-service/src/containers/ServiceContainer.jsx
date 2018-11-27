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
import React from 'react'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import ServiceComponent from '../components/ServiceComponent'

/**
 * Main first-service plugin container
 * @author Its me
 */
export class ServiceContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { runtimeTarget }) {
    return {
      // we apply partially the method getReducePromise to ignore dispatch reference at runtime
      getReducePromise: (reducer, initialValue) => runtimeTarget.getReducePromise(dispatch, reducer, initialValue),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    pluginInstanceId: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    runtimeTarget: AccessShapes.RuntimeTarget.isRequired,
    configuration: AccessShapes.RuntimeConfiguration.isRequired,
    // From mapDispatchToProps
    getReducePromise: PropTypes.func.isRequired, // partially applied reduce promise, see mapStateToProps and later code demo
  }

  state = {
    loading: true,
    builtObjectsMessage: '',
  }

  componentDidMount() {
    // Start fetching and converting entities
    const { getReducePromise, configuration: { dynamic: { separator, endWithDot, fieldPath } } } = this.props

    getReducePromise((builtObjectsMessage, entity) => {
      const currentEntityValue = get(entity, fieldPath)
      if (isNil(builtObjectsMessage)) {
        // first entity: do not set comparator
        return currentEntityValue
      }
      // append current entity value at end
      return `${builtObjectsMessage}${separator}${currentEntityValue || '-'}`
    }, null)
      .then((currentMessage) => {
        let builtObjectsMessage = null
        // return null when message could not be built
        if (!isNil(currentMessage)) {
          // Add final '.', according with configuration
          builtObjectsMessage = currentMessage
          if (endWithDot) {
            builtObjectsMessage += '.'
          }
        }
        this.setState({ loading: false, builtObjectsMessage })
      })
      .catch(err => this.setState({ loading: false, builtObjectsMessage: null }))
  }


  render() {
    const { configuration: { static: { headerMessage } } } = this.props
    const { loading, builtObjectsMessage } = this.state
    return (
      <ServiceComponent
        loading={loading}
        headerMessage={headerMessage}
        builtObjectsMessage={builtObjectsMessage}
      />
    )
  }
}

// export REDUX connected container
export default connect(null, ServiceContainer.mapDispatchToProps)(ServiceContainer)
