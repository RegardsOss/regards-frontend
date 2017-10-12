/**
* LICENSE_PLACEHOLDER
**/
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { CommonClient, CatalogClient } from '@regardsoss/client'
import { AdminPluginConfigurationSchemaConfiguration, PluginMetaDataConfiguration } from '@regardsoss/api'
import { RuntimeTargetTypes } from '@regardsoss/domain/access'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { FileContentDisplayer } from '@regardsoss/components'
import { ServiceTargetShape } from '../../../model/ServiceTargetShape'
import RunServiceDialogConnectedComponent, { RunServiceDialogComponent } from '../../../components/services/RunServiceDialogComponent'
import PreviousButton from '../../../components/services/PreviousButton'
import DownloadResultButton from '../../../components/services/catalog/DownloadResultButton'
import { resolveParametersWithTypes } from '../../../definitions/CatalogPluginServiceHelper'
/**
* Container to show configuration and run of a catalog plugin service
* Note: it uses lifecycle (mount) to fetch plugin configuration and metadata, then it resolves edition parameters.
*/
export class RunCatalogPluginServiceContainer extends React.Component {

  static Steps = {
    // Init 1: fetch plugin configuration
    FETCH_PLUGIN_CONFIGURATION: 'FETCH_PLUGIN_CONFIGURATION',
    // Init 1 error
    PLUGIN_CONFIGURATION_ERROR: 'PLUGIN_CONFIGURATION_ERROR',
    // Init 2: fetch plugin metadata
    FETCH_PLUGIN_METADATA: 'FETCH_PLUGIN_METADATA',
    // Init 2 error
    PLUGIN_METADATA_ERROR: 'PLUGIN_METADATA_ERROR',
    // Post init error: configuration seems wrong
    PARAMETERS_CONVERSION_ERROR: 'PARAMETERS_CONVERSION_ERROR',
    // Configuring parameters
    PARAMETERS_CONFIGURATION: 'PARAMETERS_CONFIGURATION',
    // Remote apply service
    FETCH_APPLY_SERVICE: 'FETCH_APPLY_SERVICE',
    // apply failed
    APPLY_SERVICE_ERROR: 'APPLY_SERVICE_ERROR',
    // Apply successful, showing apply result
    APPLY_SERVICE_RESULT: 'APPLY_SERVICE_RESULT',
  }

