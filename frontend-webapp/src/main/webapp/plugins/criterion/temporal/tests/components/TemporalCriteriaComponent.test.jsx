/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DatePickerField } from '@regardsoss/components'
import TemporalCriteriaComponent from '../../src/components/TemporalCriteriaComponent'
import TemporalComparatorComponent from '../../src/components/TemporalComparatorComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link TemporalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TEMPORAL CRITERIA] Testing the temporal criteria component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(TemporalCriteriaComponent)
    assert.isDefined(TemporalComparatorComponent)
    assert.isDefined(DatePickerField)
  })
  it('should render self and subcomponents', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => {},
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: 'temporal',
        },
      },
    }
    const enzymeWrapper = shallow(<TemporalCriteriaComponent {...props} />, { context })
    expect(enzymeWrapper.find(TemporalComparatorComponent)).to.have.length(1)
    expect(enzymeWrapper.find(DatePickerField)).to.have.length(1)
  })
})
