/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import SearchResultsConfigurationComponent from '../../../src/components/admin/SearchResultsConfigurationComponent'
import Styles from '../../../src/styles/styles'

/**
 * Tests for FormParametersConfigurationComponent
 * @author Sébastien binda
 */
describe('[Search Results] Testing SearchResultsConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  const options = { context: buildTestContext(Styles) }

  it('Should render a SearchResultsConfigurationComponent to configure search results', () => {
    const selectCallback = spy()
    const props = {
      defaultSelected: SearchResultsTargetsEnum.DATASET_RESULTS,
      onSelectType: selectCallback,
      disabled: false,
      selectableAttributes: {},
      changeField: () => { },
      hideDatasetsConfiguration: false,
    }
    const wrapper = shallow(
      <SearchResultsConfigurationComponent {...props} />, options,
    )

    const showDatasetsField = wrapper.find(Field).find({ name: 'conf.displayDatasets' })
    assert(showDatasetsField.length === 1, 'The show dataset field should be defined')

    const showFacettes = wrapper.find(Field).find({ name: 'conf.enableFacettes' })
    assert(showFacettes.length === 1, 'The faccettes field should be defined')
  })
})
