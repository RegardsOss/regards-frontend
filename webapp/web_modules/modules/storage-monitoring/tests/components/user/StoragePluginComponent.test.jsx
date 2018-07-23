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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import StoragePluginComponent from '../../../src/components/user/StoragePluginComponent'
import StoragePluginChartComponent from '../../../src/components/user/StoragePluginChartComponent'
import StoragePluginLegendComponent from '../../../src/components/user/StoragePluginLegendComponent'

import styles from '../../../src/styles/styles'
import { convertedParsablePlugin, convertedNonParsablePlugin } from '../../dump/dump'

const context = buildTestContext(styles)

describe('[Storage Monitoring] Testing StoragePluginComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StoragePluginComponent)
  })

  const testData = [
    { type: 'parsable', storagePlugin: convertedParsablePlugin, userApp: true },
    { type: 'non parsable', storagePlugin: convertedNonParsablePlugin, userApp: true },
    { type: 'parsable', storagePlugin: convertedParsablePlugin, userApp: false }]

  testData.forEach(({ type, storagePlugin, userApp }) => {
    it(`Should render properly a ${type} plugin in ${userApp ? 'user' : 'admin'} app`, () => {
      const props = { storagePlugin, userApp }
      const enzymeWrapper = shallow(<StoragePluginComponent {...props} />, { context })
      // check the chart
      const chartWrapper = enzymeWrapper.find(StoragePluginChartComponent)
      assert.lengthOf(chartWrapper, 1, 'There should be the chart wrapper')
      testSuiteHelpers.assertWrapperProperties(chartWrapper, {
        storagePlugin: props.storagePlugin,
      }, 'The right selected storage plugin should be provided to chart')
      // check the legend
      const legendWrapper = enzymeWrapper.find(StoragePluginLegendComponent)
      assert.lengthOf(legendWrapper, 1, 'There should be the legend wrapper')
      testSuiteHelpers.assertWrapperProperties(legendWrapper, {
        storagePlugin: props.storagePlugin,
      }, 'The right selected storage plugin should be provided to chart')
    })
  })
})
