/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { assert } from 'chai'
import { RadioButton } from 'material-ui/RadioButton'
import { Field } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import SearchResultsConfigurationComponent from '../../../src/components/admin/SearchResultsConfigurationComponent'
import Styles from '../../../src/styles/styles'

/**
 * Tests for FormParametersConfigurationComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing SearchResultsConfigurationComponent', () => {
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

    const radioField = wrapper.find(Field).find({ name: 'conf.resultType' })
    assert(radioField.length === 1, 'The radio button to select the search results type should be defined')

    const radioOptions = radioField.find(RadioButton)
    assert.lengthOf(radioOptions, 2, 'There should be 3 selectable options')
  })
})
