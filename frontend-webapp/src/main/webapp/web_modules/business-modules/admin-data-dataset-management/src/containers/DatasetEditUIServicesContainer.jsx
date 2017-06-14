import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessShapes } from '@regardsoss/shape'
import DatasetEditUIServicesComponent from '../components/DatasetEditUIServicesComponent'
import { uiPluginConfigurationSelectors, uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'
import { uiPluginDefinitionSelectors, uiPluginDefinitionActions } from '../clients/UIPluginDefinitionClient'
import { linkUIPluginDatasetActions, linkUIPluginDatasetSelectors } from './../clients/LinkUIPluginDatasetClient'

export class DatasetEditUIServicesContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      datasetId: PropTypes.string.isRequired,
      datasetIpId: PropTypes.string.isRequired,
    }).isRequired,

    // from mapStateToProps
    uiPluginConfigurationList: AccessShapes.UIPluginConfList,
    uiPluginDefinitionList: AccessShapes.UIPluginDefinitionList,
    linkUIPluginDataset: AccessShapes.LinkUIPluginDataset,

    // from mapDispatchToProps
    fetchUIPluginConfigurationList: PropTypes.func,
    fetchUIPluginDefinitionList: PropTypes.func,
    fetchLinkUIPluginDataset: PropTypes.func,
    updateLinkUIPluginDataset: PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    uiPluginConfigurationList: uiPluginConfigurationSelectors.getList(state),
    uiPluginDefinitionList: uiPluginDefinitionSelectors.getList(state),
    linkUIPluginDataset: linkUIPluginDatasetSelectors.getById(state, ownProps.params.datasetIpId),
  })

  static mapDispatchToProps = dispatch => ({
    fetchUIPluginConfigurationList: uiPluginId => dispatch(uiPluginConfigurationActions.fetchPagedEntityList(0, 100,
      //{ isActive: true, isDefault: false }
    )),
    fetchUIPluginDefinitionList: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(0, 100, {},
      //{type: 'service'}
    )),
    fetchLinkUIPluginDataset: id => dispatch(linkUIPluginDatasetActions.fetchEntity(id)),
    updateLinkUIPluginDataset: (id, linkUIPluginDataset) => dispatch(linkUIPluginDatasetActions.updateEntity(id, linkUIPluginDataset)),
  })

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchUIPluginDefinitionList(),
      this.props.fetchUIPluginConfigurationList(),
      this.props.fetchLinkUIPluginDataset(this.props.params.datasetIpId),
    ]
    Promise.all(tasks)
      .then(() =>
        this.setState({
          isLoading: false,
        }),
      )
  }

  getBackUrl = () => {
    const { params: { project, datasetId, datasetIpId } } = this.props
    return `/admin/${project}/data/dataset/${datasetId}/${datasetIpId}/plugins`
  }

  getForm = () => {
    const { uiPluginDefinitionList, uiPluginConfigurationList, linkUIPluginDataset } = this.props
    return (<DatasetEditUIServicesComponent
      backUrl={this.getBackUrl()}
      uiPluginConfigurationList={uiPluginConfigurationList}
      uiPluginDefinitionList={uiPluginDefinitionList}
      linkUIPluginDataset={linkUIPluginDataset}
      handleSubmit={this.handleSubmit}
      currentDatasetIpId={this.props.params.datasetIpId}
      currentDatasetId={this.props.params.datasetId}
    />)
  }

  redirectToListDataset = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/dataset/list`)
  }

  handleSubmit = (updatedLinkUIPluginDataset) => {
    console.log(updatedLinkUIPluginDataset)
    Promise.resolve(this.props.updateLinkUIPluginDataset(this.props.params.datasetIpId, updatedLinkUIPluginDataset))
      .then((actionResult) => {
        if (!actionResult.error) {
          this.redirectToListDataset()
        }
      })
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getForm}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}


export default connect(DatasetEditUIServicesContainer.mapStateToProps, DatasetEditUIServicesContainer.mapDispatchToProps)(DatasetEditUIServicesContainer)
