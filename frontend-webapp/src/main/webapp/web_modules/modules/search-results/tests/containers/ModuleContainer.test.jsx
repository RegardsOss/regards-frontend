/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import ModuleComponent from '../../src/components/user/ModuleComponent'
import URLManagementContainer from '../../src/containers/user/URLManagementContainer'
import { ModuleContainer } from '../../src/containers/ModuleContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

// mock router
const router = require('react-router')

describe('[Search Results] Testing ModuleContainer', () => {
  before(() => {
    // mocking router browser history
    router.browserHistory = {
      getCurrentLocation: () => ({ query: {}, pathname: 'hello/world' }),
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete router.browserHistory
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(ModuleContainer)
  })
  it('should render properly', () => {
    const props = {
      appName: 'any',
      project: 'any',
      fetchAllModelsAttributes: () => { },
      attributeModels: {},
      moduleConf: {
        enableFacettes: true,
        searchQuery: '',
        attributes: [],
        attributesRegroupements: [],
        resultType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
        singleDatasetIpId: null,
        breadcrumbInitialContextLabel: 'hello home',
      },
    }
    const enzymeWrapper = shallow(<ModuleContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(ModuleComponent), 0, 'While loading, the view should be hidden')
    assert.lengthOf(enzymeWrapper.find(URLManagementContainer), 0, 'While loading, URL management container should not be installed')

    // When loading, no components / containers
    enzymeWrapper.instance().setState({ attributesFetching: false })

    assert.lengthOf(enzymeWrapper.find(ModuleComponent), 1, 'After loading, the view should be rendered')
    assert.lengthOf(enzymeWrapper.find(URLManagementContainer), 1, 'After loading, URL management container should be installed')
  })
})
