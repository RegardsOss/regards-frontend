/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { AccessProjectClient } from '@regardsoss/client'
import { LazyModuleComponent } from '@regardsoss/modules'
import { AccessShapes } from '@regardsoss/shape'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'

// get default modules client selector
const modulesSelectors = AccessProjectClient.ModuleSelectors()

/**
 * Component to display the dynamic content of the application.
 * The dynamic content is one of the modules associated to the dynamic container content.
 * The module to display is retrieved from the url from react-router /modules/moduleId
 */
class DynamicContentContainer extends React.Component {

  /**
   * @type {{theme: string, content: React.Component}}
   */
  static propTypes = {
    // From React router
    params: PropTypes.shape({
      project: PropTypes.string,
      moduleId: PropTypes.string,
    }),
    // Module to display
    module: AccessShapes.Module,
    // Function to throw an error
    throwError: PropTypes.func,
  }

  componentDidMount() {
    if (!this.props.module) {
      const message = `No module found for id=${this.props.params.moduleId}`
      console.warn(message)
      this.props.throwError(message)
    }
  }

  render() {
    if (this.props.module) {
      return (
        <LazyModuleComponent
          key={this.props.module.content.id}
          appName={'user'}
          project={this.props.params.project}
          module={this.props.module.content}
        />
      )
    }

    return null
  }

}

const mapStateToProps = (state, ownProps) => ({
  module: modulesSelectors.getById(state, ownProps.params.moduleId),
})

const mapDispatchToProps = dispatch => ({
  throwError: message => dispatch(ApplicationErrorAction.throwError(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DynamicContentContainer)
