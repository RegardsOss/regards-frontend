import { I18nProvider } from '@regardsoss/i18n'
import ContainerShape from '../model/ContainerShape'
import ContainerConfigurationComponent from './ContainerConfigurationComponent'

class ContainerConfigurationProvider extends React.Component {

  static propTypes = {
    container: ContainerShape,
    hideDynamicContentOption: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
  }

  render() {
    return (
      <I18nProvider messageDir="utils/layout/src/i18n">
        <ContainerConfigurationComponent
          container={this.props.container}
          hideDynamicContentOption={this.props.hideDynamicContentOption}
          onCancel={this.props.onCancel}
          onSubmit={this.props.onSubmit}
        />
      </I18nProvider>
    )
  }

}

export default ContainerConfigurationProvider
