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
import { buildTestContext, DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AccessRightsTableDeleteAction from '../../src/components/AccessRightsTableDeleteAction'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test AccessRightsTableDeleteAction
* @author Raphaël Mechali
*/
describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing AccessRightsTableDeleteAction', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessRightsTableDeleteAction)
  })
  it('should render correctly', () => {
    const dataset = DumpProvider.getFirstEntity('DataManagementClient', 'Dataset')
    const accessRight = DumpProvider.getFirstEntity('DataManagementClient', 'DatasetWithAccessRight')

    // Create an accessRight
    accessRight.content.dataset.id = dataset.content.id

    const props = {
      onDelete: () => { },
      entity: {
        content: {
          datasetIpId: dataset.content.feature.id,
          dataset: dataset.content,
          accessRight: accessRight.content,
        },
      },
    }
    shallow(<AccessRightsTableDeleteAction {...props} />, { context })
  })
})
