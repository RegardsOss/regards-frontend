/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { PluginConfiguration, PluginMetaData, LinkPluginDataset } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasetEditPluginComponent from '../components/DatasetEditPluginComponent'
import LinkPluginDatasetActions from './../model/LinkPluginDatasetActions'
import LinkPluginDatasetSelectors from './../model/LinkPluginDatasetSelectors'

import {
  PluginConfigurationConvertersActions,
  PluginConfigurationServicesActions,
  PluginConfigurationFiltersActions,
} from './../model/PluginConfigurationActions'
import {
  PluginMetaDataConvertersActions,
  PluginMetaDataServicesActions,
  PluginMetaDataFiltersActions,
} from './../model/PluginMetaDataActions'
import {
  PluginConfigurationFiltersSelectors,
  PluginConfigurationConvertersSelectors,
  PluginConfigurationServicesSelectors,
} from './../model/PluginConfigurationSelectors'
import {
  PluginMetaDataFiltersSelectors,
  PluginMetaDataConvertersSelectors,
  PluginMetaDataServicesSelectors,
} from './../model/PluginMetaDataSelectors'

export class DatasetEditPluginContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      datasetId: React.PropTypes.string,
    }),

    // from mapStateToProps
    pluginConfigurationFiltersList: React.PropTypes.objectOf(PluginConfiguration),
    pluginConfigurationConvertersList: React.PropTypes.objectOf(PluginConfiguration),
    pluginConfigurationServicesList: React.PropTypes.objectOf(PluginConfiguration),

    pluginMetaDataFiltersList: React.PropTypes.objectOf(PluginMetaData),
    pluginMetaDataConvertersList: React.PropTypes.objectOf(PluginMetaData),
    pluginMetaDataServicesList: React.PropTypes.objectOf(PluginMetaData),

    linkPluginDataset: LinkPluginDataset,

    // from mapDispatchToProps
    fetchConvertersConfiguration: React.PropTypes.func,
    fetchServicesConfiguration: React.PropTypes.func,
    fetchFiltersConfiguration: React.PropTypes.func,

    fetchConvertersPluginMetaData: React.PropTypes.func,
    fetchServicesPluginMetaData: React.PropTypes.func,
    fetchFiltersPluginMetaData: React.PropTypes.func,

    fetchLinkPluginDataset: React.PropTypes.func,
    updateLinkPluginDataset: React.PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchConvertersConfiguration(),
      this.props.fetchServicesConfiguration(),
      this.props.fetchFiltersConfiguration(),
      this.props.fetchConvertersPluginMetaData(),
      this.props.fetchServicesPluginMetaData(),
      this.props.fetchFiltersPluginMetaData(),
      this.props.fetchLinkPluginDataset(this.props.params.datasetId),
    ]
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  onSubmit = (linkPluginDataset) => {
    Promise.resolve(this.props.updateLinkPluginDataset(this.props.params.datasetId, linkPluginDataset.content))
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
    const { params: { project, datasetId } } = this.props
    const url = `/admin/${project}/data/dataset/${datasetId}/ui-services`
    browserHistory.push(url)
  }

  render() {
    const { isLoading } = this.state
    const {
      pluginConfigurationFiltersList,
      pluginConfigurationConvertersList,
      pluginConfigurationServicesList,
      pluginMetaDataFiltersList,
      pluginMetaDataConvertersList,
      pluginMetaDataServicesList,
      linkPluginDataset,
    } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasetEditPluginComponent
            pluginConfigurationFiltersList={pluginConfigurationFiltersList}
            pluginConfigurationConvertersList={pluginConfigurationConvertersList}
            pluginConfigurationServicesList={pluginConfigurationServicesList}
            pluginMetaDataFiltersList={pluginMetaDataFiltersList}
            pluginMetaDataConvertersList={pluginMetaDataConvertersList}
            pluginMetaDataServicesList={pluginMetaDataServicesList}
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
  pluginConfigurationFiltersList: PluginConfigurationFiltersSelectors.getList(state),
  pluginConfigurationConvertersList: PluginConfigurationConvertersSelectors.getList(state),
  pluginConfigurationServicesList: PluginConfigurationServicesSelectors.getList(state),
  pluginMetaDataFiltersList: PluginMetaDataFiltersSelectors.getList(state),
  pluginMetaDataConvertersList: PluginMetaDataConvertersSelectors.getList(state),
  pluginMetaDataServicesList: PluginMetaDataServicesSelectors.getList(state),
  linkPluginDataset: LinkPluginDatasetSelectors.getById(state, ownProps.params.datasetId),
})

const mapDispatchToProps = dispatch => ({
  fetchConvertersConfiguration: () => dispatch(PluginConfigurationConvertersActions.fetchPagedEntityList(0, 1000, {}, /*{
   pluginId: 'fr.cnes.regards.modules.search.service.IConverter'
   }*/)),
  fetchServicesConfiguration: id => dispatch(PluginConfigurationServicesActions.fetchPagedEntityList(0, 1000, {}, /*{
   pluginId: 'fr.cnes.regards.modules.search.service.IService'
   }*/)),
  fetchFiltersConfiguration: id => dispatch(PluginConfigurationFiltersActions.fetchPagedEntityList(0, 1000, {}, /*{
   pluginId: 'fr.cnes.regards.modules.search.service.IFilter'
   }*/)),
  fetchConvertersPluginMetaData: () => dispatch(PluginMetaDataConvertersActions.fetchPagedEntityList(0, 1000, {}, /*{
   pluginType: 'fr.cnes.regards.modules.search.service.IConverter'
   }*/)),
  fetchServicesPluginMetaData: id => dispatch(PluginMetaDataServicesActions.fetchPagedEntityList(0, 1000, {}, /*{
   pluginType: 'fr.cnes.regards.modules.search.service.IService'
   }*/)),
  fetchFiltersPluginMetaData: id => dispatch(PluginMetaDataFiltersActions.fetchPagedEntityList(0, 1000, {}, /*{
   pluginType: 'fr.cnes.regards.modules.search.service.IFilter'
   }*/)),
  fetchLinkPluginDataset: datasetId => dispatch(LinkPluginDatasetActions.fetchEntity(datasetId)),
  updateLinkPluginDataset: (datasetId, linkPluginDataset) => dispatch(LinkPluginDatasetActions.updateEntity(datasetId, linkPluginDataset)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetEditPluginContainer)
