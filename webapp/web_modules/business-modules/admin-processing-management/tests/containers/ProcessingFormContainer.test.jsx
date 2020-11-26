/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import sinon from 'sinon'
import { assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ProcessingFormComponent from '../../src/components/ProcessingFormComponent'
import { ProcessingFormContainer } from '../../src/containers/ProcessingFormContainer'

const context = buildTestContext()

/**
 * Tests for ProcessingFormContainer
 * @author Théo Lasserre
 */
describe('[ADMIN PROCESSING MANAGEMENT Test Processing form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoadableContentDisplayDecorator)
    assert.isDefined(ProcessingFormContainer)
    assert.isDefined(ProcessingFormComponent)
  })

  it('should render properly', (done) => {
    const promise = Promise.resolve({ error: false })
    const props = {
      params: {
        project: 'testProject',
        businessId: 'testBusinessId',
        mode: 'create',
      },
      // from mapStateToProps
      processing: DumpProvider.getFirstEntity('ProcessingClient', 'Processing'),
      // from mapDispatchToProps
      fetch: sinon.stub().callsFake(() => promise),
      create: () => { },
      update: () => { },
    }

    const wrapper = shallow(
      <ProcessingFormContainer
        {...props}
      />,
      { context },
    )

    // Wait the component calls the promise in its React lifecycle to run the test the content of the rendered Component afterward
    promise.then(() => {
      // Check loading component
      const loading = wrapper.find(LoadableContentDisplayDecorator)
      assert.equal(loading.length, 1, 'There should have a loading component rendered')
      assert.equal(loading.props().isLoading, false, 'Loading should be false')
      // Check child component
      const component = wrapper.find(ProcessingFormComponent)
      assert.equal(component.length, 1, 'There should have a ProcessingFormComponent rendered')
      assert.equal(component.props().processing, props.processing, 'Processing should be correctly passed')

      done()
    })
  })
})
