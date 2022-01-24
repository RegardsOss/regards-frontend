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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import {
  Field, FieldHelp, RenderCheckbox, RenderTextField,
} from '@regardsoss/form-utils'
import { getMetadataArray, MetadataField } from '@regardsoss/user-metadata-common'
import { ShowableAtRender } from '@regardsoss/components'
import { AdminDomain } from '@regardsoss/domain'
import { ProjectUserFormComponent } from '../../src/components/ProjectUserFormComponent'
import { SETTINGS } from '../../src/components/ProjectUserSettingsFormComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

const defaultSettings = {
  0: {
    content: {
      name: SETTINGS.MAX_QUOTA,
      description: '',
      value: '500',
      defaultValue: '-1',
    },
  },
  1: {
    content: {
      name: SETTINGS.RATE_LIMIT,
      description: '',
      value: '50',
      defaultValue: '-1',
    },
  },
  2: {
    content: {
      name: SETTINGS.MODE,
      description: '',
      value: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO,
      defaultValue: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO,
    },
  },
}

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing ProjectUserFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserFormComponent)
  })

  it('should render edit form', () => {
    const spyInit = {}
    const props = {
      currentUser: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser'),
      userMetadata: getMetadataArray(DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser')),
      settings: defaultSettings,
      roleList: DumpProvider.get('AdminClient', 'Role'),
      groupList: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      passwordRules: '',
      fetchPasswordValidity: () => { },
      onSubmit: () => { },
      backUrl: 'some/url',
      // from Redux Form
      handleSubmit: () => { },
      initialize: (values) => { spyInit.values = values },
    }
    const enzymeWrapper = shallow(<ProjectUserFormComponent {...props} />, { context })
    // A - init
    assert.deepEqual(spyInit.values, {
      accessGroups: [],
      email: props.currentUser.content.email,
      roleName: props.currentUser.content.role.name,
      maxQuota: props.currentUser.content.maxQuota,
      rateLimit: props.currentUser.content.rateLimit,
      useExistingAccount: true,
      // with edited meta
      ...props.userMetadata.reduce((acc, { currentValue, key }) => ({
        ...acc,
        [key]: (currentValue),
      }), {}),
    })
    // B - project user fields
    // use existing account field: hidden by parent
    const useExistingAccField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'useExistingAccount',
      component: RenderCheckbox,
      label: 'projectUser.create.using.existing.account',
    }, 'use existing account field should be displayed')
    assert.isFalse(useExistingAccField.parent(ShowableAtRender).props().show, 'Use existing account field should be hidden in edition')
    // email: disabled
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'email',
      disabled: true,
      component: RenderTextField,
      type: 'text',
      label: 'projectUser.create.input.email',
      validate: ProjectUserFormComponent.EMAIL_FIELD_VALIDATORS,
    }, 'Email field should be displayed, disabled in edition')
    // password
    const passwordField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'password',
      component: RenderTextField,
      type: 'password',
      label: 'projectUser.create.input.password',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Password field should be displayed')
    assert.isFalse(passwordField.parent(ShowableAtRender).props().show, 'Password field should be hidden in edition')

    // confirm password
    const confirmPasswordField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'confirmPassword',
      component: RenderTextField,
      type: 'password',
      label: 'projectUser.create.input.password.confirm',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Confirm password field should be displayed')
    assert.isFalse(confirmPasswordField.parent(ShowableAtRender).props().show, 'Confirm password field should be hidden in edition')
    // first name
    const firstNameField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'firstName',
      component: RenderTextField,
      type: 'text',
      label: 'projectUser.create.input.firstName',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Fist name field should be displayed')
    assert.isFalse(firstNameField.parent(ShowableAtRender).props().show, 'First name field should be hidden in edition')
    // last name: hidden
    const lastNameField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'lastName',
      component: RenderTextField,
      type: 'text',
      label: 'projectUser.create.input.lastName',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Confirm password field should be displayed')
    assert.isFalse(lastNameField.parent(ShowableAtRender).props().show, 'Last name field should be hidden in edition')
    // max quota
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'maxQuota',
      component: RenderTextField,
      type: 'text',
      label: 'projectUser.create.input.max.quota',
      help: FieldHelp.buildDialogMessageHelp('projectUser.create.input.max.quota.help.message'),
      validate: ProjectUserFormComponent.QUOTA_FIELDS_VALIDATORS,
    }, 'Max quota field should be displayed')
    // rate limit quota
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'rateLimit',
      label: 'projectUser.create.input.rate.limit',
      help: FieldHelp.buildDialogMessageHelp('projectUser.create.input.rate.limit.help.message'),
      validate: ProjectUserFormComponent.QUOTA_FIELDS_VALIDATORS,
      component: RenderTextField,
      type: 'text',
    }, 'Max quota field should be displayed')

    // check metadata fields
    props.userMetadata.forEach((metadata) => {
      testSuiteHelpers.assertCompWithProps(enzymeWrapper, MetadataField, {
        metadata,
      }, `There should be a field for metadata ${metadata.key}`)
    })
  })

  it('should render create form for new account', () => {
    const spyInit = {}
    const props = {
      currentUser: null,
      userMetadata: getMetadataArray(),
      settings: defaultSettings,
      roleList: DumpProvider.get('AdminClient', 'Role'),
      groupList: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      passwordRules: '',
      fetchPasswordValidity: () => { },
      onSubmit: () => { },
      backUrl: 'some/url',
      // from Redux Form
      handleSubmit: () => { },
      initialize: (values) => { spyInit.values = values },
    }
    const enzymeWrapper = shallow(<ProjectUserFormComponent {...props} />, { context })
    // A - init
    assert.deepEqual(spyInit.values, {
      maxQuota: '500', // from tenant user settings
      rateLimit: '50', // from tenant user settings
      useExistingAccount: false, // by default
      // with edited meta
      ...props.userMetadata.reduce((acc, { currentValue, key }) => ({
        ...acc,
        [key]: (currentValue),
      }), {}),
    })
    // B - project user fields
    // use existing account field: hidden by parent
    const useExistingAccField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'useExistingAccount',
      component: RenderCheckbox,
      label: 'projectUser.create.using.existing.account',
    }, 'use existing account field should be displayed')
    assert.isTrue(useExistingAccField.parent(ShowableAtRender).props().show, 'Use existing account field should be displayed in creation')
    // email: disabled
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'email',
      disabled: false,
      component: RenderTextField,
      type: 'text',
      label: 'projectUser.create.input.email',
      validate: ProjectUserFormComponent.EMAIL_FIELD_VALIDATORS,
    }, 'Email field should be displayed, disabled in edition')
    // password
    const passwordField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'password',
      component: RenderTextField,
      type: 'password',
      label: 'projectUser.create.input.password',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Password field should be displayed')
    assert.isTrue(passwordField.parent(ShowableAtRender).props().show, 'Password field should be displayed in creation')

    // confirm password
    const confirmPasswordField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'confirmPassword',
      component: RenderTextField,
      type: 'password',
      label: 'projectUser.create.input.password.confirm',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Confirm password field should be displayed')
    assert.isTrue(confirmPasswordField.parent(ShowableAtRender).props().show, 'Confirm password field should be displayed in creation')
    // first name
    const firstNameField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'firstName',
      component: RenderTextField,
      type: 'text',
      label: 'projectUser.create.input.firstName',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Fist name field should be displayed')
    assert.isTrue(firstNameField.parent(ShowableAtRender).props().show, 'First name field should be displayed in creation')
    // last name: hidden
    const lastNameField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'lastName',
      component: RenderTextField,
      type: 'text',
      label: 'projectUser.create.input.lastName',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Confirm password field should be displayed')
    assert.isTrue(lastNameField.parent(ShowableAtRender).props().show, 'Last name field should be displayed in creation')
    // max quota
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'maxQuota',
      component: RenderTextField,
      type: 'text',
      label: 'projectUser.create.input.max.quota',
      help: FieldHelp.buildDialogMessageHelp('projectUser.create.input.max.quota.help.message'),
      validate: ProjectUserFormComponent.QUOTA_FIELDS_VALIDATORS,
    }, 'Max quota field should be displayed')
    // rate limit quota
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'rateLimit',
      label: 'projectUser.create.input.rate.limit',
      help: FieldHelp.buildDialogMessageHelp('projectUser.create.input.rate.limit.help.message'),
      validate: ProjectUserFormComponent.QUOTA_FIELDS_VALIDATORS,
      component: RenderTextField,
      type: 'text',
    }, 'Max quota field should be displayed')

    // check metadata fields
    props.userMetadata.forEach((metadata) => {
      testSuiteHelpers.assertCompWithProps(enzymeWrapper, MetadataField, {
        metadata,
      }, `There should be a field for metadata ${metadata.key}`)
    })
  })
  it('should render create form for reused account (only new user fields should be visible)', () => {
    const spyInit = {}
    const props = {
      currentUser: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser'),
      userMetadata: getMetadataArray(DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser')),
      settings: defaultSettings,
      roleList: DumpProvider.get('AdminClient', 'Role'),
      groupList: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      passwordRules: '',
      fetchPasswordValidity: () => { },
      onSubmit: () => { },
      backUrl: 'some/url',
      // from Redux Form
      handleSubmit: () => { },
      initialize: (values) => { spyInit.values = values },
      useExistingAccount: true,
    }
    const enzymeWrapper = shallow(<ProjectUserFormComponent {...props} />, { context })
    // password
    const passwordField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'password',
      component: RenderTextField,
      type: 'password',
      label: 'projectUser.create.input.password',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Password field should be displayed')
    assert.isFalse(passwordField.parent(ShowableAtRender).props().show, 'Password field should be hidden in when reusing an existing account')

    // confirm password
    const confirmPasswordField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'confirmPassword',
      component: RenderTextField,
      type: 'password',
      label: 'projectUser.create.input.password.confirm',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Confirm password field should be displayed')
    assert.isFalse(confirmPasswordField.parent(ShowableAtRender).props().show, 'Confirm password field should be hidden in when reusing an existing account')
    // first name
    const firstNameField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'firstName',
      component: RenderTextField,
      type: 'text',
      label: 'projectUser.create.input.firstName',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Fist name field should be displayed')
    assert.isFalse(firstNameField.parent(ShowableAtRender).props().show, 'First name field should be hidden in when reusing an existing account')
    // last name: hidden
    const lastNameField = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'lastName',
      component: RenderTextField,
      type: 'text',
      label: 'projectUser.create.input.lastName',
      validate: ProjectUserFormComponent.TEXT_FIELD_VALIDATORS,
    }, 'Confirm password field should be displayed')
    assert.isFalse(lastNameField.parent(ShowableAtRender).props().show, 'Last name field should be hidden in when reusing an existing account')
  })
})
