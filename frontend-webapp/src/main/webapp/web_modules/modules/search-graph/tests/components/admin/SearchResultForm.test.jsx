/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LazyModuleComponent } from '@regardsoss/modules'
import SearchResultForm from '../../../src/components/admin/SearchResultForm'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SearchResultForm', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchResultForm)
  })

  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
    }
    const enzymeWrapper = shallow(<SearchResultForm {...props} />, { context })
    // assert the component delegates to search results module configuration pane
    const lazyModule = enzymeWrapper.find(LazyModuleComponent)
    assert.equal(lazyModule.length, 1, 'There should be a lazy module for search results configuration')
    assert.equal(lazyModule.at(0).props().module.type, 'search-results', 'There lazy module configuration should point search results')
    assert.isTrue(lazyModule.at(0).props().admin, 'The module should be rendered for configuration')
  })
})
