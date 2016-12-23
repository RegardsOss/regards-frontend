/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { connect } from 'react-redux'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import LayoutSelector from '../model/layout/LayoutSelector'
import LayoutActions from '../model/layout/LayoutActions'
import ApplicationLayoutComponent from '../components/ApplicationLayoutComponent'
import LayoutShape from '../model/layout/LayoutShape'

/**
 * Module container to retrieve and display a layout entity associated to an application id.
 */
class ApplicationLayoutContainer extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      application_id: React.PropTypes.string,
    }),
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    layout: LayoutShape,
    // Set by mapDispatchToProps
    fetchLayout: React.PropTypes.func,
    updateLayout: React.PropTypes.func,

  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    this.props.fetchLayout(this.props.params.application_id)
  }

  /**
   * Return url to get back to applications list page
   * @returns {string}
   */
  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/ui-configuration/applications`
  }

  /**
   * Manage action to update an application layout to the backend
   * @param values
   */
  handleSubmit = (values) => {
    try {
      Promise.resolve(this.props.updateLayout(this.props.layout.id, JSON.parse(values.layout)))
        .then(() => {
          const url = this.getBackUrl()
          browserHistory.push(url)
        })
    } catch (e) {
      console.log('Invalid JSON Format for layout update.')
    }
  }

  render() {
    if (this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (!this.props.layout) {
      return (<FormEntityNotFoundComponent />)
    }
    return (
      <I18nProvider messageDir="modules/ui-configuration/src/i18n">
        <ApplicationLayoutComponent layout={this.props.layout} onSubmit={this.handleSubmit} />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  layout: ownProps.params.application_id ? LayoutSelector.getContentById(state, ownProps.params.application_id) : null,
  isFetching: LayoutSelector.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchLayout: applicationId => dispatch(LayoutActions.fetchEntity(applicationId, dispatch)),
  updateLayout: (applicationId, layout) => dispatch(LayoutActions.updateEntity(applicationId, layout, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationLayoutContainer)
