/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import NavigationLevel from '../../../../src/models/navigation/NavigationLevel'
import SearchResultsComponent from '../../../../src/components/user/results/SearchResultsComponent'
import { SearchResultsContainer } from '../../../../src/containers/user/results/SearchResultsContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing SearchResultsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchResultsContainer)
  })
  it('should render properly', () => {
    const props = {
      // sub modules rendering
      appName: 'Zapas Tapas',
      project: 'eat spanish',
      searchQuery: 'spacy=abit',
      enableFacettes: true,
      facettesQuery: 'facettes=codiments',
      attributesConf: [],
      attributesRegroupementsConf: [],
      attributeModels: {},
      viewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      levels: [NavigationLevel.buildRootLevel()],
      dispatchChangeViewObjectType: () => { },
      dispatchDatasetSelected: () => { },
      dispatchTagSelected: () => { },
    }
    const enzymeWrapper = shallow(<SearchResultsContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SearchResultsComponent), 1, 'The corresponding component should be rendered')
  })
})
