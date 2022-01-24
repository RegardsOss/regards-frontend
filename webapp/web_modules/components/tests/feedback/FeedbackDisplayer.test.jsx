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
import Dialog from 'material-ui/Dialog'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
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
  it('should render correctly with minimal properties configuration', () => {
    const props = {
      isFetching: false,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayer {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isFalse(dialogWrapper.props().open, 'It should be hidden')
    assert.isNull(enzymeWrapper.state().currentFeedbackIcon, 'Feedback should be hidden')
    assert.isTrue(enzymeWrapper.state().showLoading, 'Should be loading (default, not in done transition)')
  })

  it('should render correctly with complete configuration', () => {
    const props = {
      isFetching: false,
      showDoneTimeMS: 1,
      doneWithError: true,
      fetchingIcon: <div id="fetchingIcon" />,
      doneIcon: <div id="doneIcon" />,
      doneWithErrorIcon: <div id="doneWithErrorIcon" />,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayer {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isFalse(dialogWrapper.props().open, 'It should be hidden')
    assert.isNull(enzymeWrapper.state().currentFeedbackIcon, 'Feedback should be hidden')
    assert.isTrue(enzymeWrapper.state().showLoading, 'Should be loading (default, not in done transition)')
  })

  it('should render correctly a fetch-don cycle (without error)', () => {
    // initialize
    const props = {
      isFetching: false,
      showDoneTimeMS: 50000,
      doneWithError: false,
      fetchingIcon: <div id="fetchingIcon" />,
      doneIcon: <div id="doneIcon" />,
      doneWithErrorIcon: <div id="doneWithErrorIcon" />,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayer {...props} />, { context })
    let dialogWrapper = enzymeWrapper.find(Dialog)
    assert.isNull(enzymeWrapper.state().currentFeedbackIcon, 'Feedback should be hidden')
    assert.isTrue(enzymeWrapper.state().showLoading, 'Should be loading (default, not in done transition)')
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isFalse(dialogWrapper.props().open, 'It should be hidden')

    // test showing feedback
    enzymeWrapper.setProps({
      ...props,
      isFetching: true,
    })
    dialogWrapper = enzymeWrapper.find(Dialog)
    assert.isNotNull(enzymeWrapper.state().currentFeedbackIcon, 'State should hold the loading icon (with styles)')
    assert.isTrue(enzymeWrapper.state().showLoading, 'It should be marked loading')
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isTrue(dialogWrapper.props().open, 'It should be visible')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().id === 'fetchingIcon'), 1, 'The component should be showing the fetching icon')

    // test hiding feedback
    enzymeWrapper.setProps({
      ...props,
      isFetching: false,
    })
    dialogWrapper = enzymeWrapper.find(Dialog)
    assert.isNotNull(enzymeWrapper.state().currentFeedbackIcon, 'State should hold the done icon (with styles)')
    assert.isFalse(enzymeWrapper.state().showLoading, 'It should no longer be marked loading')
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isTrue(dialogWrapper.props().open, 'It should be visible')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().id === 'doneIcon'), 1, 'The component should be showing the done icon')

    // test hide
    enzymeWrapper.instance().onHide()
    enzymeWrapper.update()
    dialogWrapper = enzymeWrapper.find(Dialog)
    assert.isNull(enzymeWrapper.state().currentFeedbackIcon, 'Feedback should be hidden in state')
    assert.isTrue(enzymeWrapper.state().showLoading, 'Should be loading (default, not in done transition)')
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isFalse(dialogWrapper.props().open, 'It should be hidden')
  })
  it('should render correctly a fetch-don cycle (with error)', () => {
    // initialize
    const props = {
      isFetching: false,
      showDoneTimeMS: 50000,
      doneWithError: false,
      fetchingIcon: <div id="fetchingIcon" />,
      doneIcon: <div id="doneIcon" />,
      doneWithErrorIcon: <div id="doneWithErrorIcon" />,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayer {...props} />, { context })
    enzymeWrapper.setProps({
      ...props,
      isFetching: true,
    })
    // hide feedback with error
    enzymeWrapper.setProps({
      ...props,
      isFetching: false,
      doneWithError: true,
    })
    let dialogWrapper = enzymeWrapper.find(Dialog)
    assert.isNotNull(enzymeWrapper.state().currentFeedbackIcon, 'State should hold the done with erro icon (with styles)')
    assert.isFalse(enzymeWrapper.state().showLoading, 'It should no longer be marked loading')
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isTrue(dialogWrapper.props().open, 'It should be visible')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().id === 'doneWithErrorIcon'), 1,
      'The component should be showing the done with error icon')

    // test hide
    enzymeWrapper.instance().onHide()
    enzymeWrapper.update()
    dialogWrapper = enzymeWrapper.find(Dialog)
    assert.isNull(enzymeWrapper.state().currentFeedbackIcon, 'Feedback should be hidden in state')
    assert.isTrue(enzymeWrapper.state().showLoading, 'Should be loading (default, not in done transition)')
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isFalse(dialogWrapper.props().open, 'It should be hidden')
  })
})
