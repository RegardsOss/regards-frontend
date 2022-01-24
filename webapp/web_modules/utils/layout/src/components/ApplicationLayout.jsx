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
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import { AnchorComponent } from '@regardsoss/components'
import Container from './Container'

/**
 * ApplicationLayout
 * Component to display a customizable layout. The layout configuration is the muiTheme from Theme module.
 * @author Sébastien Binda
 */
class ApplicationLayout extends React.Component {
  static propTypes = {
    project: PropTypes.string,
    appName: PropTypes.string.isRequired,
    layout: AccessShapes.ContainerContent,
    modules: PropTypes.arrayOf(AccessShapes.Module),
    plugins: PropTypes.arrayOf(AccessShapes.UIPluginConf),
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: PropTypes.object,
    dynamicContent: PropTypes.element,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Builds runtime styles (called at render) */
  getRuntimeStyles = () => {
    const { muiTheme } = this.context
    let themeStyle = {}
    if (muiTheme) {
      if (muiTheme.palette.background && muiTheme.palette.background !== '') {
        themeStyle = {
          background: muiTheme.palette.background,
        }
      } else if (muiTheme.palette.backgroundImage) {
        themeStyle = {
          background: `url('${muiTheme.palette.backgroundImage}') no-repeat fixed center center`,
          backgroundSize: 'cover',
        }
      } else {
        themeStyle = {
          background: muiTheme.palette.canvasColor,
        }
      }
    }
    return {
      ...themeStyle,
      ...this.props.style,
    }
  }

  /**
   * Display the layout of the given appName (props parameter) from the current loaded theme.
   * @returns {React.Component}
   */
  render() {
    return (
      <div style={this.getRuntimeStyles()}>
        <AnchorComponent>
          <Container
            appName={this.props.appName}
            project={this.props.project}
            container={this.props.layout}
            modules={this.props.modules}
            plugins={this.props.plugins}
            pluginProps={this.props.pluginProps}
            dynamicContent={this.props.dynamicContent}
            mainContainer
          />
        </AnchorComponent>
      </div>

    )
  }
}

export default ApplicationLayout
