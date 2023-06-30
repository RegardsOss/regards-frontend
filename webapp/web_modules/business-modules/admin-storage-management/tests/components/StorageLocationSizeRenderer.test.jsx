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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import StorageLocationSizeRenderer from '../../src/components/StorageLocationSizeRenderer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StorageLocationSizeRenderer
 * @author Kévin Picart
 */
describe('[ADMIN STORAGE MANAGEMENT] Testing StorageLocationSizeRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageLocationSizeRenderer)
  })
  it('should render correctly', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'StorageLocation')

    const props = {
      entity,
    }
    shallow(<StorageLocationSizeRenderer {...props} />, { context })
  })
})
