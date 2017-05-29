/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { PluginMetaData, PluginConfiguration } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import GenericPluginParameter from './GenericPluginParameter'
import { mapPluginParameterToPluginParameterType, parameterTypeToEmptyParameter } from '../../../model/plugin/utils'
import moduleStyles from '../../../styles/styles'

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

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { pluginConfiguration, pluginMetaData, formMode, change } = this.props
    const pluginParameterTypeList = pluginMetaData && pluginMetaData.content.parameters
    const pluginParameterListIfExistingConfiguration = pluginConfiguration && pluginConfiguration.content.parameters
    const pluginParameterListIfNoConfiguration = pluginMetaData && map(pluginParameterTypeList, parameterTypeToEmptyParameter)
    const pluginParameterList = pluginParameterListIfExistingConfiguration || pluginParameterListIfNoConfiguration

    const styles = moduleStyles(this.context.muiTheme)

    return (
      <Card style={styles.pluginConfiguration.form.section}>
        <CardTitle title={this.context.intl.formatMessage({ id: 'microservice-management.plugin.parameter.list.title' })} />
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
