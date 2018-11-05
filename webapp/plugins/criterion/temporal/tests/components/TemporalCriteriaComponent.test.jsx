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
import { DamDomain } from '@regardsoss/domain'
import { DatePickerField, NumericalComparator } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import TemporalCriteriaContainer from '../../src/containers/TemporalCriteriaContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link TemporalCriteriaContainer}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TEMPORAL CRITERIA] Testing TemporalCriteriaContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(TemporalCriteriaContainer)
    assert.isDefined(NumericalComparator)
    assert.isDefined(DatePickerField)
  })
  it('should render self with attribute bounds', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-27T13:15:42.726Z')),
      },
    }
    const enzymeWrapper = shallow(<TemporalCriteriaContainer {...props} />, { context })
    const comparator = enzymeWrapper.find(NumericalComparator)
    assert.isFalse(comparator.props().disabled, 'Comparator should be enabled as there are bounds')
    assert.lengthOf(comparator, 1, 'There should be the comparator')
    const datePicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datePicker, 1, 'There should be the date picker')
    assert.isFalse(datePicker.props().disabled, 'Date picker should be enabled as there are bounds')
    assert.isOk(datePicker.props().tooltip, 'Date picker should have a tooltip (displays bounds)')
  })
  it('should render self without attribute bounds', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
      },
    }
    const enzymeWrapper = shallow(<TemporalCriteriaContainer {...props} />, { context })
    const comparator = enzymeWrapper.find(NumericalComparator)
    assert.isTrue(comparator.props().disabled, 'Comparator should be disabled as there is no bound')
    assert.lengthOf(comparator, 1, 'There should be the comparator')
    const datePicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datePicker, 1, 'There should be the date picker')
    assert.isTrue(datePicker.props().disabled, 'Date picker should be disabled as there is no bound')
    assert.isOk(datePicker.props().tooltip, 'Date picker should have a tooltip')
  })
})
