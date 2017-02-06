/**
 * LICENSE_PLACEHOLDER
 */
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import ModuleListComponent from './ModuleListComponent'
import ModuleShape from '../model/ModuleShape'

/**
 * Component to display all available modules for a given container
 * with messages internationalisation provider
 * @author Sébastien Binda
 */
class ModuleListProvider extends React.PureComponent {

  static propTypes = {
    container: React.PropTypes.string,
    modules: React.PropTypes.arrayOf(ModuleShape),
    onModuleSelection: React.PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <I18nProvider messageDir="utils/modules/src/i18n">
        <ModuleListComponent
          container={this.props.container}
          modules={this.props.modules}
          onModuleSelection={this.props.onModuleSelection}
        />
      </I18nProvider>
    )
  }
}

export default ModuleListProvider
