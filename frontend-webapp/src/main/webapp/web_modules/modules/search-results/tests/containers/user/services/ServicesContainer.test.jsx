/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ServicesContainer } from '../../../../src/containers/user/services/ServicesContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing ServicesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServicesContainer)
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
      fetchOneDataobjetBusinessServices: () => { },
      fetchManyDataobjectsBusinessServices: () => { },
      fetchUIServices: () => { },
    }
    shallow(<ServicesContainer {...props} />, { context })
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
    }
    shallow(<ServicesContainer {...props} />, { context })
  })
})
