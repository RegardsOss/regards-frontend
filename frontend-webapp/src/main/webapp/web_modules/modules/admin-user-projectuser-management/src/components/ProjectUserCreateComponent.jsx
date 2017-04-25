import { isEqual, find, map, forEach } from 'lodash'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, ErrorTypes, Field, ValidationHelpers, RenderSelectField, reduxForm } from '@regardsoss/form-utils'
import { Role, ProjectUser, AccessGroup } from '@regardsoss/model'
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
export class ProjectUserCreateComponent extends React.Component {

  static propTypes = {
    currentUser: ProjectUser,
    roleList: React.PropTypes.objectOf(Role),
    groupList: React.PropTypes.objectOf(AccessGroup),
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    change: React.PropTypes.func,
  }

  static contextTypes = {
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
    if (!this.state.isCreating) {
      const { content: user } = this.props.currentUser
      const formValues = {
        email: user.email,
        roleName: user.role.name,
      }
      this.props.initialize(formValues)
      this.getCurrentUserGroups(user)
    }
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

  renderChipInput = () => (<div style={this.style.renderChipInput}>
    {map(this.state.tempGroup, group =>
      <Chip
        onRequestDelete={() => this.handleRemoveGroup(group)}
        style={this.style.chip}
        key={group.content.name}
      >
        {group.content.name}
      </Chip>)}
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
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
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

  render() {
    const { pristine, submitting, roleList } = this.props
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          {this.state.isCreating ?
            <CardTitle
              title={<FormattedMessage id="projectUser.create.title" />}
            /> :
            <CardTitle
              title={<FormattedMessage id="projectUser.edit.title" values={{ email: this.props.currentUser.content.email }} />}
            />
          }
          <CardText>

            <ShowableAtRender show={this.state.isCreating} >
              <Checkbox
                onCheck={this.handleCheckbox}
                label={<FormattedMessage id="projectUser.create.using.existing.account" />}
              />
            </ShowableAtRender>

            <Field
              name="email"
              fullWidth
              disabled={!this.state.isCreating}
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="projectUser.create.input.email" />}
            />
            <ShowableAtRender show={!this.state.useExistingAccount && this.state.isCreating} >
              <div>
                <Field
                  name="firstName"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  label={<FormattedMessage id="projectUser.create.input.firstName" />}
                />
                <Field
                  name="lastName"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  label={<FormattedMessage id="projectUser.create.input.lastName" />}
                />
                <Field
                  name="password"
                  fullWidth
                  component={RenderTextField}
                  type="password"
                  label={<FormattedMessage id="projectUser.create.input.password" />}
                />
              </div>
            </ShowableAtRender>
            <Field
              name="roleName"
              fullWidth
              component={RenderSelectField}
              label={<FormattedMessage id="projectUser.create.input.role" />}
            >
              {map(roleList, (role, id) => (
                <MenuItem
                  value={role.content.name}
                  key={id}
                  primaryText={role.content.name}
                />
              ))}
            </Field>
            <div style={this.style.groupsLabel}>
              <FormattedMessage id="projectUser.create.input.groups" />
            </div>
            {this.renderChipInput()}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={
                this.state.isCreating ?
                  <FormattedMessage id="projectUser.create.action.create" /> :
                  <FormattedMessage id="projectUser.edit.action.save" />
              }
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting}
              secondaryButtonLabel={<FormattedMessage id="projectUser.create.action.cancel" />}
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

export default reduxForm({
  form: 'user-form',
  validate,
})(ProjectUserCreateComponent)
