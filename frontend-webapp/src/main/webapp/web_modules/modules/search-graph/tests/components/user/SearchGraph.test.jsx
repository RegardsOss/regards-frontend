/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import SearchGraph from '../../../src/components/user/SearchGraph'
import DescriptionContainer from '../../../src/containers/user/DescriptionContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SearchGraph', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchGraph)
  })
  it('should render when module is not collapsed', () => {
    const props = {
      graphDatasetAttributes: [],
      moduleCollapsed: false,
      moduleConf: {
        graphLevels: [

        ],
        graphDatasetAttributes: [],
      },
    }
    // check correctly rendered
    const enzymeWrapper = shallow(<SearchGraph {...props} />, { context })
    let showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be a module showable render')
    assert.isTrue(showables.at(0).props().show, 'The module content should be visible when not collapsed')

    const nextProps = {
      ...props,
      moduleCollapsed: true,
    }
    enzymeWrapper.setProps(nextProps)
    showables = enzymeWrapper.find(ShowableAtRender)
    assert.isFalse(showables.at(0).props().show, 'The module content should be hidden when collapsed')

    assert.lengthOf(enzymeWrapper.find(DescriptionContainer), 1, 'Search graph must have a description container')
  })
})
