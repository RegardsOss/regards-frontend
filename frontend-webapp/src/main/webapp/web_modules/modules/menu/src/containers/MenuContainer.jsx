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
    appName: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme } = this.context
    console.log(this.props)
    const title = this.props.title ? this.props.title : 'Regards'
    const style = {
      headContainer: {
        classes: moduleTheme.classes.join(' '),
        styles: moduleTheme.bar,
      },
      title: moduleTheme.title,
    }

    console.log('CONTAINER', this.context)

    return (
      <Toolbar className={style.headContainer.classes} style={style.headContainer.styles}>
        <ToolbarGroup firstChild>
          <ToolbarTitle text={title} style={style.title} />
        </ToolbarGroup>
        <ToolbarGroup>
          <AuthenticationMenuContainer appName={this.props.appName} />
          <ToolbarSeparator />
          <SelectLocaleContainer />
          <ToolbarSeparator />
          <SelectThemeContainer />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default MenuComponent
