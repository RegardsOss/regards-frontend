/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DatasetServicesContainer } from '../../../src/containers/user/DatasetServicesContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing ServicesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetServicesContainer)
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
    shallow(<DatasetServicesContainer {...props} />, { context })
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
    shallow(<DatasetServicesContainer {...props} />, { context })
  })
})
