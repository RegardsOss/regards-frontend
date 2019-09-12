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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DataProviderDomain } from '@regardsoss/domain'
import { StringValueRender } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AcquisitionProcessingChainMonitorModeRenderer } from '../../../../src/components/monitoring/acquisitionProcessingChain/AcquisitionProcessingChainMonitorModeRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AcquisitionProcessingChainMonitorModeRenderer
 * @author Raphaël Mechali
 */
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing AcquisitionProcessingChainMonitorModeRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AcquisitionProcessingChainMonitorModeRenderer)
  })
  it('should render correctly mode AUTO', () => {
    const props = {
      value: DataProviderDomain.AcquisitionProcessingChainModeEnum.AUTO,
      onToggle: () => {},
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainMonitorModeRenderer {...props} />, { context })
    const render = enzymeWrapper.find(StringValueRender)
    assert.lengthOf(render, 1)
    // assert.equal(render.props().value, 'acquisition-chain.monitor.list.mode.AUTO')
  })
  it('should render correctly mode MANUAL', () => {
    const props = {
      value: DataProviderDomain.AcquisitionProcessingChainModeEnum.MANUAL,
      onToggle: () => {},
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainMonitorModeRenderer {...props} />, { context })
    const render = enzymeWrapper.find(StringValueRender)
    assert.lengthOf(render, 1)
    // assert.equal(render.props().value, 'acquisition-chain.monitor.list.mode.MANUAL')
  })
})
