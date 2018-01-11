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
import Dialog from 'material-ui/Dialog'
import DoneIcon from 'material-ui/svg-icons/action/done'
import TestIcon1 from 'material-ui/svg-icons/action/pregnant-woman'
import TestIcon2 from 'material-ui/svg-icons/device/airplanemode-active'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIClient } from '@regardsoss/client'
import { FeedbackDisplayer } from '../../src/feedback/FeedbackDisplayer'
import styles from '../../src/feedback/styles'

const context = buildTestContext(styles)

/**
* Test FeedbackDisplayer
* @author Raphaël Mechali
*/
describe('[COMPONENTS] Testing FeedbackDisplayer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FeedbackDisplayer)
  })
  it('should render correctly without matching feedback', () => {
    const props = {
      feedbackSelector: UIClient.getFeedbackSelectors([]),
      iconByType: { testFeedback: TestIcon1 },
    }
    const enzymeWrapper = shallow(<FeedbackDisplayer {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isFalse(dialogWrapper.props().open, 'It should be hidden')
    assert.isNull(enzymeWrapper.state().CurrentFeedbackIconConst, 'Feedback should be hidden')
    assert.isTrue(enzymeWrapper.state().showLoading, 'Should be loading (default, not in done transition)')
  })

  it('should render correctly ignoring non handled feedback types', () => {
    const props = {
      feedbackSelector: UIClient.getFeedbackSelectors([]),
      iconByType: { testFeedback: TestIcon1 },
      feedbackType: 'nonHandledType',
    }
    const enzymeWrapper = shallow(<FeedbackDisplayer {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isFalse(dialogWrapper.props().open, 'It should be hidden')
    assert.isNull(enzymeWrapper.state().CurrentFeedbackIconConst, 'Feedback should be hidden')
    assert.isTrue(enzymeWrapper.state().showLoading, 'Should be loading (default, not in done transition)')
  })

  it('should render correctly with handled types, then show DONE after transition, then hide', () => {
    // test first feedback
    const props = {
      feedbackSelector: UIClient.getFeedbackSelectors([]),
      iconByType: { handledFb1: TestIcon1, handledFb2: TestIcon2 },
      feedbackType: 'handledFb1',
    }
    const enzymeWrapper = shallow(<FeedbackDisplayer {...props} />, { context })
    let dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isTrue(dialogWrapper.props().open, 'Disloag should be open as there is known feedback')
    assert.equal(enzymeWrapper.state().CurrentFeedbackIconConst, TestIcon1, 'Matching icon should be selected for handledFb1')
    assert.isTrue(enzymeWrapper.state().showLoading, 'It should be loading (default, not in done transition)')

    // test second feedback
    enzymeWrapper.setProps({
      ...props,
      feedbackType: 'handledFb2',
    })
    dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isTrue(dialogWrapper.props().open, 'Disloag should be open as there is known feedback')
    assert.equal(enzymeWrapper.state().CurrentFeedbackIconConst, TestIcon2, 'Matching icon should be selected for handledFb2')
    assert.isTrue(enzymeWrapper.state().showLoading, 'It should be loading (default, not in done transition)')

    // test after transition (DONE)
    enzymeWrapper.setProps({
      ...props,
      feedbackType: null,
    })
    dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isTrue(dialogWrapper.props().open, 'Disloag should be open as it shows post transition')
    assert.equal(enzymeWrapper.state().CurrentFeedbackIconConst, DoneIcon, 'DONE icon should be selected')
    assert.isFalse(enzymeWrapper.state().showLoading, 'It should not be marked loading anymore')

    // test hide
    enzymeWrapper.instance().onHide()
    enzymeWrapper.update()
    dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isFalse(dialogWrapper.props().open, 'It should be hidden')
    assert.isNull(enzymeWrapper.state().CurrentFeedbackIconConst, 'Feedback should be hidden')
    assert.isTrue(enzymeWrapper.state().showLoading, 'Should be loading (back in default state')
  })
})
