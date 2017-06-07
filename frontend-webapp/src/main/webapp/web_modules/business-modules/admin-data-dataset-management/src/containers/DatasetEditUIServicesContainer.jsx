import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { PluginDefinition as UIPluginDefinition, PluginConf as UIPluginConfiguration, LinkUIPluginDataset } from '@regardsoss/model'
import DatasetEditUIServicesComponent from '../components/DatasetEditUIServicesComponent'
import { uiPluginConfigurationSelectors, uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'
import { uiPluginDefinitionSelectors, uiPluginDefinitionActions } from '../clients/UIPluginDefinitionClient'
import { datasetSelectors, datasetActions } from './../clients/DatasetClient'
import { linkUIPluginDatasetActions, linkUIPluginDatasetSelectors } from './../clients/LinkUIPluginDatasetClient'
export class DatasetEditUIServicesContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      datasetId: PropTypes.string.isRequired,
    }).isRequired,

    // from mapStateToProps
    uiPluginConfigurationList: PropTypes.objectOf(PropTypes.shape({
      content: UIPluginConfiguration,
    })),
    uiPluginDefinitionList: PropTypes.objectOf(UIPluginDefinition),
    linkUIPluginDataset: LinkUIPluginDataset,

    // from mapDispatchToProps
    fetchUIPluginConfigurationList: PropTypes.func,
    fetchUIPluginDefinitionList: PropTypes.func,
    fetchLinkUIPluginDataset: PropTypes.func,
    updateLinkUIPluginDataset: PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    uiPluginConfigurationList: uiPluginConfigurationSelectors.getList(state),
    uiPluginDefinitionList: uiPluginDefinitionSelectors.getList(state),
    linkUIPluginDataset: linkUIPluginDatasetSelectors.getById(state, ownProps.params.datasetId),
  })

  static mapDispatchToProps = dispatch => ({
    fetchUIPluginConfigurationList: uiPluginId => dispatch(uiPluginConfigurationActions.fetchPagedEntityList(0, 100,
      //{ isActive: true, isDefault: false }
    )),
    fetchUIPluginDefinitionList: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(0, 100, {},
      //{type: 'service'}
    )),
    fetchLinkUIPluginDataset: id => dispatch(uiPluginDefinitionActions.fetchEntity(id)),
    updateLinkUIPluginDataset: (id, linkUIPluginDataset) => dispatch(linkUIPluginDatasetActions.updateEntity(id, linkUIPluginDataset)),
  })

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchUIPluginDefinitionList(),
      this.props.fetchUIPluginConfigurationList(),
      this.props.fetchLinkUIPluginDataset(this.props.params.datasetId),
    ]
    Promise.all(tasks)
      .then(() =>
        this.setState({
          isLoading: false,
        }),
      )
  }

  getBackUrl = () => {
    const { params: { project, datasetId } } = this.props
    return `/admin/${project}/data/dataset/${datasetId}/plugins`
  }

  redirectToListDataset = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/dataset/list`)
  }

  handleSubmit = (updatedLinkUIPluginDataset) => {
    Promise.resolve(this.props.updateLinkUIPluginDataset(this.props.params.datasetId, updatedLinkUIPluginDataset))
      .then((actionResult) => {
        if (!actionResult.error) {
          this.redirectToListDataset()
        }
      })
  }

  render() {
    const { uiPluginDefinitionList, uiPluginConfigurationList, linkUIPluginDataset } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() =>
            (<DatasetEditUIServicesComponent
              backUrl={this.getBackUrl()}
              uiPluginConfigurationList={uiPluginConfigurationList}
              uiPluginDefinitionList={uiPluginDefinitionList}
              linkUIPluginDataset={linkUIPluginDataset}
              handleSubmit={this.handleSubmit}
            />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}


export default connect(DatasetEditUIServicesContainer.mapStateToProps, DatasetEditUIServicesContainer.mapDispatchToProps)(DatasetEditUIServicesContainer)
