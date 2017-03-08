/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import root from 'window-or-global'
import sinon from 'sinon'
import LoadableContentDialogComponent from '../../src/dialogs/LoadableContentDialogComponent'
import ShowableAtRender from '../../src/cards/ShowableAtRender'

describe('[COMPONENTS] Testing LoadableContentDialogComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
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
    assert.isDefined(LoadableContentDialogComponent)
  })

  it('should render properly', () => {
    const enzymeWrapper = shallow(<LoadableContentDialogComponent
      contentURL="http://www.google.com"
      dialogHeightPercent={50}
      dialogWidthPercent={50}
      loadingMessage="Loading..."
      open
    />)
    // check there is a showable at render (used )
    let showableComponent = enzymeWrapper.find(ShowableAtRender)
    assert.equal(showableComponent.length, 1, 'There should one showable component for loading display')
    // check : the wrapper is now loading and loading displayer is visible
    assert.isFalse(enzymeWrapper.state('loaded'), 'The component should be in loading state')
    assert.isTrue(showableComponent.at(0).props().show, 'The loading state should be displayed')

    // move into loaded state
    enzymeWrapper.instance().onFrameLoaded()
    // check: the wrapper is no longer loading
    assert.isTrue(enzymeWrapper.state('loaded'), 'The component should be in loading state')
    showableComponent = enzymeWrapper.find(ShowableAtRender)
    assert.isFalse(showableComponent.at(0).props().show, 'The loading state should be hidden')
  })
})
