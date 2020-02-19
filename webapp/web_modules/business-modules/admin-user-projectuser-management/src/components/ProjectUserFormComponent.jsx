/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import some from 'lodash/some'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import trim from 'lodash/trim'
import { formValueSelector } from 'redux-form'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import {
  RenderTextField, ErrorTypes, Field, ValidationHelpers, RenderSelectField, RenderCheckbox, reduxForm,
} from '@regardsoss/form-utils'
import { AdminShapes, DataManagementShapes } from '@regardsoss/shape'
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

const { required, email } = ValidationHelpers
const requiredEmailValidator = [required, email]

/**
 * Display edit and create project form
 */
export class ProjectUserFormComponent extends React.Component {
  static POPOVER_ANCHOR_ORIGIN = { horizontal: 'left', vertical: 'top' }

  static propTypes = {
    currentUser: AdminShapes.ProjectUser,
    userMetadata: MetadataList.isRequired,
    roleList: AdminShapes.RoleList,
    groupList: DataManagementShapes.AccessGroupList,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
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
      tempGroups: [],
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
    const currentUserGroups = []
    forEach(this.props.groupList, (group) => {
      if (some(group.content.users, groupUser => groupUser.email === user.email)) {
        currentUserGroups.push(group.content.name)
      }
    })
    return currentUserGroups
  }

  getRoleName = (name = 'empty') => {
    const formated = this.context.intl.formatMessage({ id: `role.name.${name}` })
    if (formated !== `role.name.${name}`) {
      return formated
    }
    return name
  }

  handleInitialize = () => {
    const { currentUser, userMetadata, initialize } = this.props
    let initialFormValues = {}
    if (!this.state.isCreating) {
      // A - only when editing
      // 1 - initialize groups already associated with user
      const currentUserGroups = this.getCurrentUserGroups(currentUser.content)
      initialFormValues.groups = currentUserGroups
      this.setState({
        tempGroups: currentUserGroups,
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
      tempGroups: [
        ...this.state.tempGroups,
        groupName,
      ],
    }, () => this.props.change('groups', this.state.tempGroups))
    this.handlePopoverClose()
  }

  handleRemoveGroup = (groupName) => {
    this.setState({
      tempGroups: this.state.tempGroups.filter(val => val !== groupName),
    }, () => this.props.change('groups', this.state.tempGroups))
  }

  renderChipInput = () => {
    const iconAnchor = { horizontal: 'left', vertical: 'top' }
    return (
      <div style={this.style.renderChipInput}>
        {map(this.state.tempGroups, groupName => (
          <Chip
            onRequestDelete={() => this.handleRemoveGroup(groupName)}
            style={this.style.chip}
            key={groupName}
            className="selenium-chip"
          >
            {groupName}
          </Chip>))}
        <ShowableAtRender show={this.state.tempGroups.length !== Object.keys(this.props.groupList).length}>
          <Chip className="selenium-addChip" style={this.style.chip} onClick={this.handlePopoverOpen} backgroundColor={this.style.chipBackground}>
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
                show={!find(this.state.tempGroups, o => isEqual(o, group.content.name))}
              >
                <MenuItem
                  primaryText={group.content.name}
                  onClick={() => this.handleAddGroup(group.content.name)}
                />
              </ShowableAtRender>
            ))}
          </Menu>
        </Popover>
      </div>)
  }

  render() {
    const {
      invalid, userMetadata, submitting, roleList, passwordRules, useExistingAccount,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          {this.state.isCreating
            ? <CardTitle
              title={formatMessage({ id: 'projectUser.create.title' })}
              subtitle={formatMessage({ id: 'projectUser.create.message' }, { passwordRules })}
            />
            : <CardTitle
              title={formatMessage({ id: 'projectUser.edit.title' }, { email: this.props.currentUser.content.email })}
            />
          }
          <CardText>

            <ShowableAtRender show={this.state.isCreating}>
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
              validate={requiredEmailValidator}
              normalize={trim}
            />
            { /* Show account creation options when creating an account */}
            <ShowableAtRender show={!useExistingAccount && this.state.isCreating}>
              <div>
                <Field
                  name="password"
                  fullWidth
                  component={RenderTextField}
                  type="password"
                  label={formatMessage({ id: 'projectUser.create.input.password' })}
                  validate={required}
                  normalize={trim}
                />
                <Field
                  name="confirmPassword"
                  fullWidth
                  component={RenderTextField}
                  type="password"
                  label={formatMessage({ id: 'projectUser.create.input.password.confirm' })}
                  validate={required}
                  normalize={trim}
                />
                <Field
                  name="firstName"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  label={formatMessage({ id: 'projectUser.create.input.firstName' })}
                  validate={required}
                />
                <Field
                  name="lastName"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  label={formatMessage({ id: 'projectUser.create.input.lastName' })}
                  validate={required}
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
                  primaryText={this.getRoleName(role.content.name)}
                />
              ))}
            </Field>
            {
              // show user metadata for project
              userMetadata.map(metadata => (<MetadataField
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
                this.state.isCreating
                  ? formatMessage({ id: 'projectUser.create.action.create' })
                  : formatMessage({ id: 'projectUser.edit.action.save' })
              }
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'projectUser.create.action.cancel' })}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

function validate(fieldValues) {
  const errors = {}

  if (fieldValues.confirmPassword && fieldValues.password && fieldValues.password !== fieldValues.confirmPassword) {
    errors.password = ErrorTypes.DIFFERENT_PASSWORDS
    errors.confirmPassword = ErrorTypes.DIFFERENT_PASSWORDS
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
    const validity = get(result, 'payload.validity', false)
    if (!validity) { // invalid password
      // Redux form api
      // eslint-disable-next-line no-throw-literal
      throw { password: ErrorTypes.INVALID_PASSWORD }
    }
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
export default connect(state => ({
  useExistingAccount: selector(state, 'useExistingAccount'),
}))(connectedReduxForm)
