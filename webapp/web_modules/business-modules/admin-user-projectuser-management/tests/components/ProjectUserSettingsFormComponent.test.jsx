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
import forEach from 'lodash/forEach'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AdminDomain } from '@regardsoss/domain'
import { CardActionsComponent } from '@regardsoss/components'
import { Field, RenderSelectField, RenderTextField } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ProjectUserSettingsFormComponent } from '../../src/components/ProjectUserSettingsFormComponent'
import dependencies from '../../src/dependencies'

const context = buildTestContext()

/**
 * Test ProjectUserSettingsFormComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN USER PROJECTUSER MANAGEMENT] Testing ProjectUserSettingsFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserSettingsFormComponent)
  })
  it('should render correctly and initialize form values', () => {
    let spiedInitializedData = null
    let spiedSubmit = null
    const props = {
      settings: {
        id: 1,
        mode: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.MANUAL,
        maxQuota: 1150,
        rateLimit: -1,
      },
      onBack: () => { },
      onSubmit: (values) => {
        spiedSubmit = values
      },
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
      mode: props.settings.mode,
      maxQuota: props.settings.maxQuota.toString(),
      rateLimit: props.settings.rateLimit.toString(),
    })

    // check fields
    const modeFieldWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'mode',
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
      name: 'maxQuota',
      component: RenderTextField,
      validate: ProjectUserSettingsFormComponent.QUOTA_RESTRICTION_VALIDATORS,
      help: ProjectUserSettingsFormComponent.MAX_QUOTA_HELP,
      label: 'project.user.settings.max.quota.field',
    }, 'There should be the mode field')

    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'rateLimit',
      component: RenderTextField,
      validate: ProjectUserSettingsFormComponent.QUOTA_RESTRICTION_VALIDATORS,
      help: ProjectUserSettingsFormComponent.RATE_LIMIT_HELP,
      label: 'project.user.settings.rate.limit.field',
    }, 'There should be the mode field')

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

    // check submit conversion
    enzymeWrapper.instance().onSubmit({
      mode: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO,
      maxQuota: '505',
      rateLimit: '20',
    })

    assert.deepEqual(spiedSubmit, {
      mode: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO,
      maxQuota: 505,
      rateLimit: 20,
    }, 'Values should be converted to server format at submission')
  })
})
