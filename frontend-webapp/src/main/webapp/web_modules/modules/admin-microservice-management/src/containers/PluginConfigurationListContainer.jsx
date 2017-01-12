/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { PluginConfigurationList } from '@regardsoss/model'
import PluginConfigurationListComponent from '../components/PluginConfigurationListComponent'
import PluginConfigurationActions from '../model/PluginConfigurationActions'
import PluginConfigurationSelectors from '../model/PluginConfigurationSelectors'

export class PluginConfigurationListContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      microservice: React.PropTypes.string,
      pluginId: React.PropTypes.string,
      pluginConfigurationId: React.PropTypes.string,
    }),
    // from mapStateToProps
    pluginConfigurationList: PluginConfigurationList,
    isPluginConfigurationFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchPluginConfigurationList: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchPluginConfigurationList()
  }

  handleClose = () => { // TODO
    const { params: { project } } = this.props
    const url = `/admin/${project}/microservice/board`
    browserHistory.push(url)
  }

  handleProjectConfigurationListClick = (pluginId) => { // TODO
    const { params: { project, microservice } } = this.props
    const url = `/admin/${project}/microservice/${microservice}/plugin/${pluginId}/configuration/list`
    browserHistory.push(url)
  }

  render() {
    const { pluginConfigurationList, isPluginConfigurationListFetching } = this.props
    // TODO: Use decorator for loader display, based on PluginConfigurationFormContainer
    return (
      <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
        <PluginConfigurationListComponent
          microserviceName={'mock-ms-name'}
          pluginConfigurationList={pluginConfigurationList}
          onBackClick={() => console.log('onBackClick')}
          onAddClick={() => console.log('onAddClick')}
          onUpwardClick={() => console.log('onUpwardClick')}
          onDownwardClick={() => console.log('onDownwardClick')}
          onDeleteClick={() => console.log('onDeleteClick')}
          onActiveToggle={() => console.log('onActiveToggle')}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  pluginConfigurationList: PluginConfigurationSelectors.getList(state),
  isPluginConfigurationFetching: PluginConfigurationSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginConfigurationList: () => dispatch(PluginConfigurationActions.fetchPagedEntityList(dispatch, 0, 100)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationListContainer)
