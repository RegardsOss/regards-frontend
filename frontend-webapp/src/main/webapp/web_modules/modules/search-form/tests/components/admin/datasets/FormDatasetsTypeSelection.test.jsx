/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { RadioButton } from 'material-ui/RadioButton'
import { DATASET_MODEL_TYPE } from '../../../../src/models/datasets/DatasetSelectionTypes'
import Styles from '../../../../src/styles/styles'
import FormDatasetsTypeSelection from '../../../../src/components/admin/datasets/FormDatasetsTypeSelection'

/**
 * Tests for FormDatasetsTypeSelection
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing FormDatasetsTypeSelection', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(Styles)

  it('Should render a FormDatasetsTypeSelection to configure datasets', () => {
    const selectCallback = spy()
    const props = {
      defaultSelected: DATASET_MODEL_TYPE,
      onSelectType: selectCallback,
      disabled: false,
    }
    const wrapper = shallow(
      <FormDatasetsTypeSelection {...props} />, { context },
    )

    const radioField = wrapper.find(Field).find({ name: 'conf.datasets.type' })
    assert(radioField.length === 1, 'The radio button to select the dataset association type should be defined')

    const radioOptions = radioField.find(RadioButton)
    assert.lengthOf(radioOptions, 3, 'There should be 3 selectable options')
  })
})
