/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import DatasetAttributes from '../../../src/components/user/DatasetAttributes'
import ItemLink from '../../../src/components/user/ItemLink'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing DatasetAttributes', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetAttributes)
  })
  it('should render properly when not visible', () => {
    const props = {
      visible: false,
      state: ItemLink.States.DEFAULT,
      datasetAttributes: [],
    }
    const enzymeWrapper = shallow(<DatasetAttributes {...props} />, { context })
    const showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be one showable controller')
    assert.isFalse(showables.at(0).props().show, 'The component should not be visible')
  })
  it('should render properly when visible without attributes', () => {
    const props = {
      visible: true,
      state: ItemLink.States.DEFAULT,
      datasetAttributes: [],
    }
    const enzymeWrapper = shallow(<DatasetAttributes {...props} />, { context })
    const showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be one showable controller')
    assert.isFalse(showables.at(0).props().show, 'The component should not be visible')
  })
  it('should render properly when visible without attributes', () => {
    const props = {
      visible: true,
      state: ItemLink.States.DEFAULT,
      datasetAttributes: [
        {
          label: 'attr1',
          render: () => <div />,
          renderKey: 'attr1',
          renderValue: {
            main: 'val1',
          },
        },
        {
          label: 'attr2',
          render: () => <div />,
          renderKey: 'attr2',
          renderValue: {
            main: 'val2',
          },
        },
      ],
    }
    const enzymeWrapper = shallow(<DatasetAttributes {...props} />, { context })
    const showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be one showable controller')
    assert.isTrue(showables.at(0).props().show, 'The component should be visible')
    // check there is one element for each attribute label. We search here text node (no type)
    props.datasetAttributes.forEach(({ label }) => {
      const labelTextNodes = enzymeWrapper.findWhere(node => !node.type() && node.text() === label)
      assert.lengthOf(labelTextNodes, 1, `${label} -There should one and only one text node to show each attribute label`)
    })
  })
})
