/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DatasetItemContainer } from '../../../src/containers/user/DatasetItemContainer'
import DatasetItem from '../../../src/components/user/DatasetItem'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing DatasetItemContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetItemContainer)
  })
  it('should render properly', () => {
    const props = {
      dataset: {
        content: {
          ipId: 'ip-1',
          label: 'any,',
          entityType: 'DATASET',
          properties: {},
        },
      },
      selected: false,
      locked: false,
      attributesVisible: false,
      graphDatasetAttributes: [],
      // from map dispatch to props
      dispatchSelected: () => { },
      dispatchSetSearchTag: () => { },
    }
    const enzymeWrapper = shallow(<DatasetItemContainer {...props} />, { context })
    const datasetItems = enzymeWrapper.find(DatasetItem)
    assert.lengthOf(datasetItems, 1, 'The corresponding component should be rendered')
    // check properties propagation
    let componentWrapper = datasetItems.at(0)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      dataset: props.dataset,
      locked: props.locked,
      selected: props.selected,
      attributesVisible: props.attributesVisible,
    })

    // check propagation after change
    const nextProps = {
      ...props,
      selected: true,
      locked: true,
      attributesVisible: true,
    }
    enzymeWrapper.setProps(nextProps)
    componentWrapper = enzymeWrapper.find(DatasetItem).at(0)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      locked: nextProps.locked,
      selected: nextProps.selected,
      attributesVisible: nextProps.attributesVisible,
    })
  })
})
