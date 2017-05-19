/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { AccessGroup } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import AccessGroupFormComponent from '../components/AccessGroupFormComponent'


/**
 * Show the group form
 */
export class AccessGroupFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      accessGroupName: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    currentAccessGroup: AccessGroup,
    // from mapDispatchToProps
    fetchAccessGroup: PropTypes.func,
    updateAccessGroup: PropTypes.func,
    createAccessGroup: PropTypes.func,
  }

  constructor(props) {
    super(props)
    const isCreating = props.params.accessGroupName === undefined
    this.state = {
      isCreating,
      isEditing: props.params.accessGroupName !== undefined && props.params.mode === 'edit',
      isDuplicating: props.params.accessGroupName !== undefined && props.params.mode === 'duplicate',
      isLoading: !isCreating,
      isError: false,
    }
  }

  componentDidMount() {
    // If creation mode no accessGroup to fetch
    if (this.state.isCreating === false) {
      // Else, fetch the required accessGroup
      Promise.resolve(this.props.fetchAccessGroup(this.props.params.accessGroupName))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            this.setState({
              isLoading: false,
            })
          } else {
            this.setState({
              isLoading: false,
              isError: true,
            })
          }
        })
    }
  }


  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/access-right/access-group/list`
  }

  /**
   * Handle form submission on duplication / creation
   * Create a new AccessGroup
   * @param values form values
   */
  handleCreate = (values) => {
    const defaultValues = {
      users: [],
      accessRights: [],
    }
    if (this.state.isDuplicating) {
      defaultValues.users = this.props.currentAccessGroup.content.users
      defaultValues.accessRights = this.props.currentAccessGroup.content.accessRights
    }
    const newAccessGroup = Object.assign({}, defaultValues, {
      name: values.name,
      isPrivate: values.isPrivate,
    })
    Promise.resolve(this.props.createAccessGroup(newAccessGroup))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          browserHistory.push(this.getBackUrl())
        }
      })
  }


  /**
   * Handle form submission on update AccessGroup
   * @param values form values
   */
  handleUpdate = (values) => {
    const updatedAccessGroup = Object.assign({}, this.props.currentAccessGroup.content, {
      isPrivate: values.isPrivate,
    })
    Promise.resolve(this.props.updateAccessGroup(this.props.currentAccessGroup.content.name, updatedAccessGroup))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          browserHistory.push(this.getBackUrl())
        }
      })
  }

  renderAccessGroup = () => (
    <AccessGroupFormComponent
      isDuplicating={this.state.isDuplicating}
      isCreating={this.state.isCreating}
      isEditing={this.state.isEditing}
      currentAccessGroup={this.props.currentAccessGroup}
      onSubmit={this.state.isEditing ? this.handleUpdate : this.handleCreate}
      backUrl={this.getBackUrl()}
    />
  )


  render() {
    const { currentAccessGroup } = this.props
    const { isError, isLoading, isCreating } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-accessright-accessgroup-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
          isContentError={isError}
        >
          {this.renderAccessGroup}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentAccessGroup: ownProps.params.accessGroupName ? accessGroupSelectors.getById(state, ownProps.params.accessGroupName) : undefined,
})

const mapDispatchToProps = dispatch => ({
  fetchAccessGroup: name => dispatch(accessGroupActions.fetchEntity(name)),
  createAccessGroup: values => dispatch(accessGroupActions.createEntity(values)),
  updateAccessGroup: (name, values) => dispatch(accessGroupActions.updateEntity(name, values)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupFormContainer)
