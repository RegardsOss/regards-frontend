/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import find from 'lodash/find'
import pickBy from 'lodash/pickBy'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import trim from 'lodash/trim'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import AddSvg from 'mdi-material-ui/Plus'
import Avatar from 'material-ui/Avatar'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import { formValueSelector } from 'redux-form'
import {
  AccessShapes, AdminShapes, CommonShapes, DataManagementShapes,
} from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonDomain, AdminDomain } from '@regardsoss/domain'
import { MetadataList, MetadataField } from '@regardsoss/user-metadata-common'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import {
  RenderTextField, ErrorTypes, Field, ValidationHelpers, RenderSelectField, RenderCheckbox, reduxForm, FieldHelp,
} from '@regardsoss/form-utils'
import UserGroupChip from './UserGroupChip'
import { SETTINGS } from './ProjectUserSettingsFormComponent'

const { getValue } = CommonDomain.SettingsUtils

/**
 * Display edit and create project form
 */
export class ProjectUserFormComponent extends React.Component {
  static POPOVER_ANCHOR_ORIGIN = { horizontal: 'left', vertical: 'top' }

  static propTypes = {
    currentUser: AccessShapes.ProjectUser,
    userMetadata: MetadataList.isRequired,
    settings: CommonShapes.SettingsList,
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
    pristine: PropTypes.bool,
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

  /** Email field validators */
  static EMAIL_FIELD_VALIDATORS = [ValidationHelpers.required, ValidationHelpers.email, ValidationHelpers.validStringSize(0, 255)]

  /** Quota field validators */
  static QUOTA_FIELDS_VALIDATORS = [ValidationHelpers.required, ValidationHelpers.getIntegerInRangeValidator(-1, Number.MAX_SAFE_INTEGER)]

  /** Text field validators **/
  static TEXT_FIELD_VALIDATORS = [ValidationHelpers.required, ValidationHelpers.validStringSize(0, 255)]

  static ICON_ANCHOR = { horizontal: 'left', vertical: 'top' }

  state = {
    isCreating: isNil(this.props.currentUser),
    popoverOpen: false,
    tempGroups: {},
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getCurrentUserGroups = (user) => {
    let currentUserGroups = {}
    forEach(user.accessGroups, (group) => {
      currentUserGroups = {
        ...currentUserGroups,
        [group]: {
          name: group,
          isAdded: false,
        },
      }
    })
    return currentUserGroups
  }

  getRoleName = (name = 'empty') => {
    const { intl: { formatMessage } } = this.context
    let roleName = name
    const defaultRoleFound = find(AdminDomain.DEFAULT_ROLES_ENUM, (defaultRole) => defaultRole === name)
    if (defaultRoleFound) {
      roleName = formatMessage({ id: `projectUser.list.table.role.label.${name}` })
    }
    return roleName
  }

  handleInitialize = () => {
    const {
      currentUser, userMetadata, settings, initialize,
    } = this.props
    let initialFormValues = {}
    if (this.state.isCreating) {
      // A.1 - when creating: no value to restore, initialize quota related parameters to tenant defaults
      initialFormValues.useExistingAccount = false
      initialFormValues.maxQuota = getValue(settings, SETTINGS.MAX_QUOTA)
      initialFormValues.rateLimit = getValue(settings, SETTINGS.RATE_LIMIT)
    } else {
      // A.2 - only when editing: initialize groups already associated with user, and restore other user values
      const currentUserGroups = this.getCurrentUserGroups(currentUser.content)
      initialFormValues.accessGroups = map(currentUserGroups, (group) => group.name)
      this.setState({
        tempGroups: currentUserGroups,
      })
      initialFormValues.email = currentUser.content.email
      initialFormValues.roleName = currentUser.content.role.name
      initialFormValues.maxQuota = currentUser.content.maxQuota
      initialFormValues.rateLimit = currentUser.content.rateLimit
      initialFormValues.useExistingAccount = true // always, as account is already created
    }
    // Always: initialize fields values from metadata (values are empty when creating)
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
      tempGroups: {
        ...this.state.tempGroups,
        [groupName]: {
          name: groupName,
          isAdded: true,
        },
      },
    }, () => this.props.change('accessGroups', map(this.state.tempGroups, (group) => group.name)))
    this.handlePopoverClose()
  }

  handleRemoveGroup = (groupName) => {
    this.setState({
      tempGroups: pickBy(this.state.tempGroups, (val) => val.name !== groupName),
    }, () => this.props.change('accessGroups', map(this.state.tempGroups, (group) => group.name)))
  }

