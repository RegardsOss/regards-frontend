/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ModuleTitleText from '../../src/module/ModuleTitleText'
import styles from '../../src/module/styles'

const context = buildTestContext(styles)

/**
 * Test ModuleTitleText
 * @author Raphaël Mechali
 */
describe('[ Module name] Testing ModuleTitleText', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleTitleText)
  })
  it('should render correctly', () => {
    const props = {
      //  TODO properties
    }
    assert.fail('TODO impl')
    const enzymeWrapper = shallow(<ModuleTitleText {...props} />, { context })
    // TODO test
  })

})