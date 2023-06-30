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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { URLCommonPicture } from '../../src/picture/URLCommonPicture'
import styles from '../../src/picture/styles'

const context = buildTestContext(styles)

/**
 * Test URLCommonPicture
 * @author Raphaël Mechali
 */
describe('[Components] Testing URLCommonPicture', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(URLCommonPicture)
  })
  it('should render correctly', () => {
    const props = {
      url: 'any.png',
      style: {
        width: 250,
      },
    }
    const enzymeWrapper = shallow(<URLCommonPicture {...props} />, { context })
    const imgWrapper = enzymeWrapper.find('img')
    assert.lengthOf(imgWrapper, 1, 'There should be the image element')
    assert.equal(imgWrapper.props().style.width, 250, 'Styles should be correctly merged with user styles')
  })
})