  static propTypes = {
    // service to run
    service: AccessShapes.PluginService.isRequired,
    // service target (dataobject / dataset / selection) or null
    target: ServiceTargetShape.isRequired,
    // on done / on quit service
    onQuit: PropTypes.func.isRequired,

    // from map dispatch to props
    dispatchFetchPluginConfiguration: PropTypes.func.isRequired,
    dispatchFetchPluginMetaData: PropTypes.func.isRequired,
    dispatchFetchPluginResult: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static DEFAULT_STATE = {
    step: RunCatalogPluginServiceContainer.Steps.FETCH_PLUGIN_CONFIGURATION, // init state
    resolvedParameters: [], // dynamic parameters as resolved using plugin conf and metadata
    userParametersValues: {}, // user entered parameter values
    localAccessURL: null, // local file access URL
    resultFile: null, // apply result, when fetched. Contains content and contentType. It is optional
  }

  /**
   * Component initialization: retrieve configuration, then metadata and finally resolve parameters
   */
  componentWillMount = () => {
    this.setState(RunCatalogPluginServiceContainer.DEFAULT_STATE)
    const { service, dispatchFetchPluginConfiguration } = this.props
    const configId = service.configId
    dispatchFetchPluginConfiguration(configId)
      .then(result => this.onFetchConfigurationDone(result, configId))
      .catch(() => this.onFetchError(RunCatalogPluginServiceContainer.Steps.PLUGIN_CONFIGURATION_ERROR))
  }

  /**
   * On fetch config done : handles error / next fetch
   * @param result fetch result
   * @param configId pluginConfigurationId
   */
  onFetchConfigurationDone = ({ payload, error = false }, configId) => {
    // extract safely the payload content (error case if empty). Note: that object repects regards shapes PluginConfiguration
    const pluginConfiguration = get(payload, `entities.${AdminPluginConfigurationSchemaConfiguration.normalizrKey}.${configId}`)
    if (error || !pluginConfiguration) {
      this.onFetchError(RunCatalogPluginServiceContainer.Steps.PLUGIN_CONFIGURATION_ERROR)
    } else {
      // now fetch meta
      const { dispatchFetchPluginMetaData } = this.props
      this.setState({ step: RunCatalogPluginServiceContainer.Steps.FETCH_PLUGIN_METADATA })
      dispatchFetchPluginMetaData(pluginConfiguration.content.pluginId)
        .then(result => this.onFetchMetaDataDone(result, pluginConfiguration))
        .catch(() => this.onFetchError(RunCatalogPluginServiceContainer.Steps.PLUGIN_METADATA_ERROR))
    }
  }

  /**
   * On fetch meta done : handles error / resolves parameters and enters edition or running step if no parameter resolved
   * @param result fetch result
   * @param pluginConfiguration previously fetched plugin configuration
   **/
  onFetchMetaDataDone = ({ payload, error = false }, pluginConfiguration) => {
    const pluginMetaData = get(payload, `entities.${PluginMetaDataConfiguration.normalizrKey}.${pluginConfiguration.content.pluginId}`)
    if (error || !pluginMetaData) {
      this.onFetchError(RunCatalogPluginServiceContainer.Steps.PLUGIN_METADATA_ERROR)
    } else {
      try {
        // attempt to resolve the parameters
        const resolvedParameters = resolveParametersWithTypes(pluginConfiguration, pluginMetaData)
        // initialization is now complete
        this.onInitializationDone(resolvedParameters)
      } catch (e) {
        this.onFetchError(RunCatalogPluginServiceContainer.Steps.PARAMETERS_CONVERSION_ERROR)
      }
    }
  }

  /**
   * On fetch error handler
   * @param errorStep corresponding error step
   */
  onFetchError = errorStep => this.setState({ step: errorStep })

  /**
   * On initialization done: start normal component workflow (parameters edition and / or)
   * @param resolvedParameters resolved parameters
   */
  onInitializationDone = (resolvedParameters) => {
    if (resolvedParameters.length) {
      // run through parameters configuration
      this.setState({
        step: RunCatalogPluginServiceContainer.Steps.PARAMETERS_CONFIGURATION,
        resolvedParameters,
      })
    } else {
      // No configuration, skip to direct application
      this.onConfigurationDone()
    }
  }

  /** Goes forward, after parameters configuration (if there was any) into the servie applying */
  onConfigurationDone = (formValues = {}) => {
    const { target, service, dispatchFetchPluginResult } = this.props
    // 1 - prepare target parameters
    let targetParams = null
    switch (target.type) {
      case RuntimeTargetTypes.ONE:
        targetParams = { entityId: target.entity }
        break
      case RuntimeTargetTypes.MANY:
        targetParams = { entitiesId: target.entities }
        break
      case RuntimeTargetTypes.QUERY:
        targetParams = { q: target.q, entityType: target.entityType }
        break
      default:
        throw new Error('Invalid target') // development error only
    }
    // 2 - update state and dispatch
    const userParametersValues = formValues
    this.setState({ step: RunCatalogPluginServiceContainer.Steps.FETCH_APPLY_SERVICE, userParametersValues })
    dispatchFetchPluginResult(service.configId, userParametersValues, targetParams)
      .then(this.onServiceResult)
      .catch(() => this.onFetchError(RunCatalogPluginServiceContainer.Steps.APPLY_SERVICE_ERROR))
  }

  /** Service applied successfully, show results if possible */
  onServiceResult = ({ payload = {}, error }) => {
    if (error) {
      this.setState({ step: RunCatalogPluginServiceContainer.Steps.APPLY_SERVICE_ERROR })
    } else {
      const resultFile = payload
      this.setState({
        step: RunCatalogPluginServiceContainer.Steps.APPLY_SERVICE_RESULT,
        localAccessURL: resultFile && resultFile.content ? FileContentDisplayer.buildLocalAccessURL(resultFile.content) : null,
        resultFile,
      })
    }
  }


  /** Enters back the parameters configuration */
  onPrevious = () => this.setState({ step: RunCatalogPluginServiceContainer.Steps.PARAMETERS_CONFIGURATION })

  /** @return {function} previous handler if it should be displayed, nothing otherwise */
  hasPreviousStep = () => !!this.state.resolvedParameters.length

  /** Renders previous option if any */
  renderPreviousOption = () => this.hasPreviousStep() ?
    <PreviousButton key="previous.button" onPrevious={this.onPrevious} /> : null

  /**
   * Returns current render step
   * @return a consumable step for RunServiceDialogComponent
   * }
   */
  renderCurrentStep = () => {
    const { intl: { formatMessage } } = this.context
    const { step, resolvedParameters, userParametersValues, resultFile, localAccessURL } = this.state
    switch (step) {
      // loading states
      case RunCatalogPluginServiceContainer.Steps.FETCH_PLUGIN_CONFIGURATION:
      case RunCatalogPluginServiceContainer.Steps.FETCH_PLUGIN_METADATA:
        return RunServiceDialogComponent.buildLoadingStep(
          formatMessage({ id: 'entities.common.services.loading.plugin.information' }))
      case RunCatalogPluginServiceContainer.Steps.FETCH_APPLY_SERVICE:
        return RunServiceDialogComponent.buildLoadingStep(
          formatMessage({ id: 'entities.common.services.loading.results' }))
      // error states
      case RunCatalogPluginServiceContainer.Steps.PLUGIN_CONFIGURATION_ERROR:
      case RunCatalogPluginServiceContainer.Steps.PLUGIN_METADATA_ERROR:
        return RunServiceDialogComponent.buildMessageStep(
          formatMessage({ id: 'entities.common.services.loading.plugin.failed' }), true)
      case RunCatalogPluginServiceContainer.Steps.PARAMETERS_CONVERSION_ERROR:
        return RunServiceDialogComponent.buildMessageStep(
          formatMessage({ id: 'entities.common.services.plugin.parameters.error' }), true)
      case RunCatalogPluginServiceContainer.Steps.APPLY_SERVICE_ERROR:
        // error after results, allow back if there was plugin configuration
        return RunServiceDialogComponent.buildMessageStep(
          formatMessage({ id: 'entities.common.services.plugin.run.failed' }), true,
          [this.renderPreviousOption()])// custom options: previous
      // configuration state
      case RunCatalogPluginServiceContainer.Steps.PARAMETERS_CONFIGURATION:
        return RunServiceDialogComponent.buildParametersConfigurationStep(resolvedParameters, userParametersValues, this.onConfigurationDone)
      // run results state
      case RunCatalogPluginServiceContainer.Steps.APPLY_SERVICE_RESULT: {
        // 1 - if there is some usable result, provide a result displaying step
        if (localAccessURL) {
          return RunServiceDialogComponent.buildResultsStep(
            <FileContentDisplayer fileAccessURL={localAccessURL} file={resultFile} />, [
              <DownloadResultButton key="download.button" localAccessURL={localAccessURL} />, // custom options: download
              this.renderPreviousOption()]) // custom options: previous
        }
        // 2 - No: just provide a message step saying everything went right
        return RunServiceDialogComponent.buildMessageStep(
          formatMessage({ id: 'entities.common.services.plugin.run.empty' }), false, [this.renderPreviousOption()])
      }
      default:
        throw new Error(`Unknown catalog plugin service launchin step: ${step}`)
    }
  }

  render() {
    const { service, onQuit } = this.props
    return (
      <RunServiceDialogConnectedComponent
        serviceName={service.label}
        currentStep={this.renderCurrentStep()}
        onClose={onQuit}
      />
    )
  }
}

// static: actions instance to fetch locally (we avoid store here as data is volatile)
const pluginConfigurationActions = new CommonClient.PluginConfigurationActions('entities-common/fetch-catalog-service-configuration')
const pluginMetaDataActions = new CommonClient.PluginMetaDataActions('entities-common/fetch-catalog-service-metadata')
const catalogPluginServiceResultActions = new CatalogClient.CatalogPluginServiceResultActions('entities-common/apply-catalog-service')

function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchPluginConfiguration: configId => dispatch(pluginConfigurationActions.fetchEntity(configId, {
      microserviceName: STATIC_CONF.MSERVICES.CATALOG,
    })),
    dispatchFetchPluginMetaData: pluginId => dispatch(pluginMetaDataActions.fetchEntity(pluginId, {
      microserviceName: STATIC_CONF.MSERVICES.CATALOG,
    })),
    dispatchFetchPluginResult: (pluginConfigurationId, dynamicParameters, targetParams) =>
      dispatch(catalogPluginServiceResultActions.fetchResult(pluginConfigurationId, dynamicParameters, targetParams)),
  }
}

export default connect(null, mapDispatchToProps)(RunCatalogPluginServiceContainer)
