import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import some from 'lodash/some'
import filter from 'lodash/filter'
import values from 'lodash/values'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import { formValueSelector } from 'redux-form'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, ErrorTypes, Field, ValidationHelpers, RenderSelectField, RenderCheckbox, reduxForm } from '@regardsoss/form-utils'
import { Role, ProjectUser, AccessGroup } from '@regardsoss/model'
import { MetadataList, MetadataField } from '@regardsoss/user-metadata-common'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import AddSvg from 'material-ui/svg-icons/content/add'
import Avatar from 'material-ui/Avatar'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

/**
 * Display edit and create project form
 */
export class ProjectUserFormComponent extends React.Component {

  static POPOVER_ANCHOR_ORIGIN = { horizontal: 'left', vertical: 'top' }

  static propTypes = {
    currentUser: ProjectUser,
    userMetadata: MetadataList.isRequired,
    roleList: PropTypes.objectOf(Role),
    groupList: PropTypes.objectOf(AccessGroup),
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    __unregisterField: PropTypes.func, // We need __ otherwise the function is not useable
    // eslint-disable-next-line react/no-unused-prop-types
    fetchPasswordValidity: PropTypes.func.isRequired,
    // from reduxForm
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func,
    // from redux field connector
    useExistingAccount: PropTypes.bool, // should use existing account
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.currentUser === undefined,
      popoverOpen: false,
      tempGroup: [],
    }
  }

  componentWillMount() {
    this.style = {
      chipBackground: this.context.muiTheme.palette.primary1Color,
      avatarBackground: this.context.muiTheme.palette.primary2Color,
      renderChipInput: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 4,
      },
      chip: {
        margin: 4,
      },
      groupsLabel: {
        color: this.context.muiTheme.textField.floatingLabelColor,
        fontFamily: this.context.muiTheme.fontFamily,
        fontSize: '0.9em',
        marginTop: 21,
        marginBottom: 7,
      },
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getCurrentUserGroups = (user) => {
    const currentUserGroups = {}
    forEach(this.props.groupList, (group) => {
      if (some(group.content.users, groupUser => groupUser.email === user.email)) {
        currentUserGroups[group.content.name] = group.content.name
      }
    })
    return currentUserGroups
  }

  handleInitialize = () => {
    const { currentUser, userMetadata, initialize } = this.props
    let initialFormValues = {}
    if (!this.state.isCreating) {
      // A - only when editing
      // 1 - initialize groups already associated with user
      const currentUserGroups = this.getCurrentUserGroups(currentUser.content)
      initialFormValues.group = currentUserGroups
      this.setState({
        tempGroup: values(currentUserGroups)
      })
      // 2 - keep current email and role name
      initialFormValues.email = currentUser.content.email
      initialFormValues.roleName = currentUser.content.role.name
      initialFormValues.useExistingAccount = true // always, as account is already created
    } else {
      initialFormValues.useExistingAccount = false // when creating a user, disabled by default
    }
    // Always: initialize fields values from metadata
    initialFormValues = userMetadata.reduce((acc, { key, currentValue }) => ({
      ...acc,
      [key]: currentValue,
    }), initialFormValues)
    initialize(initialFormValues)
  }

  handlePopoverOpen = (event) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      popoverOpen: true,
      popoverAnchor: event.currentTarget,
    })
  }

  handlePopoverClose = () => {
    this.setState({
      popoverOpen: false,
    })
  }

  handleAddGroup = (groupName) => {
    this.setState({
      tempGroup: [
        ...this.state.tempGroup,
        groupName
      ]
    })
    this.props.change(`group.${groupName}`, groupName)
    this.handlePopoverClose()
  }

  handleRemoveGroup = (groupName) => {
    const { __unregisterField } = this.props
    this.setState({
      tempGroup: this.state.tempGroup.filter(val => val !== groupName),
    })
    __unregisterField('user-form', `group.${groupName}`)
  }

  renderChipInput = () => {
    const iconAnchor = { horizontal: 'left', vertical: 'top' }
    return (<div style={this.style.renderChipInput}>
      {map(this.state.tempGroup, groupName =>
        (<Chip
          onRequestDelete={() => this.handleRemoveGroup(groupName)}
          style={this.style.chip}
          key={groupName}
          className="selenium-chip"
        >
          {groupName}
        </Chip>))}
      <ShowableAtRender show={this.state.tempGroup.length !== Object.keys(this.props.groupList).length}>
        <Chip className="selenium-addChip" style={this.style.chip} onTouchTap={this.handlePopoverOpen} backgroundColor={this.style.chipBackground}>
          <Avatar
            backgroundColor={this.style.avatarBackground}
            size={32}
            icon={<AddSvg />}
          />
          <FormattedMessage id="projectUser.create.action.add" />
        </Chip>
      </ShowableAtRender>
      <Popover
        open={this.state.popoverOpen}
        anchorEl={this.state.popoverAnchor}
        anchorOrigin={iconAnchor}
        animation={PopoverAnimationVertical}
        onRequestClose={this.handlePopoverClose}
      >
        <Menu>
          {map(this.props.groupList, group => (
            <ShowableAtRender
              key={group.content.name}
              show={!find(this.state.tempGroup, o => isEqual(o, group.content.name))}
            >
              <MenuItem
                primaryText={group.content.name}
                onTouchTap={() => this.handleAddGroup(group.content.name)}
              />
            </ShowableAtRender>
          ))}
        </Menu>
      </Popover>
    </div>)
  }

  render() {
    const { invalid, userMetadata, submitting, roleList, passwordRules, useExistingAccount } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          {this.state.isCreating ?
            <CardTitle
              title={formatMessage({ id: 'projectUser.create.title' })}
              subtitle={formatMessage({ id: 'projectUser.create.message' }, { passwordRules })}
            /> :
            <CardTitle
              title={formatMessage({ id: 'projectUser.edit.title' }, { email: this.props.currentUser.content.email })}
            />
          }
          <CardText>

            <ShowableAtRender show={this.state.isCreating} >
              <Field
                name="useExistingAccount"
                component={RenderCheckbox}
                label={formatMessage({ id: 'projectUser.create.using.existing.account' })}
              />
            </ShowableAtRender>

            <Field
              name="email"
              fullWidth
              disabled={!this.state.isCreating}
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'projectUser.create.input.email' })}
            />
            { /* Show account creation options when creating an account */}
            <ShowableAtRender show={!useExistingAccount && this.state.isCreating} >
              <div>
                <Field
                  name="password"
                  fullWidth
                  component={RenderTextField}
                  type="password"
                  label={formatMessage({ id: 'projectUser.create.input.password' })}
                />
                <Field
                  name="firstName"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  label={formatMessage({ id: 'projectUser.create.input.firstName' })}
                />
                <Field
                  name="lastName"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  label={formatMessage({ id: 'projectUser.create.input.lastName' })}
                />
              </div>
            </ShowableAtRender>
            <Field
              name="roleName"
              fullWidth
              component={RenderSelectField}
              label={formatMessage({ id: 'projectUser.create.input.role' })}
            >
              {map(roleList, (role, id) => (
                <MenuItem
                  value={role.content.name}
                  key={id}
                  primaryText={role.content.name}
                />
              ))}
            </Field>
            {
              // show user metadata for project
              userMetadata.map(metadata =>
                (<MetadataField
                  key={metadata.key}
                  metadata={metadata}
                  fullWidth
                />))
            }
            <div style={this.style.groupsLabel}>
              <FormattedMessage id="projectUser.create.input.groups" />
            </div>
            {this.renderChipInput()}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={
                this.state.isCreating ?
                  formatMessage({ id: 'projectUser.create.action.create' }) :
                  formatMessage({ id: 'projectUser.edit.action.save' })
              }
              mainButtonType="submit"
              isMainButtonDisabled={ submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'projectUser.create.action.cancel' })}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}


