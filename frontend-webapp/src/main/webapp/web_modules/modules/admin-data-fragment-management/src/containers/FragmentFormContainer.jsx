/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { Fragment } from '@regardsoss/model'
import FragmentFormComponent from '../components/FragmentFormComponent'
import FragmentActions from '../model/FragmentActions'
import FragmentSelectors from '../model/FragmentSelectors'

export class FragmentFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      fragment_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    fragment: Fragment,
    isFragmentFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createFragment: React.PropTypes.func,
    fetchFragment: React.PropTypes.func,
    updateFragment: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.fragment_id !== undefined,
    }
  }

  componentDidMount() {
    if (this.state.isEditing) {
      this.props.fetchFragment(this.props.params.fragment_id)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/fragment/list`
  }

  /**
   * Return React form component
   * @returns {XML}
   */
  getFormComponent = () => {
    if (this.state.isEditing) {
      const { isFragmentFetching, fragment } = this.props
      if (isFragmentFetching) {
        return (<FormLoadingComponent />)
      }
      if (fragment) {
        return (<FragmentFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentFragment={fragment}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<FragmentFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
    />)
  }

  /**
   * Handle form submission when updating fragment
   * @param values form updated values
   */
  handleUpdate = (values) => {
    const previousFragment = this.props.fragment.content
    const updatedFragment = Object.assign({}, previousFragment, {
      description: values.description,
    })
    Promise.resolve(this.props.updateFragment(previousFragment.id, updatedFragment))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  /**
   * Handle form submission when creating fragment
   * @param values form values
   */
  handleCreate = (values) => {
    const newFragment = {
      name: values.name,
      description: values.description,
    }
    Promise.resolve(this.props.createFragment(newFragment))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-data-fragment-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  fragment: ownProps.params.fragment_id ? FragmentSelectors.getById(state, ownProps.params.fragment_id) : null,
  isFragmentFetching: FragmentSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createFragment: values => dispatch(FragmentActions.createEntity(values)),
  updateFragment: (id, values) => dispatch(FragmentActions.updateEntity(id, values)),
  fetchFragment: id => dispatch(FragmentActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FragmentFormContainer)
