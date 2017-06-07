/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import CollectionItem from '../../../src/components/user/CollectionItem'
import ItemLinkContainer from '../../../src/containers/user/ItemLinkContainer'
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
          entityType: 'COLLECTION',
          properties: {},
        },
      },
      expensible: false,
      selected: false,
      onSelect: () => { },
    }
    const enzymeWrapper = shallow(<CollectionItem {...props} />, { context })
    // test properties propagation
    const links = enzymeWrapper.find(ItemLinkContainer)
    assert.lengthOf(links, 1, 'There should be one item link')

    testSuiteHelpers.assertWrapperProperties(links.at(0), {
      entity: props.collection,
      selected: props.selected,
      onSelect: props.onSelect,
    })
  })
})
