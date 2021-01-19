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
import { TableColumnsVisibilityOption } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SessionsMonitoringChooseColumnsComponent } from '../../../../src/components/session/filters/SessionsMonitoringChooseColumnsComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringChooseColumnsComponent
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringChooseColumnsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringChooseColumnsComponent)
  })
  it('should render correctly', () => {
    const props = {
      onChangeColumnsVisibility: () => {},
      columns: [{
        key: 'mavhcin',
        label: 'string',
        visible: true,
      }],
    }
    const enzymeWrapper = shallow(<SessionsMonitoringChooseColumnsComponent {...props} />, { context })
    const tableColumnsVisibilityOption = enzymeWrapper.find(TableColumnsVisibilityOption)
    assert.lengthOf(tableColumnsVisibilityOption, 1, 'There should be 1 TableColumnsVisibilityOption')
  })
})
