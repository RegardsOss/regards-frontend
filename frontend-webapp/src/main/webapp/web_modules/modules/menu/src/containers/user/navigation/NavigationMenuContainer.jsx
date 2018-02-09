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
import { AccessShapes } from '@regardsoss/shape'
import { modulesManager } from '@regardsoss/modules'
import { i18nSelectors } from '@regardsoss/i18n'
import NavigationModelResolutionContainer from '../../../containers/common/NavigationModelResolutionContainer'
import NavigationLayoutComponent from '../../../components/user/navigation/NavigationLayoutComponent'


/**
 * Navigation menu container
 * @author Raphaël Mechali
 */
export class NavigationMenuContainer extends React.Component {
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
    project: PropTypes.string,
    dynamicModules: PropTypes.arrayOf(AccessShapes.Module).isRequired,
    // from mapStateToProps
    locale: PropTypes.string.isRequired,
  }

  /**
   * Builds module URL
   * @param {number} moduleId module ID
   * @return {string} link URL to module
   */
  buildModuleURL = (moduleId) => {
    const { project } = this.props
    return modulesManager.getModuleURL(project, moduleId)
  }


  render() {
    const { dynamicModules, locale } = this.props
    // TODO-NOW return null when in admin
    return (
      // insert the modules to navigation module resolution container
      <NavigationModelResolutionContainer dynamicModules={dynamicModules} clearNonNavigable>
        {/* main navigation view component */}
        <NavigationLayoutComponent buildModuleURL={this.buildModuleURL} locale={locale} />
      </NavigationModelResolutionContainer>
    )
  }
}

export default connect(NavigationMenuContainer.mapStateToProps)(NavigationMenuContainer)

