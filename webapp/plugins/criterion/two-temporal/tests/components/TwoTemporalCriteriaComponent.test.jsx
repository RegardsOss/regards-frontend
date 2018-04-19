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
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TwoTemporalCriteriaComponent from '../../src/components/TwoTemporalCriteriaComponent'
import TwoTemporalCriteriaSimpleComponent from '../../src/components/TwoTemporalCriteriaSimpleComponent'
import TwoTemporalCriteriaComposedComponent from '../../src/components/TwoTemporalCriteriaComposedComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link TwoTemporalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO TEMPORAL CRITERIA] Testing the two temporal criteria component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(TwoTemporalCriteriaComponent)
  })
  it('should render the simple component when two different attributes', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => {},
      attributes: {
        firstField: {
          name: 'firstAttribute',
          description: 'First attribute to search',
          type: 'numerical',
        },
        secondField: {
          name: 'secondAttribute',
          description: 'Second attribute to search',
          type: 'temporal',
        },
      },
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaComponent {...props} />, { context })
    expect(enzymeWrapper.find(TwoTemporalCriteriaSimpleComponent)).to.have.length(1)
    expect(enzymeWrapper.find(TwoTemporalCriteriaComposedComponent)).to.have.length(0)
  })
  it('should render the composed component when just a single attribute', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      attributes: {
        firstAttribute: {
          name: 'attribute',
          description: 'First attribute to search',
          type: 'temporal',
        },
      },
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaComponent {...props} />, { context })
    expect(enzymeWrapper.find(TwoTemporalCriteriaSimpleComponent)).to.have.length(0)
    expect(enzymeWrapper.find(TwoTemporalCriteriaComposedComponent)).to.have.length(1)
  })
})