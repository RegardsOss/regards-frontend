import { SelectLocaleContainer } from '@regardsoss/i18n'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { SelectThemeContainer, themeContextType } from '@regardsoss/theme'

class MenuComponent extends React.Component {

  static contextTypes= {
    ...themeContextType,
  }

  render() {
    const style = {
      headContainer: {
        classes: this.context.muiTheme.menu.classes.join(' '),
        styles: Object.assign(
          {},
          this.context.muiTheme.menu.bar,
          { fontFamily: this.context.muiTheme.fontFamily },
        ),
      },
      title: this.context.muiTheme.menu.title,
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
