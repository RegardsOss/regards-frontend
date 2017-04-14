/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DatasetItem from '../../../src/components/user/DatasetItem'
import ItemLink from '../../../src/components/user/ItemLink'
import DatasetAttributes from '../../../src/components/user/DatasetAttributes'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing DatasetItem', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetItem)
  })
  it('should render properly', () => {
    const props = {
      dataset: {
        content: {
          ipId: 'ip-1',
          label: 'any,',
          type: 'DATASET',
          properties: {},
        },
      },
      attributesVisible: false,
      locked: false,
      selected: false,
      datasetAttributes: [],
      onSelect: () => { },
    }
    const enzymeWrapper = shallow(<DatasetItem {...props} />, { context })
    // test properties propagation
    let links = enzymeWrapper.find(ItemLink)
    let attributesPanes = enzymeWrapper.find(DatasetAttributes)
    assert.lengthOf(links, 1, 'There should be one item link')
    testSuiteHelpers.assertWrapperProperties(links.at(0), {
      text: props.dataset.content.label, // text should be dataset label
      selected: props.selected,
      onSelect: props.onSelect,
      locked: props.locked,
    })
    assert.lengthOf(attributesPanes, 1, 'There should be one dataset container pane')
    testSuiteHelpers.assertWrapperProperties(attributesPanes.at(0), {
      datasetAttributes: props.datasetAttributes,
      visible: props.attributesVisible,
    })

    // change props
    const nextProps = {
      ...props,
      attributesVisible: true,
      locked: true,
      selected: true,
      datasetAttributes: [],
      onSelect: () => { },
    }
    enzymeWrapper.setProps(nextProps)
    links = enzymeWrapper.find(ItemLink)
    attributesPanes = enzymeWrapper.find(DatasetAttributes)
    testSuiteHelpers.assertWrapperProperties(links.at(0), {
      text: nextProps.dataset.content.label, // text should be dataset label
      selected: nextProps.selected,
      onSelect: nextProps.onSelect,
      locked: nextProps.locked,
    })
    assert.lengthOf(attributesPanes, 1, 'There should be one dataset container pane')
    testSuiteHelpers.assertWrapperProperties(attributesPanes.at(0), {
      datasetAttributes: nextProps.datasetAttributes,
      visible: nextProps.attributesVisible,
    })
    // test attributes are hidden
  })
})
