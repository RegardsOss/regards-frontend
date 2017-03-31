/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { Layout } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import LayoutSelector from '../model/LayoutSelector'
import LayoutActions from '../model/LayoutActions'
import LayoutInstanceActions from '../model/LayoutInstanceActions'
import ApplicationLayoutComponent from '../components/ApplicationLayoutComponent'

/**
 * Module container to retrieve and display a layout entity associated to an application id.
 * @author Sébastien binda
 * @author Léo Mieulet
 */
export class ApplicationLayoutContainer extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      applicationId: React.PropTypes.string,
    }),
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    layout: Layout,
    isInstance: React.PropTypes.bool,
    // Set by mapDispatchToProps
    fetchLayout: React.PropTypes.func,
    fetchInstanceLayout: React.PropTypes.func,
    updateLayout: React.PropTypes.func,

  }

  state = {
    isLoading: true,
  }

  componentWillMount() {
    const task = this.props.isInstance ? this.props.fetchInstanceLayout(this.props.params.applicationId) :
      this.props.fetchLayout(this.props.params.applicationId)
    Promise.resolve(task)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  /**
   * Return url to get back to applications list page
   * @returns {string}
   */
  getBackUrl = () => {
    if (this.props.isInstance) {
      return `/admin/ui/board`
    }
    const { params: { project } } = this.props
    return `/admin/${project}/ui/board`
  }

  handleCancel = () => {
    browserHistory.push(this.getBackUrl())
  }

  /**
   * Manage action to update an application layout to the backend
   * @param values
   */
  handleSubmit = (values) => {
    Promise.resolve(this.props.updateLayout(this.props.layout.content.id,
      {
        id: this.props.layout.content.id,
        layout: values.layout,
      },
    ))
      .then(() => {
        browserHistory.push(this.getBackUrl())
      })
  }

  render() {
    const { isLoading } = this.state

    return (
      <I18nProvider messageDir="modules/admin-ui-layout-management/src/i18n">
        <LoadableContentDisplayDecorator isLoading={isLoading}>
          {() => (<ApplicationLayoutComponent
            layout={this.props.layout.content.layout}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
          />)}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  layout: ownProps.params.applicationId ? LayoutSelector.getById(state, ownProps.params.applicationId) : null,
  isFetching: LayoutSelector.isFetching(state),
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

const mapDispatchToProps = dispatch => ({
  fetchLayout: applicationId => dispatch(LayoutActions.fetchEntity(applicationId)),
  fetchInstanceLayout: applicationId => dispatch(LayoutInstanceActions.fetchEntity(applicationId)),
  updateLayout: (applicationId, layout) => dispatch(LayoutActions.updateEntity(applicationId, layout)),
  updateInstanceLayout: (applicationId, layout) => dispatch(LayoutInstanceActions.updateEntity(applicationId, layout)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationLayoutContainer)
