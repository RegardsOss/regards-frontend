/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { PluginDefinition as UIPluginDefinition } from '@regardsoss/model'
import { uiPluginDefinitionSelectors, uiPluginDefinitionActions } from '../client/UIPluginDefinitionClient'
import ServiceListComponent from '../components/ServiceListComponent'


/**
 * Displays the list of plugin service
 *
 * @author Léo Mieulet
 */
export class ServiceListContainer extends React.Component {

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    uiPluginDefinitionList: React.PropTypes.objectOf(UIPluginDefinition),
    // from mapDispatchToProps
    fetchUIPluginDefinitionList: React.PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    uiPluginDefinitionList: uiPluginDefinitionSelectors.getList(state),
  })

  static mapDispatchToProps = dispatch => ({
    fetchUIPluginDefinitionList: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(0, 100, {},
      //{type: 'service'}
    )),
  })

  state = {
    isLoading: true,
  }

  componentDidMount() {
    Promise.resolve(this.props.fetchUIPluginDefinitionList())
      .then((actionResult) => {
        if (!actionResult.error) {
          this.setState({
            isLoading: false,
          })
        }
      })
  }

  handleBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui/board`
    browserHistory.push(url)
  }

  handleOpen = (uiPluginServiceId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui/service/${uiPluginServiceId}/list`
    browserHistory.push(url)
  }

  render() {
    const { uiPluginDefinitionList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="modules/admin-ui-service-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <ServiceListComponent
            uiPluginDefinitionList={uiPluginDefinitionList}
            handleOpen={this.handleOpen}
            handleBack={this.handleBack}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default connect(ServiceListContainer.mapStateToProps, ServiceListContainer.mapDispatchToProps)(ServiceListContainer)
