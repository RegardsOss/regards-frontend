/**
 * LICENSE_PLACEHOLDER
 **/
import { SelectLocaleContainer } from '@regardsoss/i18n'
import { SelectThemeContainer, themeContextType } from '@regardsoss/theme'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

/**
 * Main component of module menu
 **/
class MenuComponent extends React.Component {

  static propTypes = {
    appName: React.PropTypes.string.isRequired,
  }

  static contextTypes= {
    ...themeContextType,
  }

  render() {
    const menuTheme = this.context.muiTheme[this.props.appName].modules.common.menu
    const style = {
      headContainer: {
        classes: menuTheme.classes.join(' '),
        styles: Object.assign(
          {},
          menuTheme.bar,
          { fontFamily: this.context.muiTheme.fontFamily },
        ),
      },
      title: menuTheme.title,
    }

    return (
      <Toolbar className={style.headContainer.classes} style={style.headContainer.styles}>
        <ToolbarGroup firstChild>
          <ToolbarTitle text="REGARDS portal" style={style.title} />
        </ToolbarGroup>
        <ToolbarGroup>
          <SelectLocaleContainer />
          <ToolbarSeparator />
          <SelectThemeContainer />
        </ToolbarGroup>
      </Toolbar>
    )
  }

}
export default MenuComponent
