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
import MenuItem from 'material-ui/MenuItem'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import StorageLocationStorageErrorRenderer from '../../src/components/StorageLocationStorageErrorRenderer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StorageLocationStorageErrorRenderer
 * @author Kévin Picart
 * @author Sébastien Binda
 */
describe('[ADMIN STORAGE MANAGEMENT] Testing StorageLocationStorageErrorRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageLocationStorageErrorRenderer)
  })
  it('should render correctly without error', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'StorageLocation')
    const props = {
      entity,
      onStorageErrors: () => {},
    }
    const enzymeWrapper = shallow(<StorageLocationStorageErrorRenderer {...props} />, { context })
    const iconButton = enzymeWrapper.find(MenuItem)
    assert.equal(iconButton.length, 0, 'There should have 0 IconButton rendered')
  })
  it('should render correctly with errors', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'StorageLocation')
    entity.content.nbStorageError = 2
    const props = {
      entity,
      onStorageErrors: () => {},
    }
    shallow(<StorageLocationStorageErrorRenderer {...props} />, { context })
  })
})
