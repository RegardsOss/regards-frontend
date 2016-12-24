/**
 * LICENSE_PLACEHOLDER
 **/
import { SelectLocaleContainer } from '@regardsoss/i18n'
import { SelectThemeContainer, themeContextType } from '@regardsoss/theme'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import AuthenticationMenuContainer from './AuthenticationMenuContainer'

/**
 * Main component of module menu
 **/
class MenuContainer extends React.Component {

  static propTypes = {
    // Set by module loader (LazyModuleComponent)
    project: React.PropTypes.string,
    appName: React.PropTypes.string.isRequired,
    // Module configuration.
    title: React.PropTypes.string,
    displayAuthentication: React.PropTypes.bool.isRequired,
    displayLocaleSelector: React.PropTypes.bool.isRequired,
    displayThemeSelector: React.PropTypes.bool.isRequired,
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
    const title = this.props.title ? this.props.title : ''
    const style = {
      headContainer: {
        classes: moduleTheme.classes.join(' '),
        styles: moduleTheme.bar,
      },
      title: moduleTheme.title,
    }
    let authentication = null
    if (this.props.displayAuthentication) {
      authentication = (
        <AuthenticationMenuContainer appName={this.props.appName} project={this.props.project} />
      )
    }

    let themeSelector = null
    if (this.props.displayThemeSelector) {
      themeSelector = (
        <SelectThemeContainer />
      )
    }

    let localeSelector = null
    if (this.props.displayLocaleSelector) {
      localeSelector = (
        <SelectLocaleContainer />
      )
    }

    return (
      <Toolbar className={style.headContainer.classes} style={style.headContainer.styles}>
        <ToolbarGroup firstChild>
          <ToolbarTitle text={title} style={style.title} />
        </ToolbarGroup>
        <ToolbarGroup>
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