function validate(values) {
  const errors = {}
  if (values.email) {
    if (!ValidationHelpers.isValidEmail(values.email)) {
      errors.email = ErrorTypes.EMAIL
    }
  } else {
    errors.email = ErrorTypes.REQUIRED
  }
  if (!values.firstName) {
    errors.firstName = ErrorTypes.REQUIRED
  }
  if (!values.lastName) {
    errors.lastName = ErrorTypes.REQUIRED
  }
  if (!values.password) {
    errors.password = ErrorTypes.REQUIRED
  }
  return errors
}

/**
 * Asynchronous password validation (the server computes validity)
 * @param {*} values form values
 * @param {*} dispatch  dispatch
 * @param {*} props  properties
 */
function asyncValidate({ password }, dispatch, props) {
  // ugly async connection should be done by the container bu we can't
  const { fetchPasswordValidity, useExistingAccount } = props
  if (useExistingAccount) {
    // no need to validated password there as it will not be entered
    return Promise.resolve({})
  }
  // validate password
  return fetchPasswordValidity(password).then((result) => {
    const validity = get(result, 'payload.content.validity', false)
    const errors = {}
    if (!validity) { // invalid password
      errors.password = ErrorTypes.INVALID_PASSWORD
    }
    return errors
  })
}

const connectedReduxForm = reduxForm({
  form: 'user-form',
  validate,
  asyncValidate,
  asyncBlurFields: ['password'],
})(ProjectUserFormComponent)

// connect with selector to select the last mail value
const selector = formValueSelector('user-form')
export default connect(
  state => ({
    useExistingAccount: selector(state, 'useExistingAccount'),
  }),
)(connectedReduxForm)
