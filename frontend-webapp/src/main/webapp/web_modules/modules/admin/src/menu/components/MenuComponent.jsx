import { SelectLocaleContainer, I18nProvider } from '@regardsoss/i18n'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { SelectThemeContainer } from '@regardsoss/theme'

class InstanceMenuComponent extends React.Component {

  static contextTypes= {
    muiTheme: React.PropTypes.object.isRequired,
  }

  render() {
    const style = {
      headContainer: {
        classes: this.context.muiTheme.adminApp.layout.headContainer.classes.join(' '),
        styles: Object.assign(
          {},
          this.context.muiTheme.adminApp.layout.headContainer.styles,
          { fontFamily: this.context.muiTheme.fontFamily },
        ),
      },
      title: this.context.muiTheme.toolbarTitle,
    }

    return (
      <I18nProvider messageDir="modules/admin/src/menu/i18n">
        <Toolbar className={style.headContainer.classes} style={style.headContainer.styles}>
          <ToolbarGroup firstChild>
            <ToolbarTitle text="REGARDS admin dashboard" style={style.title} />
          </ToolbarGroup>

          <ToolbarGroup>
            <SelectLocaleContainer />

            <ToolbarSeparator />

            <SelectThemeContainer />
          </ToolbarGroup>
        </Toolbar>
      </I18nProvider>
    )
  }

}
export default InstanceMenuComponent
