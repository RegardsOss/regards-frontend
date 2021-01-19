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
import { buildTestContext, DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AccessRightsTableEditAction from '../../src/components/AccessRightsTableEditAction'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test AccessRightsTableEditAction
* @author Raphaël Mechali
*/
describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing AccessRightsTableEditAction', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessRightsTableEditAction)
  })
  it('should render correctly', () => {
    const dataset = DumpProvider.getFirstEntity('DataManagementClient', 'Dataset')
    const accessRight = DumpProvider.getFirstEntity('DataManagementClient', 'DatasetWithAccessRight')

    const props = {
      onEdit: () => { },
      entity: {
        content: {
          datasetIpId: dataset.content.feature.id,
          dataset: dataset.content,
          accessRight: accessRight.content,
        },
      },
    }
    shallow(<AccessRightsTableEditAction {...props} />, { context })
  })
})
