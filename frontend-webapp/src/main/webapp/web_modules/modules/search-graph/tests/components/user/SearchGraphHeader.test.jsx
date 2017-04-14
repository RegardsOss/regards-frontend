/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import Toggle from 'material-ui/Toggle'
import ExpandedIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import CollapsedIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'

import SearchGraphHeader from '../../../src/components/user/SearchGraphHeader'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SearchGraphHeader', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchGraphHeader)
  })
  it('should show / hide the dataset attributes toggle according with areDatasetAttributesAvailable property', () => {
    const props = {
      moduleCollapsed: false,
      datasetAttributesVisible: false,
      areDatasetAttributesAvailable: false,
      onSetDatasetAttributesVisible: () => { },
      dispatchToggleModuleCollapsed: () => { },
    }

    // check button is hidden when areDatasetAttributesAvailable is false
    const enzymeWrapper = shallow(<SearchGraphHeader {...props} />, { context })
    let showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be a dataset attributes showable render')
    assert.isFalse(showables.at(0).props().show, 'The toggle should be visible when dataset attributes are not available')

    // check is it now visible
    enzymeWrapper.setProps({
      ...props,
      areDatasetAttributesAvailable: true,
    })
    showables = enzymeWrapper.find(ShowableAtRender)
    assert.isTrue(showables.at(0).props().show, 'The toggle should be visible when dataset attributes are available')
  })
  it('should check / uncheck the dataset attributes toggle according with module state', () => {
    const props = {
      moduleCollapsed: false,
      datasetAttributesVisible: false,
      areDatasetAttributesAvailable: true,
      onSetDatasetAttributesVisible: () => { },
      dispatchToggleModuleCollapsed: () => { },
    }

    // check button is hidden when areDatasetAttributesAvailable is false
    const enzymeWrapper = shallow(<SearchGraphHeader {...props} />, { context })
    let toggles = enzymeWrapper.find(Toggle)
    assert.lengthOf(toggles, 1, 'There should be a dataset attributes toggle')
    assert.isFalse(toggles.at(0).props().toggled, 'The toggle should not be toggled when dataset attributes are not visible')

    // check is it now visible
    enzymeWrapper.setProps({
      ...props,
      datasetAttributesVisible: true,
    })
    toggles = enzymeWrapper.find(Toggle)
    assert.isTrue(toggles.at(0).props().toggled, 'The toggle should be toggled when dataset attributes are visible')
  })
  it('should show collapsed expanded state', () => {
    const props = {
      moduleCollapsed: false,
      datasetAttributesVisible: false,
      areDatasetAttributesAvailable: false,
      onSetDatasetAttributesVisible: () => { },
      dispatchToggleModuleCollapsed: () => { },
    }

    // check button is hidden when areDatasetAttributesAvailable is false
    const enzymeWrapper = shallow(<SearchGraphHeader {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(ExpandedIcon), 1, 'Icon should reflect expanded state')
    assert.lengthOf(enzymeWrapper.find(CollapsedIcon), 0, 'Icon should reflect expanded state')

    // check is it now visible
    enzymeWrapper.setProps({
      ...props,
      moduleCollapsed: true,
    })
    assert.lengthOf(enzymeWrapper.find(ExpandedIcon), 0, 'Icon should reflect collapsed state')
    assert.lengthOf(enzymeWrapper.find(CollapsedIcon), 1, 'Icon should reflect collapsed state')
  })
})
