/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import { ModuleContainer } from '../../src/containers/ModuleContainer'
import facetsNetworkDump from '../network-dump/search-results-dump'

import styles from '../../src/styles/styles'

describe('[ SEARCH FACETS ] Testing ModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleContainer)
  })
  const context = buildTestContext(styles)

  it('should render properly', () => {
    const props = {
      appName: 'any',
      project: 'any',
      facets: facetsNetworkDump.facets,
      moduleConf: {
        onFiltersChanged: PropTypes.func.isRequired,
        filters: [],
        attributeModels: {},
        show: true,
        resultsSelectors: new BasicFacetsPageableSelectors(),
      },
    }
    // Test visible rendering
    const enzymeWrapper = shallow(<ModuleContainer {...props} />, { context })
    let showables = enzymeWrapper.find(ShowableAtRender)
    assert.equal(showables.length, 1, 'The facets container should be shown optionnaly')
    assert.isTrue(showables.at(0).props().show, 'The facets container should be visible when module configuration show it true')

    // Test hidden rendering
    props.moduleConf.show = false
    enzymeWrapper.setProps(props)
    showables = enzymeWrapper.find(ShowableAtRender)
    assert.isFalse(showables.at(0).props().show, 'The facets container should be hidden when module configuration show it false')
  })
})
