/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import Chip from 'material-ui/Chip'
import isEmpty from 'lodash/isEmpty'
import AddSvg from 'mdi-material-ui/Plus'
import Avatar from 'material-ui/Avatar'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import map from 'lodash/map'
import IconButton from 'material-ui/IconButton'
import Clear from 'mdi-material-ui/Backspace'
import MenuItem from 'material-ui/MenuItem'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { AdminDomain, CommonDomain } from '@regardsoss/domain'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { AdminShapes, DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent, ShowableAtRender, ClearSettingFieldButton } from '@regardsoss/components'
import {
  RenderSelectField, Field, reduxForm, RenderTextField, ValidationHelpers, FieldHelp, RenderFieldArray,
  FieldArray,
} from '@regardsoss/form-utils'

import { themeContextType } from '@regardsoss/theme'
import dependencies from '../dependencies'
import UserGroupChip from './UserGroupChip'

const {
  getValue, getUpdatedSettingValue, getSetting, isDefaultValue,
} = CommonDomain.SettingsUtils

export const SETTINGS = {
  MAX_QUOTA: 'maxQuota',
  RATE_LIMIT: 'rateLimit',
  MODE: 'acceptance_mode',
  GROUPS: 'default_groups',
  ROLE: 'default_role',
  EMAILS_CONFIRM: 'user_creation_mail_recipients',
}

