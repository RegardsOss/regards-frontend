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
import TwoTemporalCriteriaComponent from '../../src/components/TwoTemporalCriteriaComponent'
import MultipleAttributesContainer from '../../src/containers/MultipleAttributesContainer'
import SingleAttributeContainer from '../../src/containers/SingleAttributeContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)


/**
 * Test case for {@link TwoTemporalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO TEMPORAL CRITERIA] Testing TwoTemporalCriteriaComponent', () => {
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
      registerClear: () => { },
      attributes: {
        firstField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
          name: 'firstAttribute',
          jsonPath: 'x.attr1',
        },
        secondField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
          name: 'secondAttribute',
          jsonPath: 'x.attr2',
        },
      },
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(MultipleAttributesContainer), 1)
    assert.lengthOf(enzymeWrapper.find(SingleAttributeContainer), 0)
  })
  it('should render the composed component when just a single attribute', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      attributes: {
        firstAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
        secondAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
      },
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(MultipleAttributesContainer), 0)
    assert.lengthOf(enzymeWrapper.find(SingleAttributeContainer), 1)
  })
})
