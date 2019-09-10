/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import isFunction from 'lodash/isFunction'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AcquisitionProcessingChainMonitorListComponent from '../../../src/components/monitoring/acquisitionProcessingChain/AcquisitionProcessingChainMonitorListComponent'
import { AcquisitionProcessingChainMonitorListContainer } from '../../../src/containers/monitoring/AcquisitionProcessingChainMonitorListContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  AcquisitionProcessingChainMonitorListContainer
* @author Sébastien Binda
*/
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing  AcquisitionProcessingChainMonitorListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AcquisitionProcessingChainMonitorListContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'test-project',
      },
      entitiesLoading: false,
      fetchPage: sinon.spy(),
      runChain: sinon.spy(),
      stopChain: sinon.spy(),
      multiToggleChain: () => {},
      deleteChain: () => {},
      toggleChain: () => {},
      isOneCheckboxToggled: true,

    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainMonitorListContainer {...props} />, { context })
    const components = enzymeWrapper.find(AcquisitionProcessingChainMonitorListComponent)
    assert.equal(components.length, 1, 'The AcquisitionProcessingChainMonitorListComponent should be rendered')
    const component = components.at(0)
    assert.isFalse(props.fetchPage.called, 'At render, the fetchPage should not be called')
    assert.isFalse(props.runChain.called, 'At render, the runChain should not be called')
    assert.isFalse(props.stopChain.called, 'At render, the stopChain should not be called')
    assert.equal(component.props().project, props.params.project, 'Invalid project param')
    assert.isTrue(isFunction(component.props().onRefresh), 'Invalid onRefresh param')
    assert.isTrue(isFunction(component.props().onBack), 'Invalid onRefresh param')
    assert.equal(component.props().onRunChain, props.runChain, 'Invalid onRunChain param')
    assert.equal(component.props().onStopChain, props.stopChain, 'Invalid onStopChain param')
    assert.equal(component.props().pageSize, AcquisitionProcessingChainMonitorListContainer.PAGE_SIZE, 'Invalid pageSize param')
    assert.equal(component.props().resultsCount, 0, 'Invalid resultsCount param')
    assert.equal(component.props().entitiesLoading, false, 'Invalid entitiesLoading param')
  })
})
