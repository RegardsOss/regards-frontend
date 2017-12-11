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
import TextField from 'material-ui/TextField'
import NumericalCriteriaComponent from '../../src/components/NumericalCriteriaComponent'
import NumericalComparatorComponent from '../../src/components/NumericalComparatorComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link NumericalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN NUMERICAL CRITERIA] Testing the numerical criteria component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(NumericalCriteriaComponent)
    assert.isDefined(NumericalComparatorComponent)
    assert.isDefined(TextField)
  })
  it('should render self and subcomponents', () => {
    const props = {
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: 'numerical',
        },
      },
    }
    const enzymeWrapper = shallow(<NumericalCriteriaComponent {...props} />, { context })
    expect(enzymeWrapper.find(NumericalComparatorComponent)).to.have.length(1)
    expect(enzymeWrapper.find(TextField)).to.have.length(1)
  })
})
