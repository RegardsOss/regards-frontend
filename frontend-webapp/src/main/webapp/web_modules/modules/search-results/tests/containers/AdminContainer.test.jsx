/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SearchResultsConfigurationComponent from '../../src/components/admin/SearchResultsConfigurationComponent'
import { AdminContainer } from '../../src/containers/AdminContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing AdminContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminContainer)
  })
  it('should render properly', () => {
    const props = {
      appName: 'any',
      project: 'any',
      adminForm: {
        changeField: () => { },
        form: {},
      },
      moduleConf: {},
      attributeModels: {},
      fetchAllModelsAttributes: () => { },
      fetchAllDatasetModelsAttributes: () => { },
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SearchResultsConfigurationComponent), 0, 'While loading the component should not be rendered')
    enzymeWrapper.instance().setState(
      {
        attributesFetching: false,
        datasetAttributesFetching: false,
      })
    assert.lengthOf(enzymeWrapper.find(SearchResultsConfigurationComponent), 1, 'After loading, the corresponding component should be rendered')
  })
})
