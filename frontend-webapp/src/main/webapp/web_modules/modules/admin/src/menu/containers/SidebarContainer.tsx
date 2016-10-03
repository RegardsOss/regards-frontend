import SidebarComponent from "../components/SidebarComponent"
import { I18nProvider } from "@regardsoss/i18n"
import { ThemeInjector } from "@regardsoss/theme"
class SidebarContainer extends React.Component<{}, {}> {

  render (): JSX.Element {

    return (
      <I18nProvider messageDir='modules/admin/src/menu/i18n'>
        <ThemeInjector>
          <SidebarComponent theme={null} />
        </ThemeInjector>
      </I18nProvider>
    )
  }

}

export default SidebarContainer
