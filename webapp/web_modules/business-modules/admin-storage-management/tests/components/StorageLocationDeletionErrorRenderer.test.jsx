/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import StorageLocationDeletionErrorRenderer from '../../src/components/StorageLocationDeletionErrorRenderer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StorageLocationDeletionErrorRenderer
 * @author Kévin Picart
 */
describe('[ADMIN STORAGE MANAGEMENT] Testing StorageLocationDeletionErrorRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageLocationDeletionErrorRenderer)
  })
  it('should render correctly without error', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'StorageLocation')
    const props = {
      entity,
      onDeletionErrors: () => {},
    }
    const enzymeWrapper = shallow(<StorageLocationDeletionErrorRenderer {...props} />, { context })
    const iconButton = enzymeWrapper.find(MenuItem)
    assert.equal(iconButton.length, 0, 'There should have 0 MenuItem rendered')
  })
  it('should render correctly with errors', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'StorageLocation')
    entity.content.nbDeletionError = 2
    const props = {
      entity,
      onDeletionErrors: () => {},
    }
    const enzymeWrapper = shallow(<StorageLocationDeletionErrorRenderer {...props} />, { context })
    const iconButton = enzymeWrapper.find(MenuItem)
    assert.equal(iconButton.length, 3, 'There should have 3 MenuItem rendered')
  })
})
