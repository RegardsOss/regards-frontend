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
import omit from 'lodash/omit'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import { change } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { DataProviderShapes, CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ErrorCardComponent } from '@regardsoss/components'
import { PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { StorageDomain } from '@regardsoss/domain'
import { DATA_TYPES_ENUM } from '../../components/acquisitionChain/StoragesFieldArrayRenderer'
import AcquisitionProcessingChainFormComponent from '../../components/acquisitionChain/AcquisitionProcessingChainFormComponent'
import { AcquisitionProcessingChainEditActions, AcquisitionProcessingChainEditSelectors } from '../../clients/AcquisitionProcessingChainClient'
import { storagesListActions, storagesListSelectors } from '../../clients/StoragesListClient'

/**
* Container to display a form of AcquisitionProcessingChain entity
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      chain: get(ownProps, 'params.chainId', false) ? AcquisitionProcessingChainEditSelectors.getById(state, ownProps.params.chainId) : undefined,
      storages: storagesListSelectors.getOrderedList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetch: (id) => dispatch(AcquisitionProcessingChainEditActions.fetchEntity(id)),
      create: (values) => dispatch(AcquisitionProcessingChainEditActions.createEntity(values)),
      update: (id, values) => dispatch(AcquisitionProcessingChainEditActions.updateEntity(id, values)),
      getStorages: (microserviceName, pluginType) => dispatch(storagesListActions.getPluginConfigurationsByType(microserviceName, pluginType)),
      changeField: (field, value) => dispatch(change('acquisition-chain-form', field, value)),
    }
  }

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      chainId: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    chain: DataProviderShapes.AcquisitionProcessingChain,
    storages: CommonShapes.PluginConfigurationArray.isRequired,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    getStorages: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
  }

  static getTargetTypes(storage) {
    const targetTypes = []
    if (storage.rawdata) {
      targetTypes.push(DATA_TYPES_ENUM.RAWDATA)
    }
    if (storage.aip) {
      targetTypes.push(DATA_TYPES_ENUM.AIP)
    }
    if (storage.description) {
      targetTypes.push(DATA_TYPES_ENUM.DESCRIPTION)
    }
    if (storage.document) {
      targetTypes.push(DATA_TYPES_ENUM.DOCUMENT)
    }
    if (storage.quicklook) {
      targetTypes.push(DATA_TYPES_ENUM.QUICKLOOK_SD)
      targetTypes.push(DATA_TYPES_ENUM.QUICKLOOK_MD)
      targetTypes.push(DATA_TYPES_ENUM.QUICKLOOK_HD)
    }
    if (storage.thumbnail) {
      targetTypes.push(DATA_TYPES_ENUM.THUMBNAIL)
    }
    if (storage.other) {
      targetTypes.push(DATA_TYPES_ENUM.OTHER)
    }
    return targetTypes
  }

  /** Initial state */
  state = {
    isLoadingChain: this.props.params.chainId !== undefined,
    isLoadingChainError: false,
    isLoadingStorages: true,
    isLoadingStoragesError: false,
  }

  componentDidMount() {
    const { params: { chainId }, fetch, getStorages } = this.props
    if (chainId) {
      fetch(chainId).then((actionResults) => {
        this.setState({
          isLoadingChain: false,
          isLoadingChainError: !!actionResults.error,
        })
      })
    }
    getStorages(STATIC_CONF.MSERVICES.STORAGE, StorageDomain.PluginTypeEnum.STORAGE).then((results) => {
      this.setState({
        isLoadingStorages: false,
        isLoadingStoragesError: !!results.error,
      })
    })
  }

  /**
   * Callback to return to the list page
   */
  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/chains`
    browserHistory.push(url)
  }

  /**
   * Callback to submit form values
   * @param {*} values : AcquisitionProcessingChain object to submit (update or create)
   */
  onSubmit = (values) => {
    const { params: { mode } } = this.props
    let action
    const { fileInfos } = values
    forEach(values.fileInfos, (fi) => {
      // eslint-disable-next-line no-param-reassign
      fi.scanPlugin = PluginFormUtils.formatPluginConf(fi.scanPlugin)
    })
    // Convert storages for API query
    let serverValues = {
      ...values,
      fileInfos,
      generateSipPluginConf: PluginFormUtils.formatPluginConf(values.generateSipPluginConf),
      productPluginConf: PluginFormUtils.formatPluginConf(values.productPluginConf),
      validationPluginConf: PluginFormUtils.formatPluginConf(values.validationPluginConf),
      storages: values.storages.filter((storages) => storages.active).map((configuredStorage) => ({
        pluginBusinessId: configuredStorage.label,
        storePath: configuredStorage.storePath ? configuredStorage.storePath : '',
        targetTypes: AcquisitionProcessingChainFormContainer.getTargetTypes(configuredStorage),
      })),
    }

    if (mode === 'edit') {
      action = this.props.update(serverValues.id, serverValues)
    } else if (mode === 'duplicate') {
      // In case of ducplication omit some unused fields
      serverValues = omit(serverValues, 'lastActivationDate', 'lastProductAcquisitionJobInfo')
      // Remove ids from duplication payload
      forEach(serverValues.fileInfos, (fi) => {
        forEach(fi.scanDirInfo, (sdi) => {
          // eslint-disable-next-line no-param-reassign
          sdi.id = null
        })
      })
      action = this.props.create(serverValues)
    } else {
      action = this.props.create(serverValues)
    }
    action.then((actionResults) => {
      if (!actionResults.error) {
        this.onBack()
      }
    })
  }

  render() {
    const { chain, storages, params: { mode } } = this.props
    const {
      isLoadingChain, isLoadingChainError, isLoadingStorages, isLoadingStoragesError,
    } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={isLoadingChain || isLoadingStorages}
        isContentError={isLoadingChainError || isLoadingStoragesError}
        contentErrorComponent={<ErrorCardComponent />}
      >
        <AcquisitionProcessingChainFormComponent
          chain={chain}
          mode={mode || 'create'}
          onSubmit={this.onSubmit}
          onBack={this.onBack}
          storages={storages}
          changeField={this.props.changeField}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}
export default connect(
  AcquisitionProcessingChainFormContainer.mapStateToProps,
  AcquisitionProcessingChainFormContainer.mapDispatchToProps,
)(AcquisitionProcessingChainFormContainer)
