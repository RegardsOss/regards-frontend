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
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import TwoNumericalCriteriaComponent from '../../src/components/TwoNumericalCriteriaComponent'
import MultipleAttributesContainer from '../../src/containers/MultipleAttributesContainer'
import SingleAttributeContainer from '../../src/containers/SingleAttributeContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link TwoNumericalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA] Testing TwoNumericalCriteriaComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(TwoNumericalCriteriaComponent)
  })
  it('should render a multiple attributes container when working with multiple attributes', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        // 2 attributes with different name and path (different attributes)
        firstField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
          name: 'Attr1',
          jsonPath: 'x.attr1',
        },
        secondField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
          name: 'Attr2',
          jsonPath: 'x.attr2',
        },
      },
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(MultipleAttributesContainer), 1)
    assert.lengthOf(enzymeWrapper.find(SingleAttributeContainer), 0)
  })
  it('should render a single attribute container when working with single attribute', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      attributes: {
        // 2 attributes with same name and path (same attribute)
        firstField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
        secondField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
      },
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(MultipleAttributesContainer), 0)
    assert.lengthOf(enzymeWrapper.find(SingleAttributeContainer), 1)
  })
})
