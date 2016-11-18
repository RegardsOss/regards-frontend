import { SelectLocaleContainer } from '@regardsoss/i18n'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { SelectThemeContainer, ThemeContextType } from '@regardsoss/theme'

class MenuComponent extends React.Component {

  static contextTypes = ThemeContextType

  render() {
    const style = {
      headContainer: {
        classes: this.context.muiTheme.portalApp.layout.headContainer.classes.join(' '),
        styles: Object.assign(
          {},
          this.context.muiTheme.portalApp.layout.headContainer.styles,
          { fontFamily: this.context.muiTheme.fontFamily },
        ),
      },
      title: this.context.muiTheme.toolbarTitle,
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
