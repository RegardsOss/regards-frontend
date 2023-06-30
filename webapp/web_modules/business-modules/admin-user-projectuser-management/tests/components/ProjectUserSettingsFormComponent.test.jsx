/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import forEach from 'lodash/forEach'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AdminDomain, CommonDomain } from '@regardsoss/domain'
import { CardActionsComponent } from '@regardsoss/components'
import { Field, RenderSelectField, RenderTextField } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ProjectUserSettingsFormComponent, SETTINGS } from '../../src/components/ProjectUserSettingsFormComponent'
import dependencies from '../../src/dependencies'
import styles from '../../src/styles'

const context = buildTestContext(styles)
const { getValue } = CommonDomain.SettingsUtils

/**
 * Test ProjectUserSettingsFormComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[ADMIN USER PROJECTUSER MANAGEMENT] Testing ProjectUserSettingsFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserSettingsFormComponent)
  })
  it('should render correctly and initialize form values', () => {
    let spiedInitializedData = null
    const props = {
      settings: {
        0: {
          content: {
            name: SETTINGS.MAX_QUOTA,
            description: '',
            value: 1150,
            defaultValue: 1150,
          },
        },
        1: {
          content: {
            name: SETTINGS.RATE_LIMIT,
            description: '',
            value: -1,
            defaultValue: 10,
          },
        },
        2: {
          content: {
            name: SETTINGS.MODE,
            description: '',
            value: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.MANUAL,
            defaultValue: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.MANUAL,
          },
        },
        3: {
          content: {
            name: SETTINGS.GROUPS,
            description: '',
            value: [],
          },
        },
        4: {
          content: {
            name: SETTINGS.ROLE,
            description: '',
            value: {
              id: 2,
              name: 'REGISTERED_USER',
              parentRole: {
                id: 1,
                name: 'PUBLIC',
              },
              isDefault: true,
              isNative: true,
              authorizedAddresses: [],
            },
            defaultValue: {
              id: 2,
              name: 'REGISTERED_USER',
              parentRole: {
                id: 1,
                name: 'PUBLIC',
              },
              isDefault: true,
              isNative: true,
              authorizedAddresses: [],
            },
          },
        },
        5: {
          content: {
            name: SETTINGS.EMAILS_CONFIRM,
            description: '',
            value: [],
            defaultValue: [],
          },
        },
      },
      roleList: {
        REGISTERED_USER: {
          content: {
            id: 2,
            name: 'REGISTERED_USER',
            parentRole: {
              id: 1,
              name: 'PUBLIC',
            },
            isDefault: true,
            isNative: true,
            authorizedAddresses: [],
          },
        },
      },
      groupList: {
        Public: {
          content: {
            id: 1,
            name: 'Public',
            email: 'testemail',
            isPublic: true,
            isInternal: true,
          },
        },
      },
      onBack: () => { },
      onSubmit: () => { },
      submitting: false,
      pristine: false,
      invalid: false,
      initialize: (values) => {
        spiedInitializedData = values
      },
      handleSubmit: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserSettingsFormComponent {...props} />, { context })
    assert.deepEqual(spiedInitializedData, {
      [SETTINGS.MODE]: getValue(props.settings, SETTINGS.MODE),
      [SETTINGS.MAX_QUOTA]: getValue(props.settings, SETTINGS.MAX_QUOTA).toString(),
      [SETTINGS.RATE_LIMIT]: getValue(props.settings, SETTINGS.RATE_LIMIT).toString(),
      [SETTINGS.ROLE]: getValue(props.settings, SETTINGS.ROLE),
      [SETTINGS.GROUPS]: getValue(props.settings, SETTINGS.GROUPS),
      [SETTINGS.EMAILS_CONFIRM]: getValue(props.settings, SETTINGS.EMAILS_CONFIRM),
    })

    // check fields
    const modeFieldWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: SETTINGS.MODE,
      label: 'project.user.settings.mode.field',
      component: RenderSelectField,
    }, 'There should be the mode field')
    forEach(AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM, (mode, key) => {
      testSuiteHelpers.assertCompWithProps(modeFieldWrapper, MenuItem, {
        primaryText: `project.user.settings.mode.${key}`,
        value: mode,
      }, `There should be option for mode ${mode}`)
    })

    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: SETTINGS.MAX_QUOTA,
      component: RenderTextField,
      validate: ProjectUserSettingsFormComponent.QUOTA_RESTRICTION_VALIDATORS,
      help: ProjectUserSettingsFormComponent.MAX_QUOTA_HELP,
      label: 'project.user.settings.max.quota.field',
    }, 'There should be the mode field')

    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: SETTINGS.RATE_LIMIT,
      component: RenderTextField,
      validate: ProjectUserSettingsFormComponent.QUOTA_RESTRICTION_VALIDATORS,
      help: ProjectUserSettingsFormComponent.RATE_LIMIT_HELP,
      label: 'project.user.settings.rate.limit.field',
    }, 'There should be the mode field')

    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: SETTINGS.ROLE,
      component: RenderSelectField,
      label: 'projectUser.create.input.role.default',
    })

    // check actions
    const cardActionsWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should be the card actions')
    testSuiteHelpers.assertWrapperProperties(cardActionsWrapper, {
      mainButtonLabel: 'project.user.settings.action.confirm',
      mainButtonType: 'submit',
      mainHateoasDependencies: dependencies.settingsDependencies,
      isMainButtonDisabled: false, // not pristine nor invalid or submitting
      secondaryButtonLabel: 'project.user.settings.action.cancel',
      secondaryButtonClick: props.onBack,
    })
  })
})
