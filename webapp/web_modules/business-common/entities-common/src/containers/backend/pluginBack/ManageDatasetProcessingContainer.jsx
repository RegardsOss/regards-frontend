/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import filter from 'lodash/filter'
import some from 'lodash/some'
import reduce from 'lodash/reduce'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import { ProcessingDomain } from '@regardsoss/domain'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
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
  static mapDispatchToProps(dispatch, { linkProcessingDatasetActions }) {
    return {
      fetchLinkProcessingDatasetList: (datasetSelectionIpId) => dispatch(linkProcessingDatasetActions.getLinkProcessDataset(datasetSelectionIpId)),
      updateDatasetProcessing: (datasetSelectionId, process) => dispatch(orderBasketActions.updateDatasetProcessingSelection(datasetSelectionId, process)),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    datasetIpid: PropTypes.string.isRequired,
    datasetSelectionId: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    process: OrderShapes.BasketDatasetProcessingSelection,
    disabled: PropTypes.bool.isRequired,
    //eslint-disable-next-line react/no-unused-prop-types
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    //eslint-disable-next-line react/no-unused-prop-types
    pluginMetaDataSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    //eslint-disable-next-line react/no-unused-prop-types
    linkProcessingDatasetActions: PropTypes.instanceOf(BasicSignalActions).isRequired,
    onProcessChanged: PropTypes.func.isRequired,

    // from mapStateToProps
    processingConfigurationList: ProcessingShapes.ProcessingList,
    processingMetadataList: CommonShapes.PluginMetaDataList,

    // from mapDispatchToProps
    fetchLinkProcessingDatasetList: PropTypes.func,
    updateDatasetProcessing: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
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
  UNSAFE_componentWillMount = () => {
    const { fetchLinkProcessingDatasetList } = this.props
    fetchLinkProcessingDatasetList(this.props.datasetIpid)
      .then((actionResult) => {
        if (actionResult.error) {
          console.error(`Error retrieving linked process to dataset ${this.props.datasetIpid}`)
        } else {
          this.filterProcessingConfigurationList(actionResult.payload, this.props.processingConfigurationList)
        }
      })
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (!isEqual(this.props.processingConfigurationList, nextProps.processingConfigurationList)) {
      this.filterProcessingConfigurationList(this.state.linkProcessingDatasetList, nextProps.processingConfigurationList)
    }
  }

  /**
   * Filter processing configuration list to keep usable ones (corresponding to actual links & actual user role)
   * @param {*} payload fetch result
   */
  filterProcessingConfigurationList = (linkProcessingDatasetList, processingConfigurationList) => {
    const processingConfigurationListFiltered = filter(processingConfigurationList, (processingConfiguration) => (
      some(linkProcessingDatasetList, (linkProcessingDataset) => linkProcessingDataset.processBusinessId === processingConfiguration.content.pluginConfiguration.businessId)
    ))
    this.createProcessingConfParametersList(processingConfigurationListFiltered, linkProcessingDatasetList)
  }

  /**
   * Manipulation of metadata, processingConf & links to create an easily exploitable object
   * @param {*} payload fetch result
   */
  createProcessingConfParametersList = (processingConfigurationList, linkProcessingDatasetList) => {
    const { processingMetadataList } = this.props
    const processBusinessId = get(this.props, 'process.processBusinessId', null)
    const parameters = get(this.props, 'process.parameters', null)
    let isProcessingConfSelectedConfigurable = false
    // We create an object containing multiple processingConf and their parameters
    const processingConfParametersObjects = reduce(processingConfigurationList, (acc, processingConfiguration) => {
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
          if (resolvedParameters.length > 0) {
            isProcessingConfSelectedConfigurable = true
          }
          // Init parameters values
          let parametersValue = {}
          if (processBusinessId === businessId) {
            parametersValue = parameters
          }
          acc[businessId] = {
            businessId,
            label: ProcessingDomain.getProcessingName(processingConfiguration),
            resolvedParameters,
            parameters: parametersValue,
          }
        }
      })
      return acc
    }, {})

    // Set selected conf to dataset process businessId if exist, if not set to first conf found in processingConfParameters collection
    let processingConfParametersSelected = processBusinessId
    if (processingConfParametersSelected === '') {
      const processingConfParametersSelectedObject = get(processingConfParametersObjects, keys(processingConfParametersObjects)[0])
      processingConfParametersSelected = processingConfParametersSelectedObject.businessId
    }

    this.setState({
      isLoading: false,
      processingConfParametersSelected,
      isProcessingConfSelectedConfigurable,
      processingConfParametersObjects,
      linkProcessingDatasetList,
    })
  }

  /**
   * We need this to check if conf selected need parameters configuration
   * @param {*} businessId
   */
  isParametersConfigurationNeeded = (processingConfParameters) => {
    const { processingConfParametersObjects } = this.state
    const processingConfParametersFound = get(processingConfParametersObjects, `${processingConfParameters}`)
    return !isEmpty(processingConfParametersFound.resolvedParameters)
  }

  /**
   * Handle selected change
   * @param {*} link
   */
  onSelectedProcessingConfChanged = (event, index, value) => {
    this.setState({
      processingConfParametersSelected: value,
      isProcessingConfSelectedConfigurable: this.isParametersConfigurationNeeded(value),
    })
  }

  /**
   * After parameters configuration we update state & we update dataset object
   * @param {*} formValues
   */
  onConfigurationDone = (formValues = {}) => {
    const { datasetSelectionId } = this.props
    const processBusinessId = get(this.props, 'process.processBusinessId', null)
    const { processingConfParametersSelected, processingConfParametersObjects } = this.state
    let processingConfParametersSelectedFound = get(processingConfParametersObjects, `${processingConfParametersSelected}`)
    // Update if there was a modification in select or form
    if (processBusinessId !== processingConfParametersSelected || !isEqual(processingConfParametersSelectedFound.parameters, formValues)) {
      // We need to create a new object instead of update it directly in state because we need it for backend call.
      // We update parameters values only if conf has parameters
      if (this.isParametersConfigurationNeeded(processingConfParametersSelected)) {
        processingConfParametersSelectedFound = {
          ...processingConfParametersSelectedFound,
          parameters: formValues,
        }
      }
      // State Update
      this.setState({
        processingConfParametersObjects: {
          ...processingConfParametersObjects,
          [processingConfParametersSelected]: processingConfParametersSelectedFound,
        },
      })
      // Backend calls
      // We remove resolvedParameters properties since backend do not need it
      const processingConfParametersSelectedToSend = {
        processBusinessId: processingConfParametersSelectedFound.businessId,
        parameters: processingConfParametersSelectedFound.parameters,
      }
      this.updateDatasetProcessing(datasetSelectionId, processingConfParametersSelectedToSend)
    }
  }

  onRemoveProcessing = () => {
    const { datasetSelectionId } = this.props
    this.updateDatasetProcessing(datasetSelectionId, {})
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
      disabled,
    } = this.props
    const { processingConfParametersObjects, processingConfParametersSelected, isProcessingConfSelectedConfigurable } = this.state
    const processBusinessId = get(this.props, 'process.processBusinessId', null)
    const { moduleTheme: { processDiv } } = this.context

    return (
      <div style={processDiv}>
        <LoadableContentDisplayDecorator
          isLoading={this.state.isLoading}
        >
          <ManageDatasetProcessingConnectedComponent
            processingConfParametersObjects={processingConfParametersObjects}
            processingConfParametersSelected={processingConfParametersSelected}
            isProcessingConfSelectedConfigurable={isProcessingConfSelectedConfigurable}
            onSelectedProcessingConfChanged={this.onSelectedProcessingConfChanged}
            onConfigurationDone={this.onConfigurationDone}
            onRemoveProcessing={this.onRemoveProcessing}
            processBusinessId={processBusinessId}
            disabled={disabled}
          />
        </LoadableContentDisplayDecorator>
      </div>
    )
  }
}

export default compose(
  connect(ManageDatasetProcessingContainer.mapStateToProps, ManageDatasetProcessingContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(ManageDatasetProcessingContainer)
