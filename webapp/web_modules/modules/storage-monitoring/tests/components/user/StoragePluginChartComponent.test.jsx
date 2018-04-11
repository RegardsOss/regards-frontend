/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import StoragePluginChartComponent from '../../../src/components/user/StoragePluginChartComponent'
import styles from '../../../src/styles/styles'
import { convertedParsablePlugin, convertedPartiallyParsablePlugin, convertedNonParsablePlugin } from '../../dump/dump'

const context = buildTestContext(styles)

/**
* Test StoragePluginChartComponent
* @author Raphaël Mechali
*/
describe('[Storage Monitoring] Testing StoragePluginChartComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StoragePluginChartComponent)
  })
  it('should render all sizes in parsed plugin', () => {
    const props = {
      storagePlugin: convertedParsablePlugin,
    }
    const enzymeWrapper = shallow(<StoragePluginChartComponent {...props} />, { context })
    const chartWrapper = enzymeWrapper.find(ChartAdapter)
    assert.lengthOf(chartWrapper, 1, 'There should be the chart')
    const chartData = chartWrapper.props().data
    assert.lengthOf(chartData.datasets[0].data, 2, 'There should be dataset data for used and unused sizes in chart')
  })
  it('should render total size only in partially parsed plugin', () => {
    const props = {
      storagePlugin: convertedPartiallyParsablePlugin,
    }
    const enzymeWrapper = shallow(<StoragePluginChartComponent {...props} />, { context })
    const chartWrapper = enzymeWrapper.find(ChartAdapter)
    assert.lengthOf(chartWrapper, 1, 'There should be the chart')

    const chartData = chartWrapper.props().data
    assert.lengthOf(chartData.datasets[0].data, 1, 'There should be one dataset data for total size in chart')
  })
  it('should render unknown size in non parsed plugin', () => {
    const props = {
      storagePlugin: convertedNonParsablePlugin,
    }
    const enzymeWrapper = shallow(<StoragePluginChartComponent {...props} />, { context })
    const chartWrapper = enzymeWrapper.find(ChartAdapter)
    assert.lengthOf(chartWrapper, 1, 'There should be the chart')

    const chartData = chartWrapper.props().data
    assert.lengthOf(chartData.datasets[0].data, 1, 'There should be one dataset data for unknown information')
  })
})
