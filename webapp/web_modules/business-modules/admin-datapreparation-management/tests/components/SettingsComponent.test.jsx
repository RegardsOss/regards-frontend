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
import { CommonDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CardActionsComponent } from '@regardsoss/components'
import { settingsData } from '../data/testData'
import { SettingsComponent, SETTINGS } from '../../src/components/SettingsComponent'
import styles from '../../src/styles'
import dependencies from '../../src/dependencies'

const context = buildTestContext(styles)
const { getValue } = CommonDomain.SettingsUtils

/**
 * Test SettingsComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DATAPREPARATION MANAGEMENT] Testing SettingsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SettingsComponent)
  })
  it('should render correctly and initialize form value', () => {
    let spiedInitializedData = null
    const props = {
      settings: settingsData,
      onBack: () => {},
      onSubmit: () => {},
      // from redux form
      submitting: false,
      pristine: false,
      invalid: false,
      initialize: (values) => {
        spiedInitializedData = values
      },
      handleSubmit: () => {},
    }
    const enzymeWrapper = shallow(<SettingsComponent {...props} />, { context })
    assert.deepEqual(spiedInitializedData, {
      [SETTINGS.SKIP_CONTENT_TYPES]: getValue(props.settings, SETTINGS.SKIP_CONTENT_TYPES),
    })

    // check actions
    const cardActionsWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should be the card actions')
    testSuiteHelpers.assertWrapperProperties(cardActionsWrapper, {
      mainButtonLabel: 'datapreparation.settings.action.confirm',
      mainButtonType: 'submit',
      mainHateoasDependencies: dependencies.settingsDependencies,
      isMainButtonDisabled: false, // not pristine nor invalid or submitting
      secondaryButtonLabel: 'datapreparation.settings.action.cancel',
      secondaryButtonClick: props.onBack,
    })
  })
})
