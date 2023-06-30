/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { AccessProjectClient } from '@regardsoss/client'
import { UIPluginConfConfiguration } from '@regardsoss/api'
import { loadPlugin } from '@regardsoss/plugins'
import {
  resolveParameters, packRuntimeConfiguration, packPluginProps,
} from '../../../definitions/UIPluginServiceHelper'
import PluginDisplayerContainer from './PluginDisplayerContainer'
import RunServiceDialogConnectedComponent, { RunServiceDialogComponent } from '../../../components/services/RunServiceDialogComponent'
import PreviousButton from '../../../components/services/PreviousButton'

/**
* Container to show configuration and run of a UI plugin service
* Note: it uses lifecycle (mount) to fetch plugin configuration and metadata, then it resolves edition parameters.
*/
export class RunUIPluginServiceContainer extends React.Component {
  static Steps = {
    // Init 1: fetch plugin configuration
    FETCH_PLUGIN_CONFIGURATION: 'FETCH_PLUGIN_CONFIGURATION',
    // Init 1 error
    PLUGIN_CONFIGURATION_ERROR: 'PLUGIN_CONFIGURATION_ERROR',
    // Init 2: load plugin Javascript code (required to retrieve package-info.json and then know the parameters)
    LOAD_PLUGIN_INSTANCE: 'LOAD_PLUGIN_INSTANCE',
    // Init 2 error
    PLUGIN_INSTANCE_ERROR: 'PLUGIN_INSTANCE_ERROR',
    // Post init error: configuration was wrong
    PARAMETERS_CONVERSION_ERROR: 'PARAMETERS_CONVERSION_ERROR',
    // Configuring parameters
    PARAMETERS_CONFIGURATION: 'PARAMETERS_CONFIGURATION',
    // Service is currently running
    RUNNING_SERVICE: 'RUNNING',
    // Service running failed
    RUNNING_SERVICE_FAILED: 'RUNNING_SERVICE_FAILED',
  }

  static propTypes = {
    // service to run
    service: AccessShapes.PluginService.isRequired,
    // service target (dataobject / dataset / selection) or null
    target: AccessShapes.PluginTarget.isRequired,
    // on done / on quit service
    onQuit: PropTypes.func.isRequired,
    // from map dispatch to props
    dispatchFetchPluginConfiguration: PropTypes.func.isRequired,
  }

  static DEFAULT_STATE = {
    step: RunUIPluginServiceContainer.Steps.FETCH_PLUGIN_CONFIGURATION, // init state
    resolvedParameters: [], // dynamic parameters as resolved using plugin conf and metadata
    userParametersValues: {}, // user entered parameter values
    pluginConf: null, // runtime plugin configuration
  }

  /**
   * Component initialization: retrieve configuration (the plugin defintion comes within)
   */
  UNSAFE_componentWillMount = () => {
    this.setState(RunUIPluginServiceContainer.DEFAULT_STATE)
    const { service, dispatchFetchPluginConfiguration } = this.props
    const { configId } = service
    dispatchFetchPluginConfiguration(configId)
      .then((result) => this.onFetchConfigurationDone(result, configId))
      .catch(() => this.onFetchError(RunUIPluginServiceContainer.Steps.PLUGIN_CONFIGURATION_ERROR))
  }

  /**
   * On fetch configuration done : handles error or starts loading plugin JS code
   * @param result fetch result
   * @param configId running service configuration ID
   **/
  onFetchConfigurationDone = ({ payload, error = false }, configId) => {
    const pluginConfiguration = get(payload, `entities.${UIPluginConfConfiguration.normalizrKey}.${configId}`)
    // In conf, also retrieve the definition, required for next operation
    const pluginDefinition = get(pluginConfiguration, 'content.pluginDefinition')

    if (error || !pluginConfiguration || !pluginDefinition) {
      this.onFetchError(RunUIPluginServiceContainer.Steps.PLUGIN_CONFIGURATION_ERROR)
    } else {
      this.setState({ step: RunUIPluginServiceContainer.Steps.LOAD_PLUGIN_INSTANCE })
      new Promise((resolve, reject) => {
        loadPlugin(
          pluginDefinition.sourcePath, () => reject(),
          // small hack here: behave like dispatch to get the plugin
          (pluginInstance) => resolve({ pluginInstance, pluginConfiguration }),
        )
      }).then(this.onLoadPluginDone).catch(() => this.onFetchError(RunUIPluginServiceContainer.Steps.PLUGIN_INSTANCE_ERROR))
    }
  }

  /**
   * On load plugin done: plugin was loaded, check if there are parameters to edit
   */
  onLoadPluginDone = ({ pluginInstance, pluginConfiguration }) => {
    try {
      // attempt to resolve the parameters
      const resolvedParameters = resolveParameters(pluginConfiguration, pluginInstance)
      // initialization is now complete
      this.onInitializationDone(pluginInstance, pluginConfiguration, resolvedParameters)
    } catch (e) {
      this.onFetchError(RunUIPluginServiceContainer.Steps.PARAMETERS_CONVERSION_ERROR)
    }
  }

