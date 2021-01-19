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
import { LoadingPicturePlaceholder } from '../../src/picture/LoadingPicturePlaceholder'
import styles from '../../src/picture/styles'

const context = buildTestContext(styles)

/**
 * Test LoadingPicturePlaceholder
 * @author Raphaël Mechali
 */
describe('[Components] Testing LoadingPicturePlaceholder', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoadingPicturePlaceholder)
  })
  it('should render correctly', () => {
    const props = {
      style: {
        width: 250,
      },
    }
    const enzymeWrapper = shallow(<LoadingPicturePlaceholder {...props} />, { context })
    const mainDiv = enzymeWrapper.find('div')
    assert.lengthOf(mainDiv, 1, 'There should be a placeholder div')
    assert.equal(mainDiv.props().style.width, 250, 'Styles should be correctly merged with user styles')
    assert.isOk(mainDiv.props().style.height, 'Missing styles should be completed from theme')
  })
})
