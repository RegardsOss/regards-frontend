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
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import StoragesPluginStorageErrorRenderer from '../../src/components/StoragesPluginStorageErrorRenderer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StoragesPluginStorageErrorRenderer
 * @author Kévin Picart
 */
describe('[ADMIN STORAGE MANAGEMENT] Testing StoragesPluginStorageErrorRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StoragesPluginStorageErrorRenderer)
  })
  it('should render correctly without error', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'PrioritizedDataStorage')
    const props = {
      entity,
      onStorageErrors: () => {},
    }
    const enzymeWrapper = shallow(<StoragesPluginStorageErrorRenderer {...props} />, { context })
    const iconButton = enzymeWrapper.find(IconButton)
    assert.equal(iconButton.length, 0, 'There should have 0 IconButton rendered')
  })
  it('should render correctly with errors', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'PrioritizedDataStorage')
    entity.content.nbStorageError = 2
    const props = {
      entity,
      onStorageErrors: () => {},
    }
    const enzymeWrapper = shallow(<StoragesPluginStorageErrorRenderer {...props} />, { context })
    const iconButton = enzymeWrapper.find(IconButton)
    assert.equal(iconButton.length, 2, 'There should have two IconButton rendered')
  })
})
