/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DatePickerField } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TemporalCriteriaComponent from '../../src/components/TemporalCriteriaComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TemporalCriteriaComponent
 * @author Raphaël Mechali
 */
describe('[PLUGIN TWO TEMPORAL CRITERIA] Testing TemporalCriteriaComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TemporalCriteriaComponent)
  })
  it('should render correctly when enabled', () => {
    const props = {
      onChange: () => {},
      value: new Date(),
      isStopDate: false,
      tooltip: 'tooltip',
      hintDate: new Date(0).toUTCString(),
      disabled: false,
    }
    const enzymeWrapper = shallow(<TemporalCriteriaComponent {...props} />, { context })
    const datePicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datePicker, 1, 'There should be the date picker')
    testSuiteHelpers.assertWrapperProperties(datePicker, {
      value: props.value,
      onChange: enzymeWrapper.instance().handleChangeDate,
      tooltip: props.tooltip,
      okLabel: 'criterion.date.picker.ok',
      cancelLabel: 'criterion.date.picker.cancel',
      defaultTime: '00:00:00',
      dateHintText: context.intl.formatDate(props.hintDate),
      timeHintText: context.intl.formatTime(props.hintDate),
      disabled: false,
      displayTime: true,
    })
  })
  it('should render correctly when disabled', () => {
    const props = {
      onChange: () => {},
      isStopDate: true,
      tooltip: 'tooltip',
      disabled: true,
    }
    const enzymeWrapper = shallow(<TemporalCriteriaComponent {...props} />, { context })
    const datePicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datePicker, 1, 'There should be the date picker')
    testSuiteHelpers.assertWrapperProperties(datePicker, {
      value: props.value,
      onChange: enzymeWrapper.instance().handleChangeDate,
      tooltip: props.tooltip,
      okLabel: 'criterion.date.picker.ok',
      cancelLabel: 'criterion.date.picker.cancel',
      defaultTime: '23:59:59',
      dateHintText: 'criterion.date.field.label',
      timeHintText: 'criterion.time.field.label',
      disabled: true,
      displayTime: true,
    })
  })
})
