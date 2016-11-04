import { I18nProvider } from '@regardsoss/i18n'
import { ThemeInjector } from '@regardsoss/theme'
import SidebarComponent from '../components/SidebarComponent'

class SidebarContainer extends React.Component {

  render() {
    return (
      <I18nProvider messageDir="modules/admin/src/menu/i18n">
        <ThemeInjector>
          <SidebarComponent theme={null} />
        </ThemeInjector>
      </I18nProvider>
    )
  }

}

export default SidebarContainer
