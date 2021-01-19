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
import has from 'lodash/has'
import { browserHistory } from 'react-router'
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { AccessProjectClient } from '@regardsoss/client'
import { AccessShapes } from '@regardsoss/shape'
import { ErrorCardComponent } from '@regardsoss/components'
import { modulesManager } from '@regardsoss/modules'

const modulesSelectors = AccessProjectClient.getModuleSelectors()

/**
 * Render a component that redirects the user to a module using its type
 * @author Léo Mieulet
 */
export class RedirectContainer extends React.Component {
  /**
   * @type {{theme: string, content: React.Component}}
   */
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // mapStateToProps
    modules: AccessShapes.ModuleList,
  }

  static mapStateToProps = (state, ownProps) => ({
    modules: modulesSelectors.getList(state),
  })

  /**
   * Return an errorMessage or redirect the user
   */
  redirectUser = () => {
    const { modules, params: { project } } = this.props
    const currentLocation = browserHistory.getCurrentLocation()
    let errorCause
    // Retrieve the URI param named module
    if (has(currentLocation, 'query.module')) {
      const {
        module: moduleRequestedName,
        ...otherParams
      } = currentLocation.query
      const moduleRequested = modulesManager.findFirstModuleByType(modules, moduleRequestedName)
      if (moduleRequested) {
        // Redirect the user
        const nextPath = UIDomain.getModuleURL(project, moduleRequested.content.id)
        browserHistory.push({
          pathname: nextPath,
          // Reports any query param not used here to that module
          query: otherParams,
        })
      } else {
        // there is no existing module of that type
        errorCause = `The module "${moduleRequestedName}" you're trying to access doesn't exist`
      }
    } else {
      // Bad usage
      errorCause = `No module name provided, the redirection can't be done. Usage: user/${project}/redirect?module=news`
    }
    return errorCause
  }

  /**
   * Do not show anything while redirecting the user
   * @returns {React.Component}
   */
  render() {
    const errorCause = this.redirectUser()
    if (errorCause) {
      return (<ErrorCardComponent
        message={errorCause}
      />)
    }
    return null
  }
}

export default connect(RedirectContainer.mapStateToProps)(RedirectContainer)
