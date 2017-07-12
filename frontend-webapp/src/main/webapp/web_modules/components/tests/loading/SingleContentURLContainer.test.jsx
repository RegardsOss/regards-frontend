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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import SingleContentURLDialogContainer from '../../src/dialogs/SingleContentURLDialogContainer'
import LoadableContentDialogContainer from '../../src/dialogs/LoadableContentDialogContainer'

describe('[COMPONENTS] Testing SingleContentURLDialogContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SingleContentURLDialogContainer)
  })

  it('should render properly', () => {
    const enzymeWrapper = shallow(<SingleContentURLDialogContainer
      contentURL="http://www.google.com"
      dialogHeightPercent={50}
      dialogWidthPercent={50}
      loadingMessage="Loading..."
      open
    />)
    // 1 - test initial
    // loaded : false
    assert.isFalse(enzymeWrapper.state('loaded'), 'The component should be in loading state')
    // check there is a content displayer to show loading state and content
    const contentDisplayers = enzymeWrapper.find(LoadableContentDialogContainer)
    assert.equal(contentDisplayers.length, 1, 'There should be a content displayer')
    let contentDisplayer = contentDisplayers.at(0)
    assert.isTrue(contentDisplayer.props().open, 'The loadable content displayer should be visible')
    assert.isFalse(contentDisplayer.props().loaded, 'The loadable content displayer should show loading')

    // 2 - move into loaded state
    enzymeWrapper.instance().onContentLoaded()
    // check: the wrapper is no longer loading
    assert.isTrue(enzymeWrapper.state('loaded'), 'The component should be in loading state')
    contentDisplayer = enzymeWrapper.find(LoadableContentDialogContainer).at(0)
    assert.isTrue(contentDisplayer.props().open, 'The loadable content displayer should be visible')
    assert.isTrue(contentDisplayer.props().loaded, 'The loadable content displayer should no longer show loading')

    // 3 - Test changing URL and state reset
    enzymeWrapper.setProps({
      contentURL: 'http://www.google.fr',
    })
    assert.isFalse(enzymeWrapper.state('loaded'), 'The component should be in loading state')
  })
})
