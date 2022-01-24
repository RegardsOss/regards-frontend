/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import BrowsingTreeComponent from '../../../../src/components/admin/tree/BrowsingTreeComponent'
import { AdminContainer } from '../../../../src/containers/AdminContainer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test BrowsingTreeComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing BrowsingTreeComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BrowsingTreeComponent)
  })

  // Render the 2 cases for tests: data only, data and dataset
  const testCases = [{
    label: 'data',
    viewsGroups: [{
      type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      enabled: true,
    }, {
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      enabled: false,
    }],
  }, {
    label: 'data and datasets',
    viewsGroups: [{
      type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      enabled: true,
    }, {
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      enabled: true,
    }],
  }]
  testCases.forEach(({ label, viewsGroups }) => it(`should render correctly for ${label}`, () => {
    const props = {
      // we use here AdminContainer converter, which is tested in its own file
      navigationSections: AdminContainer.buildNavigationTree(viewsGroups).navigationSections,
      onBrowseToPage: () => {},
    }
    shallow(<BrowsingTreeComponent {...props} />, { context })
    // Note cannot test further here... (should dive in TreeTable)
  }))
})
