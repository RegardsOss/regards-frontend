/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { GraphLevelDisplayerContainer } from '../../../src/containers/user/GraphLevelDisplayerContainer'
import GraphLevelDisplayer from '../../../src/components/user/GraphLevelDisplayer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing GraphLevelDisplayerContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GraphLevelDisplayerContainer)
  })
  it('should render properly', () => {
    const props = {
      graphDatasetAttributes: [],
      levelIndex: 0,
      isFirstLevel: true,
      isLastLevel: false,
      levelModelName: 'any',
      isShowable: true,
      isLoading: false,
      hasError: false,
      collections: {},
      datasets: {},
      parentIpId: null,

      // from mapDispatchToProps
      dispatchFetchLevelCollections: React.PropTypes.func.isRequired,
      dispatchFetchLevelDatasets: React.PropTypes.func.isRequired,
    }
    const enzymeWrapper = shallow(<GraphLevelDisplayerContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(GraphLevelDisplayer), 1, 'The corresponding component should be rendered')
  })
})
