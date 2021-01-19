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
import { ShowableAtRender } from '@regardsoss/components'
import ContactComponent from '../../../src/components/user/ContactComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ContactComponent
* @author Raphaël Mechali
*/
describe('[Menu] Testing ContactComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ContactComponent)
  })
  it('should render correctly without contact', () => {
    const props = {}
    const enzymeWrapper = shallow(<ContactComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1, 'There should be a showable')
    assert.isFalse(showable.props().show, 'It should be hidden')
  })
  it('should render correctly with contacts', () => {
    const props = {
      contacts: 'gégé.bg@pmu.fr',
    }
    const enzymeWrapper = shallow(<ContactComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1, 'There should be a showable')
    assert.isTrue(showable.props().show, 'It should be shown')
  })
})
