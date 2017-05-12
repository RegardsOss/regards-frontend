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
    params: PropTypes.shape({
      project: PropTypes.string,
      applicationId: PropTypes.string,
    }),
    // Set by mapStateToProps
    isFetching: PropTypes.bool,
    layout: Layout,
    isInstance: PropTypes.bool,
    // Set by mapDispatchToProps
    fetchLayout: PropTypes.func,
    fetchInstanceLayout: PropTypes.func,
    updateLayout: PropTypes.func,
    updateInstanceLayout: PropTypes.func,
  }

  componentWillMount() {
    if (this.props.isInstance) {
      this.props.fetchInstanceLayout(this.props.params.applicationId)
    } else {
      this.props.fetchLayout(this.props.params.applicationId)
    }
  }

  /**
   * Return url to get back to applications list page
   * @returns {string}
   */
  getBackUrl = () => {
    if (this.props.isInstance) {
      return '/admin/ui/board'
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
    const action = this.props.isInstance ? this.props.updateInstanceLayout : this.props.updateLayout
    try {
      const layoutString = JSON.stringify(values.layout)
      Promise.resolve(action(this.props.layout.content.id,
        {
          id: this.props.layout.content.id,
          applicationId: this.props.layout.content.applicationId,
          layout: layoutString,
        },
      ))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            browserHistory.push(this.getBackUrl())
          }
        })
    } catch (e) {
      console.error('internal error during layout json object stringify for ', values.layout)
    }
  }

  displayLayout = () => {
    if (this.props.layout) {
      return (
        <ApplicationLayoutComponent
          layout={this.props.layout.content.layout}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      )
    }
    return null
  }

  render() {
    return (
      <I18nProvider messageDir="business-modules/admin-ui-layout-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={this.props.isFetching}
          isContentError={!this.props.isFetching && !this.props.layout}
        >
          {this.displayLayout()}
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