/**
 * Project user settings form component
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class ProjectUserSettingsFormComponent extends React.Component {
  static propTypes = {
    settings: CommonShapes.SettingsList,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    roleList: AdminShapes.RoleList,
    groupList: DataManagementShapes.AccessGroupList,
    // from redux form
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func,
    editedMaxQuota: PropTypes.number,
    editedRateLimit: PropTypes.number,
    editedMode: PropTypes.string,
    editedRole: PropTypes.string,
    editedGroups: PropTypes.arrayOf(PropTypes.string),
    editedEmailsConfirm: PropTypes.arrayOf(PropTypes.string),
  }

  static QUOTA_RESTRICTION_VALIDATORS = [
    ValidationHelpers.required,
    ValidationHelpers.getIntegerInRangeValidator(-1, Number.MAX_SAFE_INTEGER),
  ]

  /** Max quota field help content */
  static MAX_QUOTA_HELP = FieldHelp.buildDialogMessageHelp('project.user.settings.max.quota.help.message')

  /** Rate limit field help content */
  static RATE_LIMIT_HELP = FieldHelp.buildDialogMessageHelp('project.user.settings.rate.limit.help.message')

  static ICON_ANCHOR = { horizontal: 'left', vertical: 'top' }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static validateEmail(value) {
    let error = false
    if (!isEmpty(value)) {
      error = ValidationHelpers.email(value)
    }
    return error
  }

  state = {
    popoverOpen: false,
    tempGroups: [],
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  UNSAFE_componentWillMount() {
    const { settings, initialize } = this.props
    const groups = getValue(settings, SETTINGS.GROUPS) || []
    const role = getValue(settings, SETTINGS.ROLE)
    this.setState({
      tempGroups: groups,
    })
    initialize({
      [SETTINGS.MODE]: getValue(settings, SETTINGS.MODE),
      [SETTINGS.MAX_QUOTA]: (getValue(settings, SETTINGS.MAX_QUOTA) || 0).toString(),
      [SETTINGS.RATE_LIMIT]: (getValue(settings, SETTINGS.RATE_LIMIT) || 0).toString(),
      [SETTINGS.ROLE]: (role || AdminDomain.DEFAULT_ROLES_ENUM.PUBLIC),
      [SETTINGS.GROUPS]: groups,
      [SETTINGS.EMAILS_CONFIRM]: getValue(settings, SETTINGS.EMAILS_CONFIRM) || [],
    })
  }

  getRoleName = (name = 'empty') => {
    const { intl: { formatMessage } } = this.context
    let roleName = name
    const defaultRoleFound = find(AdminDomain.DEFAULT_ROLES_ENUM, (defaultRole) => defaultRole === name)
    if (defaultRoleFound) {
      roleName = formatMessage({ id: `project.user.settings.role.${name}` })
    }
    return roleName
  }

  /**
   * User callback: submit. Converts edited values into publishable values
   * @param {*} values form edited values
   */
  onSubmit = (values) => {
    const { onSubmit, settings } = this.props
    onSubmit({
      [SETTINGS.MODE]: getUpdatedSettingValue(settings, SETTINGS.MODE, values[SETTINGS.MODE]),
      [SETTINGS.MAX_QUOTA]: getUpdatedSettingValue(settings, SETTINGS.MAX_QUOTA, parseInt(values[SETTINGS.MAX_QUOTA], 10)),
      [SETTINGS.RATE_LIMIT]: getUpdatedSettingValue(settings, SETTINGS.RATE_LIMIT, parseInt(values[SETTINGS.RATE_LIMIT], 10)),
      [SETTINGS.ROLE]: getUpdatedSettingValue(settings, SETTINGS.ROLE, values[SETTINGS.ROLE]),
      [SETTINGS.GROUPS]: getUpdatedSettingValue(settings, SETTINGS.GROUPS, values[SETTINGS.GROUPS]),
      [SETTINGS.EMAILS_CONFIRM]: getUpdatedSettingValue(settings, SETTINGS.EMAILS_CONFIRM, values[SETTINGS.EMAILS_CONFIRM]),
    })
  }

  handlePopoverOpen = (event) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      popoverOpen: true,
      popoverAnchor: event.currentTarget,
    })
  }

  handleRemoveGroup = (groupName) => {
    this.setState({
      tempGroups: this.state.tempGroups.filter((val) => val !== groupName),
    }, () => this.props.change([SETTINGS.GROUPS], this.state.tempGroups))
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
    }, () => this.props.change([SETTINGS.GROUPS], this.state.tempGroups))
    this.handlePopoverClose()
  }

  renderChipInput = () => {
    const { moduleTheme: { userForm }, intl: { formatMessage } } = this.context

    return (
      <div style={userForm.renderChipInput}>
        {map(this.state.tempGroups, (groupName) => (
          <UserGroupChip
            key={groupName}
            groupName={groupName}
            onRemoveGroup={this.handleRemoveGroup}
            isAdded
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
          anchorOrigin={ProjectUserSettingsFormComponent.ICON_ANCHOR}
          animation={PopoverAnimationVertical}
          onRequestClose={this.handlePopoverClose}
        >
          <Menu>
            {map(this.props.groupList, (group) => (
              <ShowableAtRender
                key={group.content.name}
                show={!find(this.state.tempGroups, (o) => isEqual(o, group.content.name))}
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

  onClearInput = (settingName) => {
    const { settings, change } = this.props
    const settingFound = getSetting(settings, settingName)
    if (settingFound) {
      if (settingName === SETTINGS.GROUPS) { // we force re-render of groups field in order to correctly display the add group chip
        this.setState({
          tempGroups: [],
        })
      }
      change(settingName, settingFound.content.defaultValue)
    }
  }

  renderClearIcon = (settingName) => {
    const { intl: { formatMessage } } = this.context
    return (<IconButton
      tooltip={formatMessage({ id: 'oais.settings.clear' })}
    >
      <Clear onClick={() => this.onClearInput(settingName)} />
    </IconButton>)
  }

  render() {
    const {
      submitting, pristine, invalid,
      handleSubmit, onBack, roleList, settings, editedMaxQuota,
      editedRateLimit, editedMode, editedRole, editedGroups,
      editedEmailsConfirm,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { userForm, settings: { settingDiv } } } = this.context
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'project.user.settings.title' })}
            subtitle={formatMessage({ id: 'project.user.settings.subtitle' })}
          />
          <CardText>
            {/* Project user validation mode  */}
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.MODE)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.MODE, editedMode)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS.MODE}
                fullWidth
                component={RenderSelectField}
                label={formatMessage({ id: 'project.user.settings.mode.field' })}
              >
                { /* provide choice for every modes */
                  map(AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM, (value, key) => (
                    <MenuItem
                      key={key}
                      primaryText={formatMessage({ id: `project.user.settings.mode.${key}` })}
                      value={value}
                    />))
                }
              </Field>
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.MAX_QUOTA)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.MAX_QUOTA, editedMaxQuota)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS.MAX_QUOTA}
                fullWidth
                component={RenderTextField}
                validate={ProjectUserSettingsFormComponent.QUOTA_RESTRICTION_VALIDATORS}
                help={ProjectUserSettingsFormComponent.MAX_QUOTA_HELP}
                label={formatMessage({ id: 'project.user.settings.max.quota.field' })}
              />
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.RATE_LIMIT)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.RATE_LIMIT, editedRateLimit)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS.RATE_LIMIT}
                fullWidth
                component={RenderTextField}
                validate={ProjectUserSettingsFormComponent.QUOTA_RESTRICTION_VALIDATORS}
                help={ProjectUserSettingsFormComponent.RATE_LIMIT_HELP}
                label={formatMessage({ id: 'project.user.settings.rate.limit.field' })}
              />
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.ROLE)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.ROLE, editedRole)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS.ROLE}
                fullWidth
                component={RenderSelectField}
                label={formatMessage({ id: 'projectUser.create.input.role.default' })}
              >
                {map(roleList, (role, id) => (
                  <MenuItem
                    value={role.content.name}
                    key={id}
                    primaryText={this.getRoleName(role.content.name)}
                  />
                ))}
              </Field>
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.GROUPS)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.GROUPS, editedGroups)}
                addAlternateStyle
              />
              <div style={userForm.groupsLabel}>
                {formatMessage({ id: 'projectUser.create.input.groups' })}
                {this.renderChipInput()}
              </div>
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.EMAILS_CONFIRM)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.EMAILS_CONFIRM, editedEmailsConfirm)}
                addAlternateStyle
              />
              <FieldArray
                name={SETTINGS.EMAILS_CONFIRM}
                fullWidth
                component={RenderFieldArray}
                canBeEmpty
                title={formatMessage({ id: 'projectUser.create.input.emails_confirmation' })}
                warningText={formatMessage({ id: 'projectUser.create.input.emails_confirmation.add.warn' })}
                errorText={formatMessage({ id: 'projectUser.create.input.emails_confirmation.add.error' })}
                alreadyExistText={formatMessage({ id: 'projectUser.create.input.emails_confirmation.add.exist' })}
                floatingLabelText={formatMessage({ id: 'projectUser.create.input.emails_confirmation.add.floating.text' })}
                validateFunction={ProjectUserSettingsFormComponent.validateEmail}
                disabled={editedMode === AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO}
              />
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'project.user.settings.action.confirm' })}
              mainButtonType="submit"
              mainHateoasDependencies={dependencies.settingsDependencies}
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'project.user.settings.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>)
  }
}

const formID = 'projectuser-setttings-form'
const formValuesSelector = formValueSelector(formID)

/**
 * Selects currently edited attributes
 */
function selectedSetting(state) {
  return {
    editedMaxQuota: parseInt(formValuesSelector(state, [SETTINGS.MAX_QUOTA]), 10),
    editedRateLimit: parseInt(formValuesSelector(state, [SETTINGS.RATE_LIMIT]), 10),
    editedMode: formValuesSelector(state, [SETTINGS.MODE]),
    editedRole: formValuesSelector(state, [SETTINGS.ROLE]),
    editedGroups: formValuesSelector(state, [SETTINGS.GROUPS]),
    editedEmailsConfirm: formValuesSelector(state, [SETTINGS.EMAILS_CONFIRM]),
  }
}

export default connect(selectedSetting)(reduxForm({ form: formID })(ProjectUserSettingsFormComponent))
