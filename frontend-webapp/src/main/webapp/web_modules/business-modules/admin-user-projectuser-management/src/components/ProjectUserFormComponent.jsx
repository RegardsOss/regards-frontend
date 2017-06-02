import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, ErrorTypes, Field, ValidationHelpers, RenderSelectField, reduxForm } from '@regardsoss/form-utils'
import { Role, ProjectUser, AccessGroup } from '@regardsoss/model'
import { MetadataList, MetadataField } from '@regardsoss/user-metadata-common'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import Chip from 'material-ui/Chip'
import AddSvg from 'material-ui/svg-icons/content/add'
import Avatar from 'material-ui/Avatar'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

/**
 * Display edit and create project form
 */
export class ProjectUserFormComponent extends React.Component {

  static propTypes = {
    currentUser: ProjectUser,
    userMetadata: MetadataList.isRequired,
    roleList: PropTypes.objectOf(Role),
    groupList: PropTypes.objectOf(AccessGroup),
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    // eslint-disable-next-line react/no-unused-prop-types
    fetchPasswordValidity: PropTypes.func.isRequired,
    // from reduxForm
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.currentUser === undefined,
      useExistingAccount: false,
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
    if (!this.state.isCreating) {
      forEach(this.props.groupList, (group) => {
        forEach(group.content.users, (groupUser) => {
          if (groupUser.email === user.email) {
            this.handleAddGroup(group)
          }
        })
      })
    }
  }

  handleInitialize = () => {
    const { currentUser, userMetadata, initialize } = this.props
    let initialFormValues = {}
    if (!this.state.isCreating) {
      // A - only when editing
      // 1 - initialize groups already associated with user
      this.getCurrentUserGroups(currentUser.content)
      // 2 - keep current email and role name
      initialFormValues.email = currentUser.content.email
      initialFormValues.roleName = currentUser.content.role.name
    }
    // Always: initialize fields values from metadata
    initialFormValues = userMetadata.reduce((acc, { key, currentValue }) => ({
      ...acc,
      [key]: currentValue,
    }), initialFormValues)
    initialize(initialFormValues)
  }

  handleCheckbox = () => this.setState({ useExistingAccount: !this.state.useExistingAccount })

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

  handleAddGroup = (group) => {
    if (!this.state.tempGroup.includes(group)) {
      this.state.tempGroup.push(group)
    }
    this.props.change(`group.${group.content.name}`, group.content.name)
    this.handlePopoverClose()
  }

  handleRemoveGroup = (group) => {
    this.setState({
      tempGroup: this.state.tempGroup.filter(val => val.content.name !== group.content.name),
    })
    this.props.change(`group.${group.content.name}`, '')
  }

  renderChipInput = () => {
    const iconAnchor = { horizontal: 'left', vertical: 'top' }
    return (<div style={this.style.renderChipInput}>
      {map(this.state.tempGroup, group =>
        (<Chip
          onRequestDelete={() => this.handleRemoveGroup(group)}
          style={this.style.chip}
          key={group.content.name}
          className="selenium-chip"
        >
          {group.content.name}
        </Chip>))}
      <ShowableAtRender show={this.state.tempGroup.length !== Object.keys(this.props.groupList).length}>
        <Chip className="selenium-addChip" style={this.style.chip} onTouchTap={this.handlePopoverOpen} backgroundColor={this.style.chipBackground}>
          <Avatar
            backgroundColor={this.style.avatarBackground}
            size={32}
            icon={<AddSvg />}
          />
          Add
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
            <ShowableAtRender key={group.content.name} show={!find(this.state.tempGroup, o => isEqual(o, group))}>
              <MenuItem
                primaryText={group.content.name}
                onTouchTap={() => this.handleAddGroup(group)}
              />
            </ShowableAtRender>
          ))}
        </Menu>
      </Popover>
    </div>)
  }

  render() {
    const { invalid, pristine, userMetadata, submitting, roleList, passwordRules } = this.props
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
              <Checkbox
                onCheck={this.handleCheckbox}
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
            <ShowableAtRender show={!this.state.useExistingAccount && this.state.isCreating} >
              <div>
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
                <Field
                  name="password"
                  fullWidth
                  component={RenderTextField}
                  type="password"
                  label={formatMessage({ id: 'projectUser.create.input.password' })}
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
              isMainButtonDisabled={pristine || submitting || invalid}
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
  const { fetchPasswordValidity } = props
  return fetchPasswordValidity(password).then((result) => {
    const validity = get(result, 'payload.content.validity', false)
    const errors = {}
    if (!validity) { // invalid password
      errors.password = ErrorTypes.INVALID_PASSWORD
    }
    return errors
  })
}

export default reduxForm({
  form: 'user-form',
  validate,
  asyncValidate,
  asyncBlurFields: ['password'],
})(ProjectUserFormComponent)
