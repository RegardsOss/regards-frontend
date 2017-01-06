/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import ApplicationThemeComponent from '../components/ApplicationThemeComponent'

/**
 * React container connecting {@link ApplicationThemeComponent} to redux and providing internationalization.
 *
 * @author Xavier-Alexandre Brochard
 */
class ApplicationThemeContainer extends React.Component {

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <I18nProvider messageDir="modules/ui-configuration/src/i18n">
        <ApplicationThemeComponent />
      </I18nProvider>
    )
  }
}

export default ApplicationThemeContainer
