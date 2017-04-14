/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CollectionItemContainer } from '../../../src/containers/user/CollectionItemContainer'
import CollectionItem from '../../../src/components/user/CollectionItem'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing CollectionItemContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionItemContainer)
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
      // from map dispatch to props
      dispatchSelected: () => { },
    }
    const enzymeWrapper = shallow(<CollectionItemContainer {...props} />, { context })
    const collectionItems = enzymeWrapper.find(CollectionItem)
    assert.lengthOf(collectionItems, 1, 'The corresponding component should be rendered')
    // check properties propagation
    let componentWrapper = collectionItems.at(0)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, { collection: props.collection, selected: props.selected })

    const nextProps = {
      ...props,
      selected: true,
    }
    enzymeWrapper.setProps(nextProps)
    componentWrapper = enzymeWrapper.find(CollectionItem).at(0)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, { selected: nextProps.selected })
    assert.isTrue(componentWrapper.props().selected, 'The component should be selected when the container')
  })
})
