/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { PluginMetaDataList } from '@regardsoss/model'
import PluginMetaDataListComponent from '../components/PluginMetaDataListComponent'
import PluginMetaDataActions from '../model/PluginMetaDataActions'
import PluginMetaDataSelectors from '../model/PluginMetaDataSelectors'

export class PluginMetaDataListContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      microservice: React.PropTypes.string,
      pluginId: React.PropTypes.string,
      pluginConfigurationId: React.PropTypes.string,
    }),
    // from mapStateToProps
    pluginMetaDataList: PluginMetaDataList,
    isPluginMetaDataListFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchPluginMetaDataList: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchPluginMetaDataList()
  }

  handleClose = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/microservice/board`
    browserHistory.push(url)
  }

  handleProjectConfigurationListClick = (pluginId) => {
    const { params: { project, microservice } } = this.props
    const url = `/admin/${project}/microservice/${microservice}/plugin/${pluginId}/configuration/list`
    browserHistory.push(url)
  }

  render() {
    const { pluginMetaDataList, isPluginMetaDataListFetching } = this.props
    // TODO: Use decorator for loader display, based on PluginConfigurationFormContainer
    return (
      <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
        <PluginMetaDataListComponent
          microserviceName={'mock-ms-name'}
          pluginMetaDataList={pluginMetaDataList}
          onClose={this.handleClose}
          onProjectConfigurationListClick={this.handleProjectConfigurationListClick}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  pluginMetaDataList: PluginMetaDataSelectors.getList(state),
  isPluginMetaDataFetching: PluginMetaDataSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginMetaDataList: () => dispatch(PluginMetaDataActions.fetchPagedEntityList(dispatch, 0, 100)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginMetaDataListContainer)
