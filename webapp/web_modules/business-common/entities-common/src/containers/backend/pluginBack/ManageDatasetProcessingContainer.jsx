/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import filter from 'lodash/filter'
import some from 'lodash/some'
import reduce from 'lodash/reduce'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import { ProcessingDomain } from '@regardsoss/domain'
import { withModuleStyle } from '@regardsoss/theme'
import { BasicListSelectors, BasicSignalActions } from '@regardsoss/store-utils'
import { ProcessingShapes, CommonShapes, OrderShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { withI18n } from '@regardsoss/i18n'
import { OrderClient } from '@regardsoss/client'
import { resolveParametersWithTypes } from '../../../definitions/CatalogPluginServiceHelper'
import ManageDatasetProcessingConnectedComponent from '../../../components/backend/pluginBack/ManageDatasetProcessingComponent'
import messages from '../../../i18n'
import styles from '../../../styles'

// get an instance of default actions / selectors (the basket state is shared over all modules)
const orderBasketActions = new OrderClient.OrderBasketActions()

const FORBID_SPLIT_PARAMETER = 'forbidSplitInSuborders'
const MAX_FILE_INPUT_PARAMETER = 'maxFilesInInput'

/**
* Container to display dataset processing in basket
* @author Théo Lasserre
*/
export class ManageDatasetProcessingContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { processingSelectors, pluginMetaDataSelectors }) {
    return {
      processingConfigurationList: processingSelectors.getList(state),
      processingMetadataList: pluginMetaDataSelectors.getList(state),
    }
  }

  /** ,
   * Redux: map dispatch to props function,
   * @param {*} dispatch: redux dispatch function,
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps),
   * @return {*} list of component properties extracted from redux state,
   */
  static mapDispatchToProps(dispatch, { fileFiltersActions, linkProcessingDatasetActions }) {
    return {
      fetchLinkProcessingDatasetList: (datasetSelectionIpId) => dispatch(linkProcessingDatasetActions.getLinkProcessDataset(datasetSelectionIpId)),
      updateDatasetProcessing: (datasetSelectionId, process) => dispatch(orderBasketActions.updateDatasetProcessingSelection(datasetSelectionId, process)),
      removeFileFilters: (datasetSelectionId) => dispatch(fileFiltersActions.updateFileFilters(datasetSelectionId, null)),
    }
  }

  static getParameter = (pluginConfiguration, parameterName) => find(pluginConfiguration.content.parameters, (parameter) => parameter.name === parameterName)

  /**
   * Retrieve max files constraint depending on FORBID_SPLIT_PARAMETER. Both MAX_FILE_INPUT_PARAMETER & FORBID_SPLIT_PARAMETER must be set & not dynamic
   * @param {*} pluginConfiguration
   * @returns
   */
  static getMaxFilesInput = (pluginConfiguration) => {
    const forbidSplitParameter = ManageDatasetProcessingContainer.getParameter(pluginConfiguration, FORBID_SPLIT_PARAMETER)
    if (forbidSplitParameter && !forbidSplitParameter.dynamic && forbidSplitParameter.value) {
      const maxFileInputParameter = ManageDatasetProcessingContainer.getParameter(pluginConfiguration, MAX_FILE_INPUT_PARAMETER)
      return maxFileInputParameter && !maxFileInputParameter.dynamic && maxFileInputParameter.value > 0 ? maxFileInputParameter.value : null
    }
    return null
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    datasetIpid: PropTypes.string.isRequired,
    datasetSelectionId: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    process: OrderShapes.BasketDatasetProcessingSelection,
    // eslint-disable-next-line react/no-unused-prop-types
    fileSelectionDescription: OrderShapes.BasketDatasetFileSelectionDescription,
    disabled: PropTypes.bool.isRequired,
    //eslint-disable-next-line react/no-unused-prop-types
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    //eslint-disable-next-line react/no-unused-prop-types
    pluginMetaDataSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fileFiltersActions: PropTypes.instanceOf(OrderClient.OrderFileFiltersActions).isRequired,
    //eslint-disable-next-line react/no-unused-prop-types
    linkProcessingDatasetActions: PropTypes.instanceOf(BasicSignalActions).isRequired,
    onProcessChanged: PropTypes.func.isRequired,

    // from mapStateToProps
    //eslint-disable-next-line react/no-unused-prop-types
    processingConfigurationList: ProcessingShapes.ProcessingList,
    processingMetadataList: CommonShapes.PluginMetaDataList,

    // from mapDispatchToProps
    fetchLinkProcessingDatasetList: PropTypes.func,
    updateDatasetProcessing: PropTypes.func,
    removeFileFilters: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
    processingConfParametersSelected: '',
    isProcessingConfSelectedConfigurable: false,
    processingConfParametersObjects: {},
    linkProcessingDatasetList: [],
  }

  /**
   * Component initialization : retrieve link processing dataset list
   */
  componentDidMount = () => {
    const { fetchLinkProcessingDatasetList, datasetIpid } = this.props
    fetchLinkProcessingDatasetList(datasetIpid)
      .then((actionResult) => {
        if (actionResult.error) {
          console.error(`Error retrieving linked process to dataset ${datasetIpid}`)
        } else {
          const pendingState = {
            ...this.state,
            linkProcessingDatasetList: actionResult.payload,
            isLoading: false,
          }
          this.onPropertiesUpdated({}, this.props, pendingState)
        }
      })
  }

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps, this.state)

  /**
  * Properties change detected: update local state
  * @param oldProps previous component properties
  * @param newProps next component properties
  */
  onPropertiesUpdated = (oldProps, newProps, oldState) => {
    const {
      process,
      processingConfigurationList,
    } = newProps
    // 1 - Update current configurations when selectable attributes change
    const newState = { ...oldState }

    // We must have processes linked to this dataset
    if (!isEmpty(oldState.linkProcessingDatasetList)
      && (
        // On init, this object is empty
        isEmpty(oldState.processingConfParametersObjects)
        // props changed
        || !isEqual(oldProps.processingConfigurationList, processingConfigurationList)
        || !isEqual(oldProps.process, process)
      )) {
      newState.processingConfParametersObjects = this.getProcessingConfParametersObjects(oldState.linkProcessingDatasetList, processingConfigurationList, process)
      newState.processingConfParametersSelected = this.getProcessingConfParametersSelected(newState.processingConfParametersObjects, process)
      newState.isProcessingConfSelectedConfigurable = !!newState.processingConfParametersSelected && this.isParametersConfigurationNeeded(newState.processingConfParametersSelected)
    }
    // update when there is a state change
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  getProcessingConfParametersObjects = (linkProcessingDatasetList, processingConfigurationList, process) => {
    // Filter processing configuration list to keep usable ones (corresponding to actual links & actual user role)
    const processingConfigurationListFiltered = filter(processingConfigurationList, (processingConfiguration) => (
      some(linkProcessingDatasetList, (linkProcessingDataset) => linkProcessingDataset.processBusinessId === processingConfiguration.content.pluginConfiguration.businessId)
    ))
    const { processingMetadataList } = this.props
    const processBusinessId = get(process, 'processBusinessId', null)
    const parameters = get(process, 'parameters', null)
    // We create an object containing multiple processingConf and their parameters
    const processingConfParametersObjects = reduce(processingConfigurationListFiltered, (acc, processingConfiguration) => {
      // For each processing conf of a metadata, we retrieve its businessId and its parameters
      //eslint-disable-next-line lodash/prefer-filter
      forEach(processingMetadataList, (metadata) => {
        if (metadata.content.pluginId === processingConfiguration.content.pluginConfiguration.pluginId) {
          const { businessId } = processingConfiguration.content.pluginConfiguration
          // We need to re-shape processing pluginConfiguration to match other pluginConfiguration shape
          const newPluginConfiguration = {
            content: processingConfiguration.content.pluginConfiguration,
          }
          // Resolved parameters for conf
          const resolvedParameters = resolveParametersWithTypes(newPluginConfiguration, metadata)
          // Init parameters values
          let parametersValue = {}
          if (processBusinessId === businessId) {
            parametersValue = parameters
          }
          acc[businessId] = {
            businessId,
            label: ProcessingDomain.ProcessingUtils.getProcessingName(processingConfiguration),
            pluginMetadata: metadata,
            resolvedParameters,
            parameters: parametersValue,
            maxFilesInput: ManageDatasetProcessingContainer.getMaxFilesInput(newPluginConfiguration),
          }
        }
      })
      return acc
    }, {})
    return processingConfParametersObjects
  }

  /**
   * Manipulation of metadata, processingConf & links to create an easily exploitable object
   */
  getProcessingConfParametersSelected = (processingConfParametersObjects, process) => {
    const processBusinessId = get(process, 'processBusinessId', null)

    // Set selected conf to dataset process businessId if exist, if not set to first conf found in processingConfParameters collection
    let processingConfParametersSelected = get(processingConfParametersObjects, `${processBusinessId}`, {})
    if (isEmpty(processingConfParametersSelected)) {
      processingConfParametersSelected = get(processingConfParametersObjects, keys(processingConfParametersObjects)[0])
    }
    return processingConfParametersSelected
  }

  /**
   * We need this to check if conf selected need parameters configuration
   * @param {*} businessId
   */
  isParametersConfigurationNeeded = (processingConfParametersSelected) => !isEmpty(processingConfParametersSelected.resolvedParameters)

  /**
   * Handle selected change
   * @param {*} link
   */
  onSelectedProcessingConfChanged = (event, index, value) => {
    const {
      processingConfParametersObjects,
    } = this.state
    const processingConfParametersSelected = get(processingConfParametersObjects, `${value}`, {})
    this.setState({
      processingConfParametersSelected,
      isProcessingConfSelectedConfigurable: this.isParametersConfigurationNeeded(processingConfParametersSelected),
    })
  }

  /**
   * After parameters configuration we update state & we update dataset object
   * @param {*} formValues
   */
  onConfigurationDone = (formValues = {}) => {
    const { datasetSelectionId, fileSelectionDescription, removeFileFilters } = this.props
    const processBusinessId = get(this.props, 'process.processBusinessId', null)
    const { processingConfParametersSelected, processingConfParametersObjects } = this.state
    let processingConfParametersSelectedFound = processingConfParametersSelected
    // Update if there was a modification in select or form
    if (processBusinessId !== processingConfParametersSelected.businessId || !isEqual(processingConfParametersSelected.parameters, formValues)) {
      // We need to create a new object instead of update it directly in state because we need it for backend call.
      // We update parameters values only if conf has parameters
      if (this.isParametersConfigurationNeeded(processingConfParametersSelectedFound)) {
        processingConfParametersSelectedFound = {
          ...processingConfParametersSelectedFound,
          parameters: formValues,
        }
      }
      // State Update
      this.setState({
        processingConfParametersObjects: {
          ...processingConfParametersObjects,
          [processingConfParametersSelected.businessId]: processingConfParametersSelectedFound,
        },
      })
      // Backend calls
      // We remove resolvedParameters properties since backend do not need it
      const processingConfParametersSelectedToSend = {
        processBusinessId: processingConfParametersSelectedFound.businessId,
        parameters: processingConfParametersSelectedFound.parameters,
      }
      if (fileSelectionDescription) {
        removeFileFilters(datasetSelectionId).then((actionResult) => {
          if (!actionResult.error) {
            this.updateDatasetProcessing(datasetSelectionId, processingConfParametersSelectedToSend)
          }
        })
      } else {
        this.updateDatasetProcessing(datasetSelectionId, processingConfParametersSelectedToSend)
      }
    }
  }

  onRemoveProcessing = () => {
    const { datasetSelectionId } = this.props
    const processingConfParametersSelected = {}
    this.setState({
      processingConfParametersSelected,
    })
    this.updateDatasetProcessing(datasetSelectionId, processingConfParametersSelected)
  }

  updateDatasetProcessing = (datasetSelectionId, processingConfParametersSelectedToSend) => {
    this.props.updateDatasetProcessing(datasetSelectionId, processingConfParametersSelectedToSend).then((actionResult) => {
      if (!actionResult.error) {
        this.props.onProcessChanged()
      }
    })
  }

  render() {
    const {
      disabled, fileSelectionDescription,
    } = this.props
    const { processingConfParametersObjects, processingConfParametersSelected, isProcessingConfSelectedConfigurable } = this.state
    const processBusinessId = get(this.props, 'process.processBusinessId', null)
    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        <ManageDatasetProcessingConnectedComponent
          processingConfParametersObjects={processingConfParametersObjects}
          processingConfParametersSelected={processingConfParametersSelected}
          isProcessingConfSelectedConfigurable={isProcessingConfSelectedConfigurable}
          onSelectedProcessingConfChanged={this.onSelectedProcessingConfChanged}
          onConfigurationDone={this.onConfigurationDone}
          fileSelectionDescription={fileSelectionDescription}
          onRemoveProcessing={this.onRemoveProcessing}
          processBusinessId={processBusinessId}
          disabled={disabled}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

export default compose(
  connect(ManageDatasetProcessingContainer.mapStateToProps, ManageDatasetProcessingContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(ManageDatasetProcessingContainer)
