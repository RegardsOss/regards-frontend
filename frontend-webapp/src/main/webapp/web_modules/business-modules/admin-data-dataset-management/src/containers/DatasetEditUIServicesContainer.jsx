import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { PluginDefinition as UIPluginDefinition, PluginConf as UIPluginConfiguration, Dataset } from '@regardsoss/model'
import DatasetEditUIServicesComponent from '../components/DatasetEditUIServicesComponent'
import { uiPluginConfigurationSelectors, uiPluginConfigurationActions } from '../client/UIPluginConfigurationClient'
import { uiPluginDefinitionSelectors, uiPluginDefinitionActions } from '../client/UIPluginDefinitionClient'
import { datasetSelectors, datasetActions } from './../client/DatasetClient'

export class DatasetEditUIServicesContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string.isRequired,
      datasetId: React.PropTypes.string.isRequired,
    }).isRequired,

    // from mapStateToProps
    uiPluginConfigurationList: React.PropTypes.objectOf(React.PropTypes.shape({
      content: UIPluginConfiguration,
    })),
    uiPluginDefinitionList: React.PropTypes.objectOf(UIPluginDefinition),
    currentDataset: Dataset,

    // from mapDispatchToProps
    fetchUIPluginConfigurationList: React.PropTypes.func,
    fetchUIPluginDefinitionList: React.PropTypes.func,
    fetchDataset: React.PropTypes.func,
    updateDataset: React.PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    currentDataset: datasetSelectors.getById(state, ownProps.params.datasetId),
    uiPluginConfigurationList: uiPluginConfigurationSelectors.getList(state),
    uiPluginDefinitionList: uiPluginDefinitionSelectors.getList(state),
  })

  static mapDispatchToProps = dispatch => ({
    fetchUIPluginConfigurationList: uiPluginId => dispatch(uiPluginConfigurationActions.fetchPagedEntityList(0, 100,
      //{ isActive: true, isDefault: false }
    )),
    fetchUIPluginDefinitionList: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(0, 100, {},
      //{type: 'service'}
    )),
    fetchDataset: id => dispatch(datasetActions.fetchEntity(id)),
    updateDataset: (id, dataset) => dispatch(datasetActions.updateEntityUsingMultiPart(id, { dataset }, {})),
  })

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchDataset(this.props.params.datasetId),
      this.props.fetchUIPluginDefinitionList(),
      this.props.fetchUIPluginConfigurationList(),
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

  handleSubmit = (uiPluginConfIdList) => {
    const { currentDataset } = this.props
    const updatedDataset = Object.assign({}, currentDataset, {
      uiPluginConfIdList,
    })
    Promise.resolve(this.props.updateDataset(this.props.params.datasetId, updatedDataset))
      .then((actionResult) => {
        if (!actionResult.error) {
          this.redirectToListDataset()
        }
      })
  }

  render() {
    const { uiPluginDefinitionList, uiPluginConfigurationList, currentDataset } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() =>
            <DatasetEditUIServicesComponent
              backUrl={this.getBackUrl()}
              uiPluginConfigurationList={uiPluginConfigurationList}
              uiPluginDefinitionList={uiPluginDefinitionList}
              currentDataset={currentDataset}
              handleSubmit={this.handleSubmit}
            />
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}


export default connect(DatasetEditUIServicesContainer.mapStateToProps, DatasetEditUIServicesContainer.mapDispatchToProps)(DatasetEditUIServicesContainer)
