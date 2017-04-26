/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import root from 'window-or-global'
import { stub } from 'sinon'
import SingleContentURLDialogContainer from '../../src/dialogs/SingleContentURLDialogContainer'
import LoadableContentDialogContainer from '../../src/dialogs/LoadableContentDialogContainer'

describe('[COMPONENTS] Testing SingleContentURLDialogContainer', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
    // add root screen properties for the component to render
    root.screen = { availWidth: '1200', availHeight: '600' }
  })
  after(() => {
    console.error.restore()
    // remove root customization
    delete root.screen
  })
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
