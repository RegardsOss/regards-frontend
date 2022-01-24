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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import MeasureResultProvider from '../../src/measurement/MeasureResultProvider'

/**
 * Test MeasureResultProvider
 * @author Raphaël Mechali
 */
describe('[DISPLAY CONTROL] Testing MeasureResultProvider', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MeasureResultProvider)
  })
  it('should render correctly and provide measure result to children', () => {
    const spiedToMeasureResult = {
      width: 0,
      height: 0,
    }
    const props = {
      style: {
        width: '100%',
        height: '100%',
      },
      targetPropertyName: 'myProperty',
      toMeasureResult: (width, height) => {
        spiedToMeasureResult.width = width
        spiedToMeasureResult.height = height
        return {
          customWidth: width,
          depth: height - 10,
        }
      },
    }
    // 1 - Test initialization
    const enzymeWrapper = shallow(
      <MeasureResultProvider {...props}>
        <div />
      </MeasureResultProvider>, { context })
    assert.equal(enzymeWrapper.state().width, 0)
    assert.equal(enzymeWrapper.state().height, 0)
    assert.deepEqual(spiedToMeasureResult, { width: 0, height: 0 }, 'Initial width and height should be provided to compute measure result')
    // 2 - Test after a size update
    enzymeWrapper.instance().onSizeChanged({ measureDiv: { width: 500, height: 400 } })
    assert.equal(enzymeWrapper.state().width, 500)
    assert.equal(enzymeWrapper.state().height, 400)
  })
})
