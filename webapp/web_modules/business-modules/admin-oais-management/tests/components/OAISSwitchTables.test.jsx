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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import FlatButton from 'material-ui/FlatButton'
import { OAISSwitchTables } from '../../src/components/OAISSwitchTables'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test OAISSwitchTables
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing OAISSwitchTables', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OAISSwitchTables)
  })

  it('should render correctly', () => {
    const props = {
      onSwitchToPane: () => {},
      fetchAIPPage: () => {},
      fetchRequestsPage: () => {},
    }
    const enzymeWrapper = shallow(<OAISSwitchTables {...props} />, { context })
    const flatButtonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(flatButtonWrapper, 2, 'There should two FlatButton')
  })
})
