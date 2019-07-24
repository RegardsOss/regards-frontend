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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import Subheader from 'material-ui/Subheader'
import { StoragePluginLegendComponent } from '../../../src/components/user/StoragePluginLegendComponent'
import styles from '../../../src/styles/styles'
import { convertedParsablePlugin, convertedPartiallyParsablePlugin, convertedNonParsablePlugin } from '../../dump/dump'

const context = buildTestContext(styles)

/**
 * Test StoragePluginLegendComponent
 * @author Raphaël Mechali
 */
describe('[Storage Monitoring] Testing StoragePluginLegendComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StoragePluginLegendComponent)
  })
  it('should render two legend items and total size for parsable plugin', () => {
    const props = {
      storagePlugin: convertedParsablePlugin,
    }
    const enzymeWrapper = shallow(<StoragePluginLegendComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(Subheader), 3, 'There should be used size, unused size and total items')
  })
  it('should render one legend item and total for partially parsable plugin', () => {
    const props = {
      storagePlugin: convertedPartiallyParsablePlugin,
    }
    const enzymeWrapper = shallow(<StoragePluginLegendComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(Subheader), 1, 'There should be total item only')
  })
  it('should render total size only for non parsable plugin', () => {
    const props = {
      storagePlugin: convertedNonParsablePlugin,
    }
    const enzymeWrapper = shallow(<StoragePluginLegendComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(Subheader), 1, 'There should be total item only')
  })
})
