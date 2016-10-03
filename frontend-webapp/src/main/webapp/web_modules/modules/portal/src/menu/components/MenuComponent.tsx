import { SelectLocaleContainer } from "@regardsoss/i18n"
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar"
import { SelectThemeContainer, ThemeContextInterface, ThemeContextType } from "@regardsoss/theme"

class MenuComponent extends React.Component<{}, {}> {

  static contextTypes: Object = ThemeContextType
  context: ThemeContextInterface

  render (): JSX.Element {
    const style = {
      headContainer: {
        classes: this.context.muiTheme.portalApp.layout.headContainer.classes.join(' '),
        styles: Object.assign(
          {},
          this.context.muiTheme.portalApp.layout.headContainer.styles,
          {fontFamily: this.context.muiTheme.fontFamily}
        ),
      },
      title: this.context.muiTheme.toolbarTitle,
    }

    return (
      <Toolbar className={style.headContainer.classes} style={style.headContainer.styles}>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text="REGARDS portal" style={style.title}/>
        </ToolbarGroup>
        <ToolbarGroup>
          <SelectLocaleContainer locales={['en','fr']}/>
          <ToolbarSeparator />
          <SelectThemeContainer />
        </ToolbarGroup>
      </Toolbar>
    )
  }

}
export default MenuComponent
