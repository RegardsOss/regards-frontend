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
import BrokenPictureIcon from 'mdi-material-ui/ImageBroken'
import { BrokenPicturePlaceholder } from '../../src/picture/BrokenPicturePlaceholder'
import styles from '../../src/picture/styles'

const context = buildTestContext(styles)

/**
 * Test BrokenPicturePlaceholder
 * @author Raphaël Mechali
 */
describe('[Components] Testing BrokenPicturePlaceholder', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BrokenPicturePlaceholder)
  })
  it('should render correctly', () => {
    const props = {
      color: 'red',
      style: {
        width: 250,
      },
    }
    const enzymeWrapper = shallow(<BrokenPicturePlaceholder {...props} />, { context })
    const iconWrapper = enzymeWrapper.find(BrokenPictureIcon)
    assert.lengthOf(iconWrapper, 1, 'Broken picture icon should be shown')
    assert.equal(iconWrapper.props().style.width, 250, 'Styles should be correctly merged with user styles')
    assert.equal(iconWrapper.props().style.fill, props.color, 'SVG props should be correctly reported in style')
    assert.isOk(iconWrapper.props().style.height, 'Missing styles should be completed from theme')
  })
})
