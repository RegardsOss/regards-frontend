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
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { SelectLocaleContainer, i18nContextType } from '@regardsoss/i18n'
import { SelectThemeContainer, themeContextType } from '@regardsoss/theme'
import { ModuleListContainer } from '@regardsoss/modules'
import AuthenticationMenuContainer from './AuthenticationMenuContainer'

/**
 * Main component of module menu
 * @author Sébastien binda
 **/
class MenuContainer extends React.Component {

  static propTypes = {
    // Set by module loader (LazyModuleComponent)
    project: PropTypes.string,
    appName: PropTypes.string.isRequired,
    // Module configuration.
    moduleConf: PropTypes.shape({
      title: PropTypes.string,
      displayAuthentication: PropTypes.bool,
      displayLocaleSelector: PropTypes.bool,
      displayThemeSelector: PropTypes.bool,
    }),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      moduleListOpen: false,
    }
  }

  displaySeparator = (elt) => {
    if (elt === null) {
      return {
        display: 'none',
      }
    }
    return {
      marginLeft: 0,
    }
  }

  displayModulesMenu = () => {
    if (this.props.appName === 'user') {
      const { intl } = this.context
      return (
        <div>
          <IconButton
            onTouchTap={this.handleToggle}
            tooltip={intl.formatMessage({ id: 'menu.modules.list.button' })}
          >
            <MenuIcon />
          </IconButton>
          <ModuleListContainer
            project={this.props.project}
            open={this.state.moduleListOpen}
            onCloseMenu={this.handleClose}
          />
        </div>
      )
    }
    return null
  }

  /**
   * Toggle the sidebar containing modules
   */
  handleToggle = () => this.setState({ moduleListOpen: !this.state.moduleListOpen })

  /**
   * Close the sidebar containing modules
   */
  handleClose = () => this.setState({ moduleListOpen: false })

  render() {
    const { moduleTheme } = this.context
    const title = this.props.moduleConf.title ? this.props.moduleConf.title : ''
    const style = {
      headContainer: {
        styles: moduleTheme.bar,
      },
      title: moduleTheme.title,
    }
    let authentication = null
    if (this.props.moduleConf.displayAuthentication) {
      authentication = (
        <AuthenticationMenuContainer appName={this.props.appName} project={this.props.project} />
      )
    }

    let themeSelector = null
    if (this.props.moduleConf.displayThemeSelector) {
      themeSelector = (
        <SelectThemeContainer />
      )
    }

    let localeSelector = null
    if (this.props.moduleConf.displayLocaleSelector) {
      localeSelector = (
        <SelectLocaleContainer />
      )
    }

    const menu = this.displayModulesMenu()

    const toolBarStyle = { ...this.displaySeparator(menu), marginLeft: 10 }

    return (
      <Toolbar style={style.headContainer.styles}>
        <ToolbarGroup firstChild>
          <ToolbarTitle text={title} style={style.title} />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          {authentication}
          <ToolbarSeparator style={this.displaySeparator(localeSelector)} />
          {localeSelector}
          <ToolbarSeparator style={this.displaySeparator(themeSelector)} />
          {themeSelector}
          <ToolbarSeparator style={toolBarStyle} />
          {menu}
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default MenuContainer
