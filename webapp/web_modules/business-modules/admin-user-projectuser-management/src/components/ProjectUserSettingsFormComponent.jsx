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
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import get from 'lodash/get'
import Chip from 'material-ui/Chip'
import AddSvg from 'mdi-material-ui/Plus'
import Avatar from 'material-ui/Avatar'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { AdminDomain } from '@regardsoss/domain'
import { AdminShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import {
  RenderSelectField, Field, reduxForm, RenderTextField, ValidationHelpers, FieldHelp,
} from '@regardsoss/form-utils'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import dependencies from '../dependencies'
import UserGroupChip from './UserGroupChip'

/**
 * Project user settings form component
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class ProjectUserSettingsFormComponent extends React.Component {
  static propTypes = {
    settings: AdminShapes.ProjectUserSettings,
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

  state = {
    popoverOpen: false,
    tempGroups: [],
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  UNSAFE_componentWillMount() {
    const { settings, initialize } = this.props
    const groups = settings.groups || []
    this.setState({
      tempGroups: groups,
    })
    initialize({
      mode: settings.mode,
      maxQuota: (settings.maxQuota || 0).toString(),
      rateLimit: (settings.rateLimit || 0).toString(),
      role: (settings.role.name || AdminDomain.DEFAULT_ROLES_ENUM.PUBLIC),
      groups,
    })
  }

  getRoleName = (name = 'empty') => {
    const formatted = this.context.intl.formatMessage({ id: `project.user.settings.role.${name}` })
    if (formatted !== `project.user.settings.role.${name}`) {
      return formatted
    }
    return name
  }

  /**
   * User callback: submit. Converts edited values into publishable values
   * @param {*} values form edited values
   */
  onSubmit = (values) => {
    const { onSubmit, roleList } = this.props
    const submitRole = get(find(roleList, (role) => role.content.name === values.role), 'content', {})
    onSubmit({
      mode: values.mode,
      maxQuota: parseInt(values.maxQuota, 10),
      rateLimit: parseInt(values.rateLimit, 10),
      role: submitRole,
      groups: values.groups,
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
    }, () => this.props.change('groups', this.state.tempGroups))
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

  renderChipInput = () => {
    const { moduleTheme: { userForm } } = this.context
    return (
      <div style={userForm.renderChipInput}>
        {map(this.state.tempGroups, (groupName) => (
          <UserGroupChip
            key={groupName}
            groupName={groupName}
            onRemoveGroup={this.handleRemoveGroup}
          />))}
        <ShowableAtRender show={this.state.tempGroups.length !== Object.keys(this.props.groupList).length}>
          <Chip className="selenium-addChip" style={userForm.chip} onClick={this.handlePopoverOpen} backgroundColor={userForm.chipBackground}>
            <Avatar
              backgroundColor={userForm.avatarBackground}
              size={32}
              icon={<AddSvg />}
            />
            <FormattedMessage id="projectUser.create.action.add" />
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

  render() {
    const {
      submitting, pristine, invalid,
      handleSubmit, onBack, roleList,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { userForm } } = this.context
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'project.user.settings.title' })}
            subtitle={formatMessage({ id: 'project.user.settings.subtitle' })}
          />
          <CardText>
            {/* Project user validation mode  */}
            <Field
              name="mode"
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
            <Field
              name="maxQuota"
              fullWidth
              component={RenderTextField}
              validate={ProjectUserSettingsFormComponent.QUOTA_RESTRICTION_VALIDATORS}
              help={ProjectUserSettingsFormComponent.MAX_QUOTA_HELP}
              label={formatMessage({ id: 'project.user.settings.max.quota.field' })}
            />
            <Field
              name="rateLimit"
              fullWidth
              component={RenderTextField}
              validate={ProjectUserSettingsFormComponent.QUOTA_RESTRICTION_VALIDATORS}
              help={ProjectUserSettingsFormComponent.RATE_LIMIT_HELP}
              label={formatMessage({ id: 'project.user.settings.rate.limit.field' })}
            />
            <Field
              name="role"
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
            <div style={userForm.groupsLabel}>
              <FormattedMessage id="projectUser.create.input.groups" />
            </div>
            {this.renderChipInput()}
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

export default reduxForm({
  form: 'projectuser-setttings-form',
})(ProjectUserSettingsFormComponent)
