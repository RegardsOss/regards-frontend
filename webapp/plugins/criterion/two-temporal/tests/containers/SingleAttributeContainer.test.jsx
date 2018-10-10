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
import SingleAttributeContainer from '../../src/containers/SingleAttributeContainer'
import TemporalCriteriaComponent from '../../src/components/TemporalCriteriaComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link SingleAttributeContainer}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO TEMPORAL CRITERIA] Testing SingleAttributeContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(SingleAttributeContainer)
  })
  it('should render correctly with bounds', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        firstField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-27T13:15:42.726Z')),
      },
    }
    const enzymeWrapper = shallow(<SingleAttributeContainer {...props} />, { context })
    const dateFields = enzymeWrapper.find(TemporalCriteriaComponent)
    assert.lengthOf(dateFields, 2, 'There should be 2 date fields')

    const firstField = dateFields.at(0)
    assert.equal(firstField.props().onChange, enzymeWrapper.instance().changeValue1, 'First field onChange callback should be correctly set')
    assert.isFalse(firstField.props().disabled, 'First field should be enabled')
    assert.equal(firstField.props().hintDate, '2017-09-27T13:15:42.726Z', 'First field hint date should be lower bound of first attribute')
    assert.isOk(firstField.props().tooltip, 'Tooltip should be set')

    const secondField = dateFields.at(1)
    assert.equal(secondField.props().onChange, enzymeWrapper.instance().changeValue2, 'Second field onChange callback should be correctly set')
    assert.isFalse(secondField.props().disabled, 'Second field should be enabled')
    assert.equal(secondField.props().hintDate, '2018-09-27T13:15:42.726Z', 'Second field hint date should be upper bound of first attribute')
    assert.isOk(secondField.props().tooltip, 'Tooltip should be set')
  })
  it('should render correctly without bound', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        firstField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
      },
    }
    const enzymeWrapper = shallow(<SingleAttributeContainer {...props} />, { context })
    const dateFields = enzymeWrapper.find(TemporalCriteriaComponent)
    assert.lengthOf(dateFields, 2, 'There should be 2 date fields')

    const firstField = dateFields.at(0)
    assert.equal(firstField.props().onChange, enzymeWrapper.instance().changeValue1, 'First field onChange callback should be correctly set')
    assert.isTrue(firstField.props().disabled, 'First field should be enabled')
    assert.isNotOk(firstField.props().hintDate, 'First field hint date should not be set')
    assert.isOk(firstField.props().tooltip, 'Tooltip should be set')

    const secondField = dateFields.at(1)
    assert.equal(secondField.props().onChange, enzymeWrapper.instance().changeValue2, 'Second field onChange callback should be correctly set')
    assert.isTrue(secondField.props().disabled, 'Second field should be enabled')
    assert.isNotOk(secondField.props().hintDate, 'Second field hint date should not be set')
    assert.isOk(secondField.props().tooltip, 'Tooltip should be set')
  })
})
