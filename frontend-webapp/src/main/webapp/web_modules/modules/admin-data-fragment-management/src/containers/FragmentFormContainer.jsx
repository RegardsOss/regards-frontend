/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Fragment } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import FragmentFormComponent from '../components/FragmentFormComponent'
import { fragmentActions, fragmentSelectors } from '../client/FragmentClient'

/**
 * React container to manage the fragment form.
 * @author Léo Mieulet
 */
export class FragmentFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      fragment_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    fragment: Fragment,
    // from mapDispatchToProps
    createFragment: React.PropTypes.func,
    createFragmentUsingFile: React.PropTypes.func,
    fetchFragment: React.PropTypes.func,
    updateFragment: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    const isEditing = props.params.fragment_id !== undefined
    this.state = {
      isEditing,
      isLoading: isEditing,
    }
  }

  componentDidMount() {
    if (this.state.isEditing) {
      this.props.fetchFragment(this.props.params.fragment_id)
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/fragment/list`
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
    let task
    if (values.file) {
      task = this.props.createFragmentUsingFile({
        file: values.file,
      })
    } else {
      const newFragment = {
        name: values.name,
        description: values.description,
      }
      task = this.props.createFragment(newFragment)
    }
    Promise.resolve(task)
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  render() {
    const { isLoading, isEditing } = this.state
    return (
      <I18nProvider messageDir="modules/admin-data-fragment-management/src/i18n">
        <LoadableContentDisplayDecorator isLoading={isLoading}>
          {() => (
            <FragmentFormComponent
              onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
              backUrl={this.getBackUrl()}
              isCreating={!isEditing}
              currentFragment={this.props.fragment}
            />
          )}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  fragment: ownProps.params.fragment_id ? fragmentSelectors.getById(state, ownProps.params.fragment_id) : null,
})

const mapDispatchToProps = dispatch => ({
  createFragment: values => dispatch(fragmentActions.createEntity(values)),
  createFragmentUsingFile: file => dispatch(fragmentActions.createEntityUsingMultiPart({}, file)),
  updateFragment: (id, values) => dispatch(fragmentActions.updateEntity(id, values)),
  fetchFragment: id => dispatch(fragmentActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FragmentFormContainer)
