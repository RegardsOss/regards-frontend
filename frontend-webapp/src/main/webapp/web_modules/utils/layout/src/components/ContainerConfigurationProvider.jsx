import {I18nProvider} from '@regardsoss/i18n'
import ContainerShape from '../model/ContainerShape'
import ContainerConfigurationComponent from './ContainerConfigurationComponent'

class ContainerConfigurationProvider extends React.Component {

  static propTypes = {
    container: ContainerShape,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
  }

  render() {
    return (
      <I18nProvider messageDir="utils/layout/src/i18n">
        <ContainerConfigurationComponent
          {...this.props}
        />
      </I18nProvider>
    )
  }

}

export default ContainerConfigurationProvider