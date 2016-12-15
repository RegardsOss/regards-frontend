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
    const { moduleTheme } = this.context

    const style = {
      headContainer: {
        classes: moduleTheme.classes.join(' '),
        styles: moduleTheme.bar,
      },
      title: moduleTheme.title,
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
