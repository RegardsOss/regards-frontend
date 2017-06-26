/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TagTypes } from '@regardsoss/domain/catalog'
import { LazyModuleComponent } from '@regardsoss/modules'
import { NavigableSearchResultsContainer } from '../../../src/containers/user/NavigableSearchResultsContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing NavigableSearchResultsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigableSearchResultsContainer)
  })
  it('should render properly without the search query', () => {
    const props = {
      appName: 'any',
      project: 'any',
      searchQuery: null, // search query if a dataset is selected
      // Module configuration
      moduleConf: {},
      searchTag: null,
    }
    const render = shallow(<NavigableSearchResultsContainer {...props} />, { context, lifecycleExperimental: true })
    const lazyModules = render.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 0, 'There should be no lazy module when there is no tag')
    // there should be no initial search query
  })
  it('should handle search query changes', () => {
    const props = {
      appName: 'any',
      project: 'any',
      moduleConf: {},
      searchTag: 'unemobilette',
      searchLabel: 'Une mobilette',
      searchType: TagTypes.WORD,
    }
    const render = shallow(<NavigableSearchResultsContainer {...props} />, { context, lifecycleExperimental: true })
    let lazyModules = render.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 1, 'There should be one lazy module for results')
    assert.equal(lazyModules.props().module.conf.searchQuery, 'tags:unemobilette', 'The configured search query should be provided for tag')
    assert.isNull(lazyModules.props().module.conf.singleDatasetIpId, 'When searching anything but a Dataset, there should be no single dataset IP ID in results')
    assert.equal(lazyModules.props().module.conf.breadcrumbInitialContextLabel, 'Une mobilette', 'The breadcrumb should worth first search label')

    render.setProps({
      searchTag: 'urn:dataset1',
      searchLabel: 'dslabel',
      searchType: TagTypes.DATASET,
    })
    lazyModules = render.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 1, 'There should be one lazy module for results')
    assert.equal(lazyModules.props().module.conf.searchQuery, 'tags:urn\\:dataset1', 'The configured search query should be provider AND ESCAPED for dataset')
    assert.equal(lazyModules.props().module.conf.singleDatasetIpId, 'urn:dataset1', 'When searching a dataset tag, it should be prvided as single dataset IP ID in results')
    assert.equal(lazyModules.props().module.conf.breadcrumbInitialContextLabel, 'dslabel', 'The breadcrumb should worth second search label')
  })
})
