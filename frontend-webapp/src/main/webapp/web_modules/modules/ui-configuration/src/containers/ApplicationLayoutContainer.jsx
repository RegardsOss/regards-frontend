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
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      application_id: React.PropTypes.string,
    }),
    // Set by mapDispatchToProps
    isFetching: React.PropTypes.bool,
    fetchLayout: React.PropTypes.func,
    updateLayout: React.PropTypes.func,
    layout: LayoutShape,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    this.props.fetchLayout(this.props.params.application_id)
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/ui-configuration/applications`
  }

  handleSubmit = (values) => {
    const updateLayout = Object.assign({}, this.props.layout, {
      layout: values.layout,
    })
    Promise.resolve(this.props.updateLayout(this.props.layout.id, updateLayout))
      .then(() => {
        const url = this.getBackUrl()
        browserHistory.push(url)
      })
  }

  render() {
    if (this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (!this.props.layout){
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
  fetchLayout: applicationId => dispatch(LayoutActions.fetchEntity(applicationId)),
  updateLayout: (applicationId, layout) => dispatch(LayoutActions.updateEntity(applicationId, layout)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationLayoutContainer)
