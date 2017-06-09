/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { PluginConfiguration, PluginMetaData, LinkPluginDataset } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasetEditPluginComponent from '../components/DatasetEditPluginComponent'
import { linkPluginDatasetActions, linkPluginDatasetSelectors } from './../clients/LinkPluginDatasetClient'
import { pluginConfigurationActions, pluginConfigurationSelectors } from './../clients/PluginConfigurationClient'
import { pluginMetaDataActions, pluginMetaDataSelectors } from './../clients/PluginMetaDataClient'

export class DatasetEditPluginContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      datasetId: PropTypes.string,
      datasetIpId: PropTypes.string.isRequired,
    }),

    // from mapStateToProps
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData),
    linkPluginDataset: LinkPluginDataset,

    // from mapDispatchToProps
    fetchPluginConfiguration: PropTypes.func,
    fetchPluginMetaData: PropTypes.func,
    fetchLinkPluginDataset: PropTypes.func,
    updateLinkPluginDataset: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchPluginConfiguration(),
      this.props.fetchPluginMetaData(),
      this.props.fetchLinkPluginDataset(this.props.params.datasetIpId),
    ]
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  onSubmit = (linkPluginDataset) => {
    Promise.resolve(this.props.updateLinkPluginDataset(this.props.params.datasetIpId, linkPluginDataset.content))
      .then((actionResult) => {
        if (!actionResult.error) {
          this.redirectToUIServices()
        }
      })
  }


  getBackUrl = () => {
    const { params: { project, datasetId } } = this.props
    return `/admin/${project}/data/dataset/${datasetId}/links`
  }

  redirectToUIServices = () => {
    const { params: { project, datasetId, datasetIpId } } = this.props
    const url = `/admin/${project}/data/dataset/${datasetId}/${datasetIpId}/ui-services`
    browserHistory.push(url)
  }

  render() {
    const { isLoading } = this.state
    const {
      pluginConfigurationList,
      pluginMetaDataList,
      linkPluginDataset,
    } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasetEditPluginComponent
            pluginConfigurationList={pluginConfigurationList}
            pluginMetaDataList={pluginMetaDataList}
            linkPluginDataset={linkPluginDataset}
            onSubmit={this.onSubmit}
            backUrl={this.getBackUrl()}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }


}


const mapStateToProps = (state, ownProps) => ({
  pluginConfigurationList: pluginConfigurationSelectors.getList(state),
  pluginMetaDataList: pluginMetaDataSelectors.getList(state),
  linkPluginDataset: linkPluginDatasetSelectors.getById(state, ownProps.params.datasetIpId),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginConfiguration: () => dispatch(pluginConfigurationActions.fetchEntityList({
    microserviceName: 'rs-catalog',
  }, {
    pluginId: 'fr.cnes.regards.modules.search.plugin.IService',
  })),
  fetchPluginMetaData: () => dispatch(pluginMetaDataActions.fetchEntityList({
    microserviceName: 'rs-catalog',
  }, {
    pluginType: 'fr.cnes.regards.modules.search.plugin.IService',
  })),
  fetchLinkPluginDataset: datasetIpId => dispatch(linkPluginDatasetActions.fetchEntity(datasetIpId)),
  updateLinkPluginDataset: (datasetIpId, linkPluginDataset) => dispatch(linkPluginDatasetActions.updateEntity(datasetIpId, linkPluginDataset)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetEditPluginContainer)
