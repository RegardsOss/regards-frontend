/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PluginServicesContainer } from '../../../../src/containers/user/results/PluginServicesContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing PluginServicesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginServicesContainer)
  })
  it('should render properly loading', () => {
    const props = {
      selectedDatasetIpId: 'pipo1',
      isLoading: true,
      oneDatasetBusinessServices: null,
      oneDataobjetBusinessServices: null,
      manyDataobjectsBusinessServices: null,
      uiServices: null,
      fetchOneDatasetBusinessServices: () => { },
      fetchManyDataobjectsBusinessServices: () => { },
      fetchUIServices: () => { },
      publishDatasetServices: () => { },
    }
    shallow(<PluginServicesContainer {...props} />, { context })
  })

  it('should render properly loaded', () => {
    const props = {
      selectedDatasetIpId: 'pipo1',
      isLoading: false,
      oneDatasetBusinessServices: {},
      oneDataobjetBusinessServices: {},
      manyDataobjectsBusinessServices: {},
      uiServices: {},
      fetchOneDatasetBusinessServices: () => { },
      fetchOneDataobjetBusinessServices: () => { },
      fetchManyDataobjectsBusinessServices: () => { },
      fetchUIServices: () => { },
      publishDatasetServices: () => { },
    }
    shallow(<PluginServicesContainer {...props} />, { context })
  })
})
