/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LazyModuleComponent } from '@regardsoss/modules'
import NavigableSearchResults from '../../../src/components/user/NavigableSearchResults'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing NavigableSearchResults', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigableSearchResults)
  })
  it('should render properly without the search query', () => {
    const props = {
      appName: 'any',
      project: 'any',
      searchQuery: null, // search query if a dataset is selected
      // Module configuration
      moduleConf: {},
    }
    shallow(<NavigableSearchResults {...props} />, { context })
  })
  it('should render properly with the search query', () => {
    const props = {
      appName: 'any',
      project: 'any',
      searchQuery: 'kikou?lol=xptdrkikoulol',
      moduleConf: {},
    }
    const render = shallow(<NavigableSearchResults {...props} />, { context })
    const lazyModules = render.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 1, 'There should be one lazy module for results')
    const { appName, project, module: { conf: { searchQuery } } } = lazyModules.at(0).props()
    testSuiteHelpers.assertAllProperties({
      appName,
      project,
      searchQuery,
    }, {
      appName: props.appName,
      project: props.project,
      searchQuery: props.searchQuery,
    })
  })
})
