/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LoadableContentDialogContainer } from '@regardsoss/components'
import EntityDescriptionComponent from '../../../src/components/description/EntityDescriptionComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing EntityDescriptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(EntityDescriptionComponent)
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
    let enzymeWrapper = shallow(<EntityDescriptionComponent {...props} />, { context })
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
    enzymeWrapper = shallow(<EntityDescriptionComponent {...props2} />, { context })
    loadableDialogWrapper = enzymeWrapper.find(LoadableContentDialogContainer)
    assert.lengthOf(enzymeWrapper.find(LoadableContentDialogContainer), 1, '2 - There should be a loadabled content dialog container as delegate')
    testSuiteHelpers.assertWrapperProperties(loadableDialogWrapper, {
      open: false,
      loaded: false,
    }, '2 - Loaded and open states should be correctly dispatched to delegate')
  })
})
