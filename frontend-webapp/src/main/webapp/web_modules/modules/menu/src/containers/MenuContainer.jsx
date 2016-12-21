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
class MenuComponent extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
    appName: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    displayAuthentication: React.PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    console.log("MENU",this.props)
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
    let separator = null
    if (this.props.displayAuthentication) {
      authentication = <AuthenticationMenuContainer appName={this.props.appName} project={this.props.project}/>
      separator = <ToolbarSeparator />
    }

    return (
      <Toolbar className={style.headContainer.classes} style={style.headContainer.styles}>
        <ToolbarGroup firstChild>
          <ToolbarTitle text={title} style={style.title} />
        </ToolbarGroup>
        <ToolbarGroup>
          {authentication}
          {separator}
          <SelectLocaleContainer />
          <ToolbarSeparator />
          <SelectThemeContainer />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default MenuComponent
