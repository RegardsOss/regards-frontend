/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { PluginMetaData, PluginConfiguration } from '@regardsoss/model'
import GenericPluginParameter from './GenericPluginParameter'
import { mapPluginParameterToPluginParameterType, parameterTypeToEmptyParameter } from '../../../model/plugin/utils'
import moduleStyles from '../../../styles/styles'

const styles = moduleStyles()

/**
 * Container connecting the plugin parameter list to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginParameterListComponent extends React.Component {

  static propTypes = {
    pluginConfiguration: PluginConfiguration,
    formMode: PropTypes.oneOf(['create', 'edit', 'copy']),
    pluginMetaData: PluginMetaData,
    change: PropTypes.func, // Callback provided by redux-form in order to manually change a field value
  }

  render() {
    const { pluginConfiguration, pluginMetaData, formMode, change } = this.props
    const pluginParameterTypeList = pluginMetaData && pluginMetaData.content.parameters
    const pluginParameterListIfExistingConfiguration = pluginConfiguration && pluginConfiguration.content.parameters
    const pluginParameterListIfNoConfiguration = pluginMetaData && map(pluginParameterTypeList, parameterTypeToEmptyParameter)
    const pluginParameterList = pluginParameterListIfExistingConfiguration || pluginParameterListIfNoConfiguration

    return (
      <Card style={styles.pluginConfiguration.form.section}>
        <CardTitle title={<FormattedMessage id="microservice-management.plugin.parameter.list.title" />} />
        <CardText>
          {map(pluginParameterList, (pluginParameter, index) =>
            (<GenericPluginParameter
              key={index}
              fieldKey={`parameters[${index}].value`}
              pluginParameter={pluginParameter}
              pluginParameterType={mapPluginParameterToPluginParameterType(pluginParameter, pluginMetaData)}
              mode={formMode}
              change={change}
            />))}
        </CardText>
      </Card>
    )
  }
}

export default PluginParameterListComponent
