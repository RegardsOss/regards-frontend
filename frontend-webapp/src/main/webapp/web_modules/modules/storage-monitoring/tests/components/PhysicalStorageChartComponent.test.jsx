/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ChartAdapter } from '@regardsoss/adapters'
import PhysicalStorageChartComponent from '../../src/components/PhysicalStorageChartComponent'

import styles from '../../src/styles/styles'
import { convertedParsableDevice, convertedPartiallyParsableDevice, convertedNonParsableDevice } from '../dump/dump'

const context = buildTestContext(styles)

/**
* Test PhysicalStorageChartComponent
* @author Raphaël Mechali
*/
describe('[STORAGE PLUGINS MONITORING] Testing PhysicalStorageChartComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PhysicalStorageChartComponent)
  })
  it('should render all sizes in parsed device', () => {
    const props = {
      physicalStorage: convertedParsableDevice,
    }
    const enzymeWrapper = shallow(<PhysicalStorageChartComponent {...props} />, { context })
    const chartWrapper = enzymeWrapper.find(ChartAdapter)
    assert.lengthOf(chartWrapper, 1, 'There should be the chart')
    const chartData = chartWrapper.props().data
    assert.lengthOf(chartData.labels, 2, 'There should be labels for used and unused sizes in chart')
    assert.equal(chartData.labels[0], 'archival.storage.capacity.monitoring.chart.used.size', 'The first label should indicate used size')
    assert.equal(chartData.labels[1], 'archival.storage.capacity.monitoring.chart.unused.size', 'The second label sholud indicate unused size')
    assert.lengthOf(chartData.datasets[0].data, 2, 'There should be dataset data for used and unused sizes in chart')
  })
  it('should render total size only in partially parsed device', () => {
    const props = {
      physicalStorage: convertedPartiallyParsableDevice,
    }
    const enzymeWrapper = shallow(<PhysicalStorageChartComponent {...props} />, { context })
    const chartWrapper = enzymeWrapper.find(ChartAdapter)
    assert.lengthOf(chartWrapper, 1, 'There should be the chart')

    const chartData = chartWrapper.props().data
    assert.lengthOf(chartData.labels, 1, 'There should one label for total size in chart')
    assert.equal(chartData.labels[0], 'archival.storage.capacity.monitoring.chart.total.size', 'The first label should indicate used size')
    assert.lengthOf(chartData.datasets[0].data, 1, 'There should be one dataset data for total size in chart')
  })
  it('should render unknown size in non parsed device', () => {
    const props = {
      physicalStorage: convertedNonParsableDevice,
    }
    const enzymeWrapper = shallow(<PhysicalStorageChartComponent {...props} />, { context })
    const chartWrapper = enzymeWrapper.find(ChartAdapter)
    assert.lengthOf(chartWrapper, 1, 'There should be the chart')

    const chartData = chartWrapper.props().data
    assert.lengthOf(chartData.labels, 1, 'There should one label for unknown information')
    assert.equal(chartData.labels[0], 'archival.storage.capacity.monitoring.chart.unknown.size', 'The first label should indicate unknwon size')
    assert.lengthOf(chartData.datasets[0].data, 1, 'There should be one dataset data for unknown information')
  })
  it('should render correctly without device', () => {
    const props = {
      physicalStorage: null,
    }
    const enzymeWrapper = shallow(<PhysicalStorageChartComponent {...props} />, { context })
    const chartWrapper = enzymeWrapper.find(ChartAdapter)
    assert.lengthOf(chartWrapper, 1, 'There should be the chart')

    const chartData = chartWrapper.props().data
    assert.lengthOf(chartData.labels, 1, 'There should one label for unknown information')
    assert.equal(chartData.labels[0], 'archival.storage.capacity.monitoring.chart.unknown.size', 'The first label should indicate unknwon size')
    assert.lengthOf(chartData.datasets[0].data, 1, 'There should be one dataset data for unknown information')
  })
})
