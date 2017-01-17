/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { PluginConfigurationList } from '@regardsoss/model'
import PluginConfigurationListComponent from '../components/PluginConfigurationListComponent'
import PluginConfigurationSelectors from '../model/PluginConfigurationSelectors'
import PluginConfigurationActions from '../model/PluginConfigurationActions'

export class PluginConfigurationListContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      microserviceName: React.PropTypes.string,
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
    const { params: { microserviceName, pluginId } } = this.props
    this.props.fetchPluginConfigurationList(microserviceName, pluginId)
  }

  onActiveToggle = () => {

  }

  handleAddClick = () => {
    const { params: { project, microserviceName, pluginId } } = this.props
    const url = `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/create`
    browserHistory.push(url)
  }

  handleBackClick = () => {
    const { params: { project, microserviceName } } = this.props
    const url = `/admin/${project}/microservice/${microserviceName}/plugin/list`
    browserHistory.push(url)
  }

  handleCopy = () => {

  }

  handleDeleteClick = () => {

  }

  handleDownwardClick = () => {

  }

  handleUpwardClick = () => {

  }

  render() {
    const { params: { microserviceName }, pluginConfigurationList, isPluginConfigurationFetching } = this.props

    return (
      <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
        <div>
          <PluginConfigurationListComponent
            microserviceName={microserviceName}
            pluginConfigurationList={pluginConfigurationList}
            isLoading={isPluginConfigurationFetching}
            onAddClick={this.handleAddClick}
            onBackClick={this.handleBackClick}
            onCopyClick={this.handleCopy}
            onUpwardClick={this.handleUpwardClick}
            onDownwardClick={this.handleDownwardClick}
            onDeleteClick={this.handleDeleteClick}
            onActiveToggle={this.onActiveToggle}
          />
        </div>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  pluginConfigurationList: PluginConfigurationSelectors.getList(state),
  isPluginConfigurationFetching: PluginConfigurationSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginConfigurationList: (microserviceName, pluginId) => dispatch(PluginConfigurationActions.fetchPagedEntityList(dispatch, 0, 100, [microserviceName, pluginId])),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationListContainer)
