/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import AboutIcon from 'mdi-material-ui/LightbulbOutline'
import { CommonShapes } from '@regardsoss/shape'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Project about page link component
* @author Raphaël Mechali
*/
class ProjectAboutPageLinkComponent extends React.Component {
  static propTypes = {
    // CONTEXT: app name
    appName: PropTypes.string.isRequired,
    // CONTEXT: project
    project: PropTypes.string,
    // project about page
    projectAboutPage: CommonShapes.URL,
    // When true, do not show the about page on click (used in PREVIEW mode)
    hidePage: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      appName, project, projectAboutPage, hidePage,
    } = this.props
    const { intl: { formatMessage } } = this.context

    // prepare button that will trigger about page displaying
    const buttonComponent = (
      <IconButton title={formatMessage({ id: 'AboutPageTooltip' })}>
        <AboutIcon />
      </IconButton>)

    if (hidePage) {
      // show only the button
      return buttonComponent
    }

    // full about page view: let the module customize button to trigger the show about page event
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const searchFacetsModule = { // eslint wont fix : due to intl context system, resolved only at render, button cannot be created elsewhere
      type: modulesManager.AllDynamicModuleTypes.PROJECT_ABOUT_PAGE,
      active: true,
      applicationId: appName,
      conf: {
        htmlPath: projectAboutPage,
        buttonComponent,
      },
    }
    return (
      <LazyModuleComponent
        project={project}
        appName={appName}
        module={searchFacetsModule}
      />)
  }
}
export default ProjectAboutPageLinkComponent
