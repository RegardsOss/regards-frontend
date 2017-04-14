/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SearchGraphHeaderContainer } from '../../../src/containers/user/SearchGraphHeaderContainer'
import SearchGraphHeader from '../../../src/components/user/SearchGraphHeader'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SearchGraphHeaderContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchGraphHeaderContainer)
  })
  it('should render properly', () => {
    const props = {
      graphDatasetAttributes: [],
      // from mapStateToProps
      datasetAttributesVisible: true,
      moduleCollapsed: true,
      // from mapDispatchToProps
      dispatchSetDatasetAttributesVisible: () => { },
      dispatchSetModuleCollapsed: () => { },
    }
    const enzymeWrapper = shallow(<SearchGraphHeaderContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SearchGraphHeader), 1, 'The corresponding component should be rendered')
  })
})
