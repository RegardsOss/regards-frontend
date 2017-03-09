/**
 * LICENSE_PLACEHOLDER
 **/
import { SelectLocaleContainer } from '@regardsoss/i18n'
import { SelectThemeContainer, themeContextType } from '@regardsoss/theme'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
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
      displayAuthentication: React.PropTypes.bool.isRequired,
      displayLocaleSelector: React.PropTypes.bool.isRequired,
      displayThemeSelector: React.PropTypes.bool.isRequired,
    }),
  }

  static contextTypes = {
    ...themeContextType,
  }

  displaySeparator = (elt) => {
    if (elt === null) {
      return {
        display: 'none',
      }
    }
    return {}
  }

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
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default MenuContainer
