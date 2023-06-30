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
import sinon from 'sinon'
import { assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ProcessingMonitoringContainer } from '../../src/containers/ProcessingMonitoringContainer'
import ProcessingMonitoringComponent from '../../src/components/ProcessingMonitoringComponent'

const context = buildTestContext()

/**
 * Tests for ProcessingMonitoringContainer
 * @authro Théo Lasserre
 */
describe('[ADMIN PROCESSING MANAGEMENT] Test ProcessingMonitoring container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoadableContentDisplayDecorator)
    assert.isDefined(ProcessingMonitoringContainer)
    assert.isDefined(ProcessingMonitoringComponent)
  })

  it('should render properly', () => {
    const promise = Promise.resolve({ error: false })
    const props = {
      params: {
        project: 'testProject',
      },
      // from mapStateToProps
      processingList: DumpProvider.get('ProcessingMonitoringClient', 'ProcessingMonitoring'),
      // from mapDispatchToProps
      fetchProcessingMonitorList: () => { },
      fetchProcessingList: sinon.stub().callsFake(() => promise),
      entitiesLoading: false,
    }

    const enzymeWrapper = shallow(
      <ProcessingMonitoringContainer
        {...props}
      />,
      { context },
    )

    assert.lengthOf(enzymeWrapper.find(LoadableContentDisplayDecorator), 1, 'LoadableContentDisplayDecoratorshould be set')
    const component = enzymeWrapper.find(ProcessingMonitoringComponent)
    assert.lengthOf(component, 1, 'There should be 1 ProcessingMonitoringComponent')
    testSuiteHelpers.assertWrapperProperties(component, {
      project: 'testProject',
      onRefresh: enzymeWrapper.instance().onRefresh,
      onBack: enzymeWrapper.instance().onBack,
      processingList: props.processingList,
      resultsCount: 0,
      entitiesLoading: true,
      isLoading: true,
    }, 'Component should define the expected properties and callbacks')
  })
})
