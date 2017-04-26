/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LoadableContentDialogContainer } from '@regardsoss/components'
import DetailViewComponent from '../../../src/components/detail/DetailViewComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing DetailViewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(DetailViewComponent)
  })
  it('should render properly and dispatch loaded / open states', () => {
    const props = {
      // entity information API
      entityLabel: 'Allô quoi!',
      attributes: [],
      descriptionFileURL: null,
      descriptionFile: null,
      // dialog API
      open: true,
      loaded: true,
      dialogHeightPercent: 10,
      dialogWidthPercent: 10,
      onClose: () => { },
    }
    let enzymeWrapper = shallow(<DetailViewComponent {...props} />, { context })
    let loadableDialogWrapper = enzymeWrapper.find(LoadableContentDialogContainer)
    assert.lengthOf(enzymeWrapper.find(LoadableContentDialogContainer), 1, '1 - There should be a loadabled content dialog container as delegate')
    testSuiteHelpers.assertWrapperProperties(loadableDialogWrapper, {
      open: true,
      loaded: true,
    }, '1 - Loaded and open states should be correctly dispatched to delegate')

    const props2 = {
      ...props,
      open: false,
      loaded: false,
    }
    enzymeWrapper = shallow(<DetailViewComponent {...props2} />, { context })
    loadableDialogWrapper = enzymeWrapper.find(LoadableContentDialogContainer)
    assert.lengthOf(enzymeWrapper.find(LoadableContentDialogContainer), 1, '2 - There should be a loadabled content dialog container as delegate')
    testSuiteHelpers.assertWrapperProperties(loadableDialogWrapper, {
      open: false,
      loaded: false,
    }, '2 - Loaded and open states should be correctly dispatched to delegate')
  })
})
