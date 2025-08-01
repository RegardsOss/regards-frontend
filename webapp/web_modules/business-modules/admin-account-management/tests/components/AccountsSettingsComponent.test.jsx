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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AdminInstanceDomain, CommonDomain } from '@regardsoss/domain'
import { CardActionsComponent } from '@regardsoss/components'
import { Field } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AccountsSettingsComponent, SETTINGS } from '../../src/components/AccountsSettingsComponent'
import dependencies from '../../src/dependencies'
import styles from '../../src/styles'

const context = buildTestContext(styles)
const { getValue } = CommonDomain.SettingsUtils

/**
 * Test AccountsSettingsComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN ACCOUNT MANAGEMENT] Testing AccountsSettingsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountsSettingsComponent)
  })
  it('should render correctly and initialize form values', () => {
    let spiedInitiliazeData = null
    const props = {
      settings: {
        0: {
          content: {
            name: SETTINGS.MODE,
            description: '',
            value: AdminInstanceDomain.ACCOUNT_SETTINGS_MODE_ENUM.MANUAL,
            defaultValue: AdminInstanceDomain.ACCOUNT_SETTINGS_MODE_ENUM.MANUAL,
          },
        },
      },
      onBack: () => { },
      onSubmit: () => { },
      submitting: false,
      pristine: false,
      invalid: false,
      initialize: (values) => {
        spiedInitiliazeData = values
      },
      handleSubmit: () => { },
      change: () => { },
    }
    const enzymeWrapper = shallow(<AccountsSettingsComponent {...props} />, { context })
    assert.deepEqual(spiedInitiliazeData, { [SETTINGS.MODE]: getValue(props.settings, SETTINGS.MODE) })

    assert.lengthOf(enzymeWrapper.find(Field).findWhere((n) => n.props().name === SETTINGS.MODE), 1, 'There should be the mode field')

    const cardActionsWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should be the card actions')
    testSuiteHelpers.assertWrapperProperties(cardActionsWrapper, {
      mainButtonLabel: 'account.settings.action.confirm',
      mainButtonType: 'submit',
      mainHateoasDependencies: dependencies.settingsDependencies,
      isMainButtonDisabled: false, // not pristine nor invalid or submitting
      secondaryButtonLabel: 'account.settings.action.cancel',
      secondaryButtonClick: props.onBack,
    })
  })
})
