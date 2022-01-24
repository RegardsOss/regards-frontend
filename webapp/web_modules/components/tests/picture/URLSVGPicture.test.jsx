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
import ReactSVG from 'react-svg'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { URLSVGPicture } from '../../src/picture/URLSVGPicture'
import styles from '../../src/picture/styles'

const context = buildTestContext(styles)

/**
 * Test URLSVGPicture
 * @author Raphaël Mechali
 */
describe('[Components] Testing URLSVGPicture', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(URLSVGPicture)
  })
  it('should render correctly', () => {
    const props = {
      url: 'any',
      color: 'red',
      style: {
        width: 250,
      },
    }
    const enzymeWrapper = shallow(<URLSVGPicture {...props} />, { context })
    const svgRenderWrapper = enzymeWrapper.find(ReactSVG)
    assert.lengthOf(svgRenderWrapper, 1, 'Broken picture icon should be shown')
    assert.equal(svgRenderWrapper.props().svgStyle.width, 250, 'Styles should be correctly merged with user styles')
    assert.equal(svgRenderWrapper.props().svgStyle.fill, props.color, 'SVG props should be correctly reported in style')
    assert.isOk(svgRenderWrapper.props().svgStyle.height, 'Missing styles should be completed from theme')
  })
})
