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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain } from '@regardsoss/domain'
import { DatePickerField } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import TemporalCriterionComponent from '../../src/components/TemporalCriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TemporalCriterionComponent
 * @author Raphaël Mechali
 */
describe('[Two temporal criteria] Testing TemporalCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TemporalCriterionComponent)
  })
  it('should render correctly, with bounds and as start date', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-29T13:15:42.726Z')),
      value: new Date('2017-10-10T18:18:18.726Z'),
      hintDate: '2017-09-28T18:18:18.726Z',
      isStopDate: false,
      onDateChanged: () => {},
    }
    const enzymeWrapper = shallow(<TemporalCriterionComponent {...props} />, { context })
    const datePicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datePicker, 1, 'There should be the date picker')
    testSuiteHelpers.assertWrapperProperties(datePicker, {
      value: props.value,
      onChange: props.onDateChanged,
      defaultTime: TemporalCriterionComponent.DEFAULT_START_TIME,
      disabled: false,
      displayTime: true,
    })
  })
  it('should render correctly, with bounds and as stop date', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-29T13:15:42.726Z')),
      value: new Date('2017-10-10T18:18:18.726Z'),
      hintDate: '2018-09-29T13:15:42.726Z',
      isStopDate: true,
      onDateChanged: () => {},
    }
    const enzymeWrapper = shallow(<TemporalCriterionComponent {...props} />, { context })
    const datePicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datePicker, 1, 'There should be the date picker')
    testSuiteHelpers.assertWrapperProperties(datePicker, {
      value: props.value,
      onChange: props.onDateChanged,
      defaultTime: TemporalCriterionComponent.DEFAULT_STOP_TIME,
      disabled: false,
      displayTime: true,
    })
  })
  it('should render disabled witthout bounds data', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
      value: null,
      isStopDate: true,
      onDateChanged: () => {},
    }
    const enzymeWrapper = shallow(<TemporalCriterionComponent {...props} />, { context })
    const datePicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datePicker, 1, 'There should be the date picker')
    testSuiteHelpers.assertWrapperProperties(datePicker, {
      value: props.value,
      onChange: props.onDateChanged,
      disabled: true,
      displayTime: true,
    })
  })
})
