/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import CollectionItem from '../../../src/components/user/CollectionItem'
import ItemLink from '../../../src/components/user/ItemLink'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing CollectionItem', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionItem)
  })
  it('should render properly', () => {
    const props = {
      collection: {
        content: {
          ipId: 'ip-1',
          label: 'any,',
          type: 'COLLECTION',
          properties: {},
        },
      },
      selected: false,
      onSelect: () => { },
    }
    const enzymeWrapper = shallow(<CollectionItem {...props} />, { context })
    // test properties propagation
    const links = enzymeWrapper.find(ItemLink)
    assert.lengthOf(links, 1, 'There should be one item link')

    testSuiteHelpers.assertWrapperProperties(links.at(0), {
      text: props.collection.content.label, // text should be collection label
      selected: props.selected,
      onSelect: props.onSelect,
    })
  })
})
