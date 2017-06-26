/**
 * LICENSE_PLACEHOLDER
 */
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import ModuleListButtonComponent from './ModuleListButtonComponent'

/**
 * Component to display all available modules for a given container
 * with messages internationalisation provider
 * @author Sébastien Binda
 */
class ModuleListProvider extends React.Component {

  static propTypes = {
    container: PropTypes.string,
    modules: AccessShapes.ModuleArray,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <I18nProvider messageDir="utils/modules/src/i18n">
        <ModuleListButtonComponent
          container={this.props.container}
          modules={this.props.modules}
        />
      </I18nProvider>
    )
  }
}

export default ModuleListProvider
