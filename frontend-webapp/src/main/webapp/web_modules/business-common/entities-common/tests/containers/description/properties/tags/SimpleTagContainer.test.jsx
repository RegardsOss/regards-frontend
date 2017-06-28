/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TagComponent from '../../../../../src/components/description/properties/tags/TagComponent'
import SimpleTagContainer from '../../../../../src/containers/description/properties/tags/SimpleTagContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing SimpleTagContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SimpleTagContainer)
  })
  it('should render correctly', () => {
    const props = {
      tag: 'test',
      onSearchTag: () => { },
      onShowDescription: null,
      isEntity: false,
    }
    const enzymeWrapper = shallow(<SimpleTagContainer {...props} />, { context })
    const compWrapper = enzymeWrapper.find(TagComponent)
    assert.lengthOf(compWrapper, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(compWrapper, {
      tagLabel: props.tag,
      onSearchTag: enzymeWrapper.instance().onSearchTag,
      onShowDescription: null, // unused by the simple tags
      isEntity: false,
    }, 'It should report required properties for subcontainer to work')
  })
})