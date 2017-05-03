/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { FormattedMessage } from 'react-intl'
import { SelectLocaleContainer } from '@regardsoss/i18n'
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
    project: React.PropTypes.string,
    appName: React.PropTypes.string.isRequired,
    // Module configuration.
    moduleConf: React.PropTypes.shape({
      title: React.PropTypes.string,
      displayAuthentication: React.PropTypes.bool,
      displayLocaleSelector: React.PropTypes.bool,
      displayThemeSelector: React.PropTypes.bool,
    }),
  }

  static contextTypes = {
    ...themeContextType,
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
      return (
        <div>
          <IconButton
            onTouchTap={this.handleToggle}
            tooltip={<FormattedMessage id="menu.modules.list.button" />}
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
          <ToolbarSeparator style={{ ...this.displaySeparator(menu), marginLeft: 10 }} />
          {menu}
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default MenuContainer
