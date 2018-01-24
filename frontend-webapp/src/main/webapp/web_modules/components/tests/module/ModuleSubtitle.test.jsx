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
import ModuleSubtitle from '../../src/module/ModuleSubtitle'
import styles from '../../src/module/styles/styles'

const context = buildTestContext(styles)

/**
 * Test ModuleSubtitle
 * @author Raphaël Mechali
 */
describe('[Components] Testing ModuleSubtitle', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleSubtitle)
  })
  it('should render correctly with insets', () => {
    const props = {
      text: 'test1',
      iconInsets: true,
    }
    shallow(<ModuleSubtitle {...props} />, { context })
  })
  it('should render correctly without insets', () => {
    const props = {
      text: 'test2',
      iconInsets: false,
    }
    shallow(<ModuleSubtitle {...props} />, { context })
  })
})
