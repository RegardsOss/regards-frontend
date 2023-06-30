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
import IconButton from 'material-ui/IconButton'
import PauseIcon from 'mdi-material-ui/Pause'
import ResumeIcon from 'mdi-material-ui/Play'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import PauseResumeOrderComponent from '../../../../src/components/orders/options/PauseResumeOrderComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test PauseResumeOrderComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing PauseResumeOrderComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PauseResumeOrderComponent)
  })
  it('should render correctly when not available', () => {
    const props = {
      canUpdate: false,
      isPaused: false,
      onPause: () => { },
      onResume: () => { },
    }
    const enzymeWrapper = shallow(<PauseResumeOrderComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.isTrue(buttonWrapper.props().disabled, 'Button should be disabled')
    assert.isDefined(buttonWrapper.props().title, 'There should be a tooltip')
  })
  it('should render correctly for resume action', () => {
    const props = {
      canUpdate: true,
      isPaused: true,
      onPause: () => { },
      onResume: () => { },
    }
    const enzymeWrapper = shallow(<PauseResumeOrderComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.isFalse(buttonWrapper.props().disabled, 'Button should be enabled')
    assert.equal(buttonWrapper.props().onClick, props.onResume, 'Resume callback should be reported in resume mode')
    assert.equal(buttonWrapper.props().title, 'order.list.option.cell.resume.order.tooltip', 'It should show resume operation tooltip')
    assert.lengthOf(enzymeWrapper.find(ResumeIcon), 1, 'It should show resume operation icon')
    assert.lengthOf(enzymeWrapper.find(PauseIcon), 0, 'It should not show pause operation icon')
  })
  it('should render correctly for pause action', () => {
    const props = {
      canUpdate: true,
      isPaused: false,
      onPause: () => { },
      onResume: () => { },
    }
    const enzymeWrapper = shallow(<PauseResumeOrderComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.isFalse(buttonWrapper.props().disabled, 'Button should be enabled')
    assert.equal(buttonWrapper.props().onClick, props.onPause, 'Pause callback should be reported in resume mode')
    assert.equal(buttonWrapper.props().title, 'order.list.option.cell.pause.order.tooltip', 'It should show resume operation tooltip')
    assert.lengthOf(enzymeWrapper.find(PauseIcon), 1, 'It should show pause operation icon')
    assert.lengthOf(enzymeWrapper.find(ResumeIcon), 0, 'It should not show resume operation icon')
  })
})
