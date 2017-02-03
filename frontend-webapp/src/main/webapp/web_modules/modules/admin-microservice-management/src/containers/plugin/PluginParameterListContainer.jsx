/**
 * LICENSE_PLACEHOLDER
 **/
import { chain, map, find } from 'lodash'
import { reduxForm } from 'redux-form'
import { Toggle } from 'redux-form-material-ui'
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { connect } from '@regardsoss/redux'
import { PluginMetaData, PluginConfiguration } from '@regardsoss/model'
import GenericPluginParameter from '../../components/plugin/parameter/GenericPluginParameter'
import PluginMetaDataSelectors from '../../model/plugin/PluginMetaDataSelectors'
import { mapPluginParameterToPluginParameterType, parameterTypeToEmptyParameter } from '../../model/plugin/utils'
import moduleStyles from '../../styles/styles'

const styles = moduleStyles()

/**
 * Container connecting the plugin parameter list to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginParameterListContainer extends React.Component { //TODO change to component

  static propTypes = {
    // from parent or router
    // params: React.PropTypes.shape({
    //   project: React.PropTypes.string.isRequired,
    //   microserviceName: React.PropTypes.string.isRequired,
    //   pluginId: React.PropTypes.string.isRequired,
    // }),
    pluginConfiguration: PluginConfiguration,
    formMode: React.PropTypes.oneOf(['create', 'edit', 'copy']),
    // from mapStateToProps
    pluginMetaData: PluginMetaData,
    change: React.PropTypes.func, // Callback provided by redux-form in order to manually change a field value
    // from mapDispatchToProps
    // updatePluginConfiguration: React.PropTypes.func,
    // deletePluginConfiguration: React.PropTypes.func,
  }

  render() {
    const { pluginConfiguration, pluginMetaData, formMode, change } = this.props
    const pluginParameterTypeList = pluginMetaData && pluginMetaData.content.parameters
    const pluginParameterListIfExistingConfiguration = pluginConfiguration && pluginConfiguration.content.parameters
    const pluginParameterListIfNoConfiguration = pluginMetaData && map(pluginParameterTypeList, parameterTypeToEmptyParameter)
    const pluginParameterList = pluginParameterListIfExistingConfiguration || pluginParameterListIfNoConfiguration

    return (
      <Card style={{ marginTop: 20 }}>
        <CardTitle title={<FormattedMessage id="microservice-management.plugin.parameter.list.title"/>}/>
        <CardText>
          {map(pluginParameterList, (pluginParameter, index) =>
            <GenericPluginParameter
              key={index}
              fieldKey={`parameters[${index}].value`}
              pluginParameter={pluginParameter}
              pluginParameterType={mapPluginParameterToPluginParameterType(pluginParameter, pluginMetaData)}
              mode={formMode}
              change={change}
            />)}
        </CardText>
      </Card>
    )
  }
}

// const mapStateToProps = (state, ownProps) => ({
//   pluginMetaData: PluginMetaDataSelectors.getById(state, ownProps.pluginConfiguration.content.pluginId),
// })

// const mapDispatchToProps = dispatch => ({
// updatePluginConfiguration: (id, values, microserviceName, pluginId) => dispatch(PluginConfigurationActions.updateEntity(id, values, { microserviceName, pluginId })),
// deletePluginConfiguration: (pluginConfigurationId, microserviceName, pluginId) => dispatch(PluginConfigurationActions.deleteEntity(pluginConfigurationId, { microserviceName, pluginId })),
// })

// export default connect(mapStateToProps)(PluginParameterListContainer)
// export default connect(mapStateToProps, mapDispatchToProps)(PluginParameterListContainer)
export default PluginParameterListContainer
