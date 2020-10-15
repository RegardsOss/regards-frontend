/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import {
  FieldArray, Field, RenderTextField, RenderCheckbox,
} from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { EditSettingsComponent } from '../../src/components/EditSettingsComponent'
import DocumentModelsFieldArrayComponent from '../../src/components/DocumentModelsFieldArrayComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test EditSettingsComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN UI SETTINGS MANAGEMENT] Testing EditSettingsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EditSettingsComponent)
  })
  const testCases = [{
    label: 'submitting',
    submitting: true,
    pristine: false,
    invalid: false,
    expectedDisabled: true,
  }, {
    label: 'pristine',
    submitting: false,
    pristine: true,
    invalid: false,
    expectedDisabled: true,
  }, {
    label: 'invalid',
    submitting: false,
    pristine: false,
    invalid: true,
    expectedDisabled: true,
  }, {
    label: 'submittable',
    submitting: false,
    pristine: false,
    invalid: false,
    expectedDisabled: false,
  }]
  testCases.forEach(({
    label, submitting, pristine, invalid, expectedDisabled,
  }) => it(`should render correctly in edition when ${label}`, () => {
    const props = {
      settings: {
        showVersion: true,
        documentModels: ['model3'],
        primaryQuicklookGroup: 'customMain',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      dataModelNames: [1, 2, 3, 4, 5].map((v) => `model${v}`),
      onBack: () => {},
      onSubmit: () => {},
      // from redux form
      submitting,
      pristine,
      invalid,
      initialize: () => {},
      handleSubmit: () => {},
    }
    const enzymeWrapper = shallow(<EditSettingsComponent {...props} />, { context })
    const fields = enzymeWrapper.find(Field)
    assert.lengthOf(fields, 2, 'There should be show version and main quicklook keyword fields')
    testSuiteHelpers.assertWrapperProperties(fields.at(0), {
      name: 'showVersion',
      component: RenderCheckbox,
    }, 'Show version field properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(fields.at(1), {
      name: 'primaryQuicklookGroup',
      component: RenderTextField,
    }, 'Main quicklook keyword field properties should be correctly set')
    const selectionField = enzymeWrapper.find(FieldArray)
    assert.lengthOf(selectionField, 1, 'There should be the field array')
    assert.lengthOf(selectionField, 1, 'There should be the field array')
    testSuiteHelpers.assertWrapperProperties(selectionField, {
      name: 'documentModels',
      dataModelNames: props.dataModelNames,
      component: DocumentModelsFieldArrayComponent,
    }, 'Selection field properties should be correctly set')

    const cardActionsComp = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsComp, 1, 'There should be card actions')
    testSuiteHelpers.assertWrapperProperties(cardActionsComp, {
      mainButtonLabel: 'ui.admin.settings.action.confirm',
      mainButtonType: 'submit',
      mainHateoasDependencies: EditSettingsComponent.SUBMIT_DEPENDENCIES,
      isMainButtonDisabled: expectedDisabled,
      secondaryButtonLabel: 'ui.admin.settings.action.cancel',
      secondaryButtonClick: props.onBack,
    })
  }))
  it('should initialize correctly in creation mode', () => {
    const spyInitialize = {}
    const props = {
      settings: null,
      dataModelNames: [1, 2, 3, 4, 5].map((v) => `model${v}`),
      onBack: () => {},
      onSubmit: () => {},
      // from redux form
      submitting: false,
      pristine: true,
      invalid: false,
      initialize: (values) => { spyInitialize.values = values },
      handleSubmit: () => {},
    }
    shallow(<EditSettingsComponent {...props} />, { context })
    assert.deepEqual(spyInitialize.values, UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
      'Default settings should be used when there is no saved settings (lifecycle initialization)')
  })
})