  /**
   * On fetch error handler
   * @param errorStep corresponding error step
   */
  onFetchError = (errorStep) => this.setState({ step: errorStep })

  /**
   * On initialization done: start normal component workflow (parameters edition and / or)
   * @param resolvedParameters resolved parameters (optional)
   */
  onInitializationDone = (pluginInstance, pluginConfiguration, resolvedParameters = []) => {
    // transient storage, available after step PARAMETERS_CONFIGURATION
    this.pluginInstance = pluginInstance
    this.pluginConfiguration = pluginConfiguration
    if (resolvedParameters.length) {
      // run through parameters configuration
      this.setState({
        step: RunUIPluginServiceContainer.Steps.PARAMETERS_CONFIGURATION,
        resolvedParameters,
      })
    } else {
      // No configuration, skip to direct application
      this.onConfigurationDone()
    }
  }

  /**
   * Goes forward, after parameters configuration (if there was any) into the service applying
   * @param userParametersValues user entered form values
   */
  onConfigurationDone = (userParametersValues = {}) => {
    const { target, onQuit } = this.props
    // 1 - prepare plugin runtime configuration, using plugin data from this directly, see onInitializationDone
    const configuration = packRuntimeConfiguration(this.pluginConfiguration, this.pluginInstance, userParametersValues)
    const pluginConf = { target, configuration }
    // 3 - prepare plugin props
    const pluginProps = packPluginProps(this.pluginInstance, { onClose: onQuit })
    // 4 - enter running state (keep user values to be able reloading the plugin)
    this.setState({
      step: RunUIPluginServiceContainer.Steps.RUNNING_SERVICE,
      userParametersValues,
      resultsComponent: this.renderPlugin(pluginConf, pluginProps),
    })
  }

  /** Enters back the parameters configuration */
  onPrevious = () => this.setState({ step: RunUIPluginServiceContainer.Steps.PARAMETERS_CONFIGURATION })

  /** @return {function} previous handler if it should be displayed, nothing otherwise */
  hasPreviousStep = () => !!this.state.resolvedParameters.length

  getPluginConfShowButtonsBar = () => get(this.pluginInstance, 'info.conf.showButtonsBar', true)

  /** Renders previous option if any */
  renderPreviousOption = () => this.hasPreviousStep()
    ? <PreviousButton key="previous.button" onPrevious={this.onPrevious} /> : null

  /**
   * Renders the plugin itself. Pre: pluginInstance has been retrieved and set in this instance
   * @param pluginProps plugin configuration
   * @param pluginProps plugin props
   */
  renderPlugin = (pluginConf, pluginProps) => (
    <PluginDisplayerContainer
      pluginInstance={this.pluginInstance} // using pluginInstance from this directly, see onInitializationDone
      pluginConf={pluginConf}
      pluginProps={pluginProps}
    />)

  /**
   * Returns current render step
   * @return a consumable step for RunServiceDialogComponent
   */
  renderCurrentStep = () => {
    const { step, resolvedParameters, userParametersValues } = this.state
    switch (step) {
      // loading states
      case RunUIPluginServiceContainer.Steps.FETCH_PLUGIN_CONFIGURATION:
      case RunUIPluginServiceContainer.Steps.LOAD_PLUGIN_INSTANCE:
        return RunServiceDialogComponent.buildLoadingStep()
      case RunUIPluginServiceContainer.Steps.PLUGIN_CONFIGURATION_ERROR:
      case RunUIPluginServiceContainer.Steps.PLUGIN_INSTANCE_ERROR:
        return RunServiceDialogComponent.buildMessageStep('entities.common.services.loading.plugin.failed', true)
      case RunUIPluginServiceContainer.Steps.PARAMETERS_CONVERSION_ERROR:
        return RunServiceDialogComponent.buildMessageStep('entities.common.services.plugin.parameters.error', true)
      case RunUIPluginServiceContainer.Steps.RUNNING_SERVICE_FAILED:
        return RunServiceDialogComponent.buildMessageStep('entities.common.services.ui.plugin.running.error', true)
      case RunUIPluginServiceContainer.Steps.PARAMETERS_CONFIGURATION:
        return RunServiceDialogComponent.buildParametersConfigurationStep(resolvedParameters, userParametersValues, this.onConfigurationDone)
      case RunUIPluginServiceContainer.Steps.RUNNING_SERVICE:
        return RunServiceDialogComponent.buildResultsStep(this.state.resultsComponent, [this.renderPreviousOption()], this.getPluginConfShowButtonsBar())
      default:
        throw new Error(`Unknown UI plugin service launchin step: ${step}`)
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
const pluginConfigurationActions = new AccessProjectClient.UIPluginConfigurationActions('entities-common/fetch-ui-service-configuration', false)

function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchPluginConfiguration: (configId) => dispatch(pluginConfigurationActions.fetchEntity(configId)),
  }
}

export default connect(null, mapDispatchToProps)(RunUIPluginServiceContainer)
