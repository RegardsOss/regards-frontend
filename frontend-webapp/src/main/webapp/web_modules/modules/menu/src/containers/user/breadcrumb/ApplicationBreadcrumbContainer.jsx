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
import get from 'lodash/get'
import head from 'lodash/head'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { modulesManager } from '@regardsoss/modules'
import { AccessShapes } from '@regardsoss/shape'
import { i18nSelectors } from '@regardsoss/i18n'
import ApplicationBreadcrumbComponent from '../../../components/user/breadcrumb/ApplicationBreacrumbComponent'


/**
 * Application breadcrumb container. It resolves the HOME MODULE (page.home) and binds the current module
 * @author Raphaël Mechali
 */
export class ApplicationBreadcrumbContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      locale: i18nSelectors.getLocale(state),
    }
  }

  static propTypes = {
    // configured project title
    title: PropTypes.string,
    // project name, used as default when there is no project title
    project: PropTypes.string.isRequired,
    // current module id
    // eslint-disable-next-line react/no-unused-prop-types
    currentModuleId: PropTypes.number, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicModules: PropTypes.arrayOf(AccessShapes.Module).isRequired, // used only in onPropertiesUpdated
    // from mapStateToProps
    locale: PropTypes.string,
  }

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
    if (!isEqual(oldProps.dynamicModules, newProps.dynamicModules) ||
      !isEqual(oldProps.currentModuleId, newProps.currentModuleId)) {
      // 1- retrieve the home module (the more marked as home page or the first one)
      const { project, currentModuleId, dynamicModules } = newProps
      const homeModule = dynamicModules.find(module => get(module, 'content.page.home')) || head(dynamicModules)
      const homeURL = homeModule ? modulesManager.getModuleURL(project, homeModule.content.id) : null

      // 2 - retrieve current module (do not show it if it is home)
      const homeModuleId = get(homeModule, 'content.id')
      const selectedModule = currentModuleId && currentModuleId !== homeModuleId ?
        dynamicModules.find(module => get(module, 'content.id') === currentModuleId) : null

      const newState = { homeURL, selectedModule }
      if (!isEqual(newState, this.state)) {
        this.setState(newState)
      }
    }
  }

  render() {
    const { title, project, locale } = this.props
    const { homeURL, selectedModule } = this.state
    return (
      <ApplicationBreadcrumbComponent
        homeLabel={title || project}
        homeURL={homeURL}
        selectedModule={selectedModule}
        locale={locale}
      />
    )
  }
}
export default connect(ApplicationBreadcrumbContainer.mapStateToProps)(ApplicationBreadcrumbContainer)