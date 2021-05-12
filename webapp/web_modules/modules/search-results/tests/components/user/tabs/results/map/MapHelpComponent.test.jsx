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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MapHelpComponent from '../../../../../../src/components/user/tabs/results/map/MapHelpComponent'
import MapDrawHelpComponent from '../../../../../../src/components/user/tabs/results/map/help/MapDrawHelpComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test MapHelpComponent
 * @author Léo Mieulet
 */
describe('[SEARCH RESULTS] Testing MapHelpComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MapHelpComponent)
  })
  it('should render correctly', () => {
    const enzymeWrapper = shallow(<MapHelpComponent />, { context })

    const drawHelp = enzymeWrapper.find(MapDrawHelpComponent)
    assert.equal(drawHelp.length, 1, 'There should be an draw help compo')
  })
})
