/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { SingleAttributeContainer } from '../../src/containers/SingleAttributeContainer'
import NumericalCriterionComponent from '../../src/components/NumericalCriterionComponent'
import SingleAttributeComponent from '../../src/components/SingleAttributeComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link SingleAttributeContainer}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[Two numerical criteria] Testing SingleAttributeContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(SingleAttributeContainer)
    assert.isDefined(NumericalCriterionComponent)
  })
  it('should render self and subcomponents and publish state on updates', () => {
    const spiedPublishStateData = {
      state: null,
      requestParameters: null,
    }
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchField: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -100.5, 99.5)),
        name: 'attr1',
        jsonPath: 'x.a1',
      },
      state: SingleAttributeContainer.DEFAULT_STATE,
      publishState: (state, requestParameters) => {
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<SingleAttributeContainer {...props} />, { context })
    let component = enzymeWrapper.find(SingleAttributeComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      label: props.label,
      searchAttribute: props.searchField,
      error: props.state.error,
      min: props.state.min,
      max: props.state.max,
      onMinChanged: enzymeWrapper.instance().onMinChanged,
      onMaxChanged: enzymeWrapper.instance().onMaxChanged,
    }, 'Component properties should be correctly reported')
    // update state and check that
    // - query is updated / ignored when in error
    // - component receives updated mutable values
    const testUpdates = [{
      label: 'Set max value',
      updateMethod: () => enzymeWrapper.instance().onMaxChanged('55.5'),
      expectedQuery: { q: 'x.a1:[* TO 55.5]' },
      expectedState: { error: false, min: '', max: '55.5' },
    }, {
      label: 'Set min value',
      updateMethod: () => enzymeWrapper.instance().onMinChanged('-1.56'),
      expectedQuery: { q: 'x.a1:[\\-1.56 TO 55.5]' },
      expectedState: { error: false, min: '-1.56', max: '55.5' },
    }, {
      label: 'Set max value (error: empty range)',
      updateMethod: () => enzymeWrapper.instance().onMaxChanged('-2'),
      expectedQuery: { },
      expectedState: { error: true, min: '-1.56', max: '-2' },
    }, {
      label: 'Set min value (OK)',
      updateMethod: () => enzymeWrapper.instance().onMinChanged('-150'),
      expectedQuery: { q: 'x.a1:[\\-150 TO \\-2]' },
      expectedState: { error: false, min: '-150', max: '-2' },
    }, {
      label: 'Set max value (error: range lesser than min bound)',
      updateMethod: () => enzymeWrapper.instance().onMaxChanged('-101'),
      expectedQuery: { },
      expectedState: { error: true, min: '-150', max: '-101' },
    }, {
      label: 'Set max value (OK: overlapping)',
      updateMethod: () => enzymeWrapper.instance().onMaxChanged('150.5'),
      expectedQuery: { q: 'x.a1:[\\-150 TO 150.5]' },
      expectedState: { error: false, min: '-150', max: '150.5' },
    }, {
      label: 'Set min value (error: range greater than max bound)',
      updateMethod: () => enzymeWrapper.instance().onMinChanged('101.25645678'),
      expectedQuery: { },
      expectedState: { error: true, min: '101.25645678', max: '150.5' },
    }, {
      label: 'Set min value (OK: overlapping)',
      updateMethod: () => enzymeWrapper.instance().onMinChanged('2'),
      expectedQuery: { q: 'x.a1:[2 TO 150.5]' },
      expectedState: { error: false, min: '2', max: '150.5' },
    }, {
      label: 'Unset max value',
      updateMethod: () => enzymeWrapper.instance().onMaxChanged(''),
      expectedQuery: { q: 'x.a1:[2 TO *]' },
      expectedState: { error: false, min: '2', max: '' },
    }, {
      label: 'Unset min value',
      updateMethod: () => enzymeWrapper.instance().onMinChanged(''),
      expectedQuery: { },
      expectedState: { error: false, min: '', max: '' },
    }]
    testUpdates.forEach(({
      label, updateMethod, expectedQuery, expectedState,
    }, caseIndex) => {
      updateMethod()
      // check published state
      assert.deepEqual(spiedPublishStateData.state, expectedState, `#${caseIndex} ${label} - state should be correctly updated`)
      // check published query
      assert.deepEqual(spiedPublishStateData.requestParameters, expectedQuery,
        `#${caseIndex} ${label} - query should be correctly computed`)
      // mute state through props and check it is correctly reported
      enzymeWrapper.setProps({ ...props, state: spiedPublishStateData.state })
      component = enzymeWrapper.find(SingleAttributeComponent)
      testSuiteHelpers.assertWrapperProperties(component, expectedState,
        `#${caseIndex} ${label} - mutable properties should be correctly reported`)
    })
  })
})
