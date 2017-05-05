/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import { TableContainer } from '@regardsoss/components'
import Styles from '../../../src/styles/styles'
import SearchResultsComponent from '../../../src/components/user/SearchResultsComponent'
import NavigationComponent from '../../../src/components/user/NavigationComponent'

/**
 * Tests for SearchResultsComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing SearchResultsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  const options = { context: buildTestContext(Styles) }

  it('Should render a AttributeConfigurationComponent', () => {
    const props = {
      appName: 'test',
      project: 'project',
      enableFacettes: true,
      searchQuery: '',
      facettesQuery: '',
      attributesConf: [],
      attributesRegroupementsConf: [],
      attributeModels: {},
      hideDatasetsConfiguration: false,
      target: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
    }

    const wrapper = shallow(
      <SearchResultsComponent {...props} />, options,
    )

    const navigationCmpt = wrapper.find(NavigationComponent)
    assert.lengthOf(navigationCmpt, 1, 'There should be a NavigationComponent rendered')

    const tableComponent = wrapper.find(TableContainer)
    assert.lengthOf(tableComponent, 1, 'There should be a TableContainer rendered')
  })
})
