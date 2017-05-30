/**
 * LICENSE_PLACEHOLDER
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
