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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SelectLocaleContainer } from '@regardsoss/i18n-ui'
import { SelectThemeContainer } from '@regardsoss/theme-ui'
import { CommonShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/components'
import AuthenticationMenuContainer from '../containers/AuthenticationMenuContainer'
import CartSelectorContainer from '../containers/CartSelectorContainer'
import ModulesNavigatorContainer from '../containers/ModulesNavigatorContainer'
import ProjectAboutPageLinkContainer from '../containers/ProjectAboutPageLinkContainer'
import ContactComponent from './ContactComponent'

/**
* Main menu module component
* @author Raphaël Mechali
*/
class MainMenuComponent extends React.Component {

  static propTypes = {
    appName: PropTypes.string,
    project: PropTypes.string,

    title: PropTypes.string,
    contacts: PropTypes.string,
    displayAuthentication: PropTypes.bool,
    displayCartSelector: PropTypes.bool,
    displayLocaleSelector: PropTypes.bool,
    displayThemeSelector: PropTypes.bool,
    projectAboutPage: CommonShapes.URL,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { title, displayAuthentication, displayCartSelector,
      displayLocaleSelector, displayThemeSelector, projectAboutPage, contacts } = this.props
    const { moduleTheme: { user: { rootStyle, titleGroup, optionsGroup } }, muiTheme } = this.context

    return (
      <div style={rootStyle}>
        <div style={optionsGroup}>
          {/* navigation menu */}
          <ModulesNavigatorContainer appName={this.props.appName} project={this.props.project} />
        </div>
        <div style={titleGroup} >
          { /* Title */
            title
          }
        </div>
        {/* Authentication access, state and options */}
        <AuthenticationMenuContainer display={displayAuthentication} appName={this.props.appName} project={this.props.project} />
        {/* User cart stateful link */}
        <ShowableAtRender show={!!displayCartSelector}>
          <CartSelectorContainer project={this.props.project} />
        </ShowableAtRender>
        {/* Contact project team */}
        <ContactComponent contacts={contacts} />
        {/* About project if any (display should be in container) */}
        <ProjectAboutPageLinkContainer projectAboutPage={projectAboutPage} appName={this.props.appName} project={this.props.project} />
        {/* UI Options: theme  */}
        <ShowableAtRender show={displayThemeSelector} >
          <SelectThemeContainer />
        </ShowableAtRender>
        {/* UI Options: locale  */}
        <ShowableAtRender show={displayLocaleSelector} >
          <SelectLocaleContainer muiTheme={muiTheme} />
        </ShowableAtRender>

      </div>
    )
  }
}
export default MainMenuComponent
