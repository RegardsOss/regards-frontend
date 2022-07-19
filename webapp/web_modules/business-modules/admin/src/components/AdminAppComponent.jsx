/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ProjectHandler } from '@regardsoss/project-handler'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { I18nProvider } from '@regardsoss/i18n'
import { ThemeProvider } from '@regardsoss/theme'
import { BrowserCheckerDialog, ReactErrorBoundaryComponent } from '@regardsoss/components'
import AdminLayout from '../containers/AdminLayout'
import AuthenticationContainer from '../containers/AuthenticationContainer'
import messages from '../i18n'

/**
 * React components to manage the instance application.
 * This components displays admin layout or login form if the user is not connected
 */
class AdminAppComponent extends React.Component {
  static propTypes = {
    isLoadingEndpoints: PropTypes.bool.isRequired,
    content: PropTypes.element,
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    scope: PropTypes.string,
    currentRole: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool,
    isInstance: PropTypes.bool,
    initializeApplication: PropTypes.func.isRequired,
    fetchEndpoints: PropTypes.func,
  }

  renderLayout = () => (
    <AdminLayout {...this.props}>
      {this.props.content}
    </AdminLayout>
  )

  render() {
    const {
      isAuthenticated, scope, params: { project }, isInstance, isLoadingEndpoints,
    } = this.props

    return (
      <ReactErrorBoundaryComponent>
        <div>
          { /** Project handler */
            isInstance || !project ? null : <ProjectHandler projectName={project} title="Administration" />
          }
          <ThemeProvider>
            <I18nProvider messages={messages}>
              {/* Force authentication */}
              <AuthenticationContainer scope={scope} isAuthenticated={isAuthenticated}>
                {/* Check browser version and warn user */}
                <BrowserCheckerDialog browserRequirements={STATIC_CONF.BROWSER_REQUIREMENTS} />
                {/* Main render tree */}
                <LoadableContentDisplayDecorator isLoading={isLoadingEndpoints}>
                  {this.renderLayout}
                </LoadableContentDisplayDecorator>
              </AuthenticationContainer>
            </I18nProvider>
          </ThemeProvider>
        </div>
      </ReactErrorBoundaryComponent>
    )
  }
}

export default AdminAppComponent
