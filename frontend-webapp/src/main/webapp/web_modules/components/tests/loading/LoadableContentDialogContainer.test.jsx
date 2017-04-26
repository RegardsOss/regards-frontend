/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import root from 'window-or-global'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Dialog from 'material-ui/Dialog'
import LoadableContentDialogContainer from '../../src/dialogs/LoadableContentDialogContainer'
import ShowableAtRender from '../../src/cards/ShowableAtRender'

describe('[COMPONENTS] Testing LoadableContentDialogComponent', () => {
  before(() => {
    testSuiteHelpers.before()
    // add root screen properties for the component to render
    root.screen = { availWidth: '1200', availHeight: '600' }
  })
  after(() => {
    testSuiteHelpers.after()
    // remove root customization
    delete root.screen
  })
  it('should exists', () => {
    assert.isDefined(LoadableContentDialogContainer)
  })

  it('should render correctly when hidden', () => {
    const enzymeWrapper = shallow(
      <LoadableContentDialogContainer
        dialogHeightPercent={50}
        dialogWidthPercent={50}
        loadingMessage="Loading..."
        open={false}
        loaded={false}
      >
        <div id="testDiv" />
      </LoadableContentDialogContainer>,
    )
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'It should use a dialog')
    assert.isFalse(dialog.at(0).props().open, 'Dialog should be hidden')
  })
  it('should render correctly when loading', () => {
    const enzymeWrapper = shallow(
      <LoadableContentDialogContainer
        dialogHeightPercent={50}
        dialogWidthPercent={50}
        loadingMessage="Loading..."
        open
        loaded={false}
      >
        <div id="testDiv" />
      </LoadableContentDialogContainer>,
    )
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'It should use a dialog')
    assert.isTrue(dialog.at(0).props().open, 'Dialog should be visible')

    const showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'It should use a showable for loading state')
    assert.isTrue(showables.at(0).props().show, 'It should display loading')

    const testDivs = enzymeWrapper.findWhere(n => n.props().id === 'testDiv')
    assert.lengthOf(testDivs, 1, 'The children should be added')
    // parent should not be visible
    const parentStyles = testDivs.at(0).parent().props().style
    assert.isDefined(parentStyles, 'The custom children parent styles should be defined (to not display children)')
    assert.equal(parentStyles.display, 'none', 'The parent should hide children while loading')
  })
  it('should render correctly when loaded', () => {
    const enzymeWrapper = shallow(
      <LoadableContentDialogContainer
        dialogHeightPercent={50}
        dialogWidthPercent={50}
        loadingMessage="Loading..."
        open
        loaded
      >
        <div id="testDiv" />
      </LoadableContentDialogContainer>,
    )
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'It should use a dialog')
    assert.isTrue(dialog.at(0).props().open, 'Dialog should be visible')

    const showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'It should use a showable for loading state')
    assert.isFalse(showables.at(0).props().show, 'It should not show loading')

    const testDivs = enzymeWrapper.findWhere(n => n.props().id === 'testDiv')
    assert.lengthOf(testDivs, 1, 'The children should be added')
    // parent should not be visible
    const parentStyles = testDivs.at(0).parent().props().style
    assert.isDefined(parentStyles, 'The custom children parent styles should be defined (to not display children)')
    assert.notEqual(parentStyles.display, 'none', 'The parent should show children while loading')
  })
})
