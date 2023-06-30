/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers, uiPluginServiceTestHelpers } from '@regardsoss/tests-helpers'
import ExampleChartDisplayer from '../../src/components/ExampleChartDisplayer'
// Note: we import here the 'core component', and not the component connected to redux, as redux store
// is not available in test context
import { ExampleContainer } from '../../src/containers/ExampleContainer'

const context = buildTestContext() // see ExampleChartDisplayer comments

/**
* Test ExampleContainer
* @author Raphaël Mechali
*/
describe('[Service Example] Testing ExampleContainer', () => {
  before(testSuiteHelpers.before) // see ExampleChartDisplayer comments
  after(testSuiteHelpers.after) // see ExampleChartDisplayer comments

  it('should exists', () => { // see ExampleChartDisplayer comments
    assert.isDefined(ExampleContainer)
  })
  // main container test: it should render correctly and start loading when built
  it('should render correctly and start loading data with ONE ELEMENT selection ', () => {
    /*
    We inject here stub data corresponding to API using uiPluginServiceTestHelpers
    it provides the following methods:
    buildConfiguration (staticProps, dynamicProps) ==> create the runtime configuration of the plugin
    buildOneElementTarget: (ipID, elementsType) => create the plugin runtime runtime target for ONE element
    buildManyElementsTarget: (ipIDs, elementsType) => create the plugin runtime runtime target for MANY element
    buildQueryTarget: (query, elementCount, elementsType, excludedIpIDs) => create the plugin runtime runtime target for QUERY
    notes: all parameters in previous methods are optional. The element type comes from enumeration RuntimeTargetTypes,
    that can be imported like:
    import { RuntimeTargetTypes } from '@regardsoss/domain/access'
    */
    const props = {
      pluginInstanceId: 'stub.id',
      // stub runtime configuration
      target: uiPluginServiceTestHelpers.buildOneElementTarget('test-data-entity-ip-id'),
      configuration: uiPluginServiceTestHelpers.buildConfiguration({ staticA: 'ABC', staticB: 2 }, { dynA: 1.5, dynB: new Date() }),
      // user is optional, let's not provide it here
      // We also need to mock the methods provided by map dispatch to props, as we import component disconnected from redux
      getReducePromise: () => new Promise(() => { }),
      fetchSelectionThroughAction: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<ExampleContainer {...props} />, { context })
    // A. In initial state...
    // A.1 − Let's verify the initial component state
    assert.deepEqual(enzymeWrapper.state(), {
      loading: true, // should be true as loading promise did not yet resolve
      errorMessage: null,
      currentIndex: 0,
      totalElements: 1,
      lastLoadedEntity: null, // will be set by the reducer, step by step
      results: null, // will be set after reducing promise returned
    }, 'The component state is wrongly initialized')
    // A.2 - Check that the component did show the "one element" text (see http://chaijs.com/api/assert for all possible assertions)
    // We will look here directly in rendered text
    const asDebugText = enzymeWrapper.debug()
    assert.include(asDebugText, 'one element', 'There should be the one element target message')
    // A.3 - We can also verify if the static and dynamic properties have been displayed
    const expectedProps = ['staticA', 'staticB', 'dynA', 'dynB']
    expectedProps.forEach((propertyName) => {
      assert.include(asDebugText, propertyName, `${propertyName} should be displayed in HTML`)
    })
    // A.4 - Let's also verify that there is no chart displayer since we are currently loading
    assert.lengthOf(enzymeWrapper.find(ExampleChartDisplayer), 0, 'The chart should not be shown while loading')

    // B. After loading data
    // B.0 - Simulate data loading done through reduce promise
    enzymeWrapper.instance().onResultsCounted({ beforeDateCount: 1, afterDateCount: 2, unknown: 3 })
    enzymeWrapper.update()
    // B.1 - Check the state fields after resolution
    assert.isFalse(enzymeWrapper.state('loading'), 'Loading should be false in state after results were counted')
    assert.deepEqual(enzymeWrapper.state('results'), { beforeDateCount: 1, afterDateCount: 2, unknown: 3 }, 'Results should be correctly reported in state')
    // A.4 - Finally, verify that there is chart and it has the right properties
    const chartWrappers = enzymeWrapper.find(ExampleChartDisplayer)
    assert.lengthOf(chartWrappers, 1, 'The chart should be shown after loading')
    // note about enzyme: when find returns only one component, the wrappers list behave exactly the same way
    // than wrappers.at(0), the first found element (we use that trick just below, it is the same that writing chartWrappers.at(0). ...)
    assert.equal(chartWrappers.props().beforeDateCount, 1, 'The before date elements count is invalid in chart')
    assert.equal(chartWrappers.props().afterDateCount, 2, 'The after date elements count is invalid in chart')
    assert.equal(chartWrappers.props().unknown, 3, 'The unknown elements count is invalid in chart')
  })
})
