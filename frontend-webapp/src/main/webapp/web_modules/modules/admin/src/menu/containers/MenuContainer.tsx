import { I18nProvider } from "@regardsoss/i18n"
import MenuComponent from "../components/MenuComponent"

class MenuContainer extends React.Component<{}, {}> {

  render (): JSX.Element {

    return (
      <I18nProvider messageDir='modules/admin/src/menu/i18n'>
        <MenuComponent />
      </I18nProvider>
    )
  }

}

export default MenuContainer