  renderChipInput = () => {
    const { groupList } = this.props
    const { moduleTheme: { userForm }, intl: { formatMessage } } = this.context
    return (
      <div style={userForm.renderChipInput}>
        {map(this.state.tempGroups, (group) => (
          <UserGroupChip
            key={group.name}
            groupName={group.name}
            isAdded={group.isAdded}
            groupList={groupList}
            onRemoveGroup={this.handleRemoveGroup}
          />))}
        <ShowableAtRender show={this.state.tempGroups.length !== Object.keys(this.props.groupList).length}>
          <Chip className="selenium-addChip" style={userForm.chip} onClick={this.handlePopoverOpen} backgroundColor={userForm.chipBackground}>
            <Avatar
              backgroundColor={userForm.avatarBackground}
              size={32}
              icon={<AddSvg />}
            />
            {formatMessage({ id: 'projectUser.create.action.add' })}
          </Chip>
        </ShowableAtRender>
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.state.popoverAnchor}
          anchorOrigin={ProjectUserFormComponent.ICON_ANCHOR}
          animation={PopoverAnimationVertical}
          onRequestClose={this.handlePopoverClose}
        >
          <Menu>
            {map(this.props.groupList, (group) => (
              <ShowableAtRender
                key={group.content.name}
                show={!find(this.state.tempGroups, (o) => isEqual(o.name, group.content.name))}
              >
                <MenuItem
                  primaryText={group.content.name}
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
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
      invalid, pristine, userMetadata, submitting,
      currentUser, useExistingAccount, roleList,
      passwordRules, backUrl, onSubmit, handleSubmit,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { userForm } } = this.context
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          {this.state.isCreating
            ? <CardTitle
                title={formatMessage({ id: 'projectUser.create.title' })}
                subtitle={formatMessage({ id: 'projectUser.create.message' }, { passwordRules })}
            />
            : <CardTitle
                title={formatMessage({ id: 'projectUser.edit.title' }, { email: currentUser.content.email })}
            />}
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
              validate={ProjectUserFormComponent.EMAIL_FIELD_VALIDATORS}
              normalize={trim}
            />
            { /* Show account creation options when creating an account */}
            <ShowableAtRender show={!useExistingAccount && this.state.isCreating}>
              <Field
                name="password"
                fullWidth
                component={RenderTextField}
                type="password"
                label={formatMessage({ id: 'projectUser.create.input.password' })}
                validate={ProjectUserFormComponent.TEXT_FIELD_VALIDATORS}
                normalize={trim}
              />
              <Field
                name="confirmPassword"
                fullWidth
                component={RenderTextField}
                type="password"
                label={formatMessage({ id: 'projectUser.create.input.password.confirm' })}
                validate={ProjectUserFormComponent.TEXT_FIELD_VALIDATORS}
                normalize={trim}
              />
              <Field
                name="firstName"
                fullWidth
                component={RenderTextField}
                type="text"
                label={formatMessage({ id: 'projectUser.create.input.firstName' })}
                validate={ProjectUserFormComponent.TEXT_FIELD_VALIDATORS}
              />
              <Field
                name="lastName"
                fullWidth
                component={RenderTextField}
                type="text"
                label={formatMessage({ id: 'projectUser.create.input.lastName' })}
                validate={ProjectUserFormComponent.TEXT_FIELD_VALIDATORS}
              />
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
            {/* Quota and rate fields (with corresponding help) */}
            <Field
              name="maxQuota"
              label={formatMessage({ id: 'projectUser.create.input.max.quota' })}
              help={FieldHelp.buildDialogMessageHelp('projectUser.create.input.max.quota.help.message')}
              validate={ProjectUserFormComponent.QUOTA_FIELDS_VALIDATORS}
              component={RenderTextField}
              type="text"
              fullWidth
            />
            <Field
              name="rateLimit"
              label={formatMessage({ id: 'projectUser.create.input.rate.limit' })}
              help={FieldHelp.buildDialogMessageHelp('projectUser.create.input.rate.limit.help.message')}
              validate={ProjectUserFormComponent.QUOTA_FIELDS_VALIDATORS}
              component={RenderTextField}
              type="text"
              fullWidth

            />
            {
              // show user metadata for project
              userMetadata.map((metadata) => (<MetadataField
                key={metadata.key}
                metadata={metadata}
                fullWidth
              />))
            }
            <div style={userForm.groupsLabel}>
              {formatMessage({ id: 'projectUser.create.input.groups' })}
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
              isMainButtonDisabled={submitting || invalid || pristine}
              secondaryButtonLabel={formatMessage({ id: 'projectUser.create.action.cancel' })}
              secondaryButtonUrl={backUrl}
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
export default connect((state) => ({
  useExistingAccount: selector(state, 'useExistingAccount'),
}))(connectedReduxForm)
