/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { assert } from 'chai'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Field } from '@regardsoss/form-utils'
import { RadioButton } from 'material-ui/RadioButton'
import { DATASET_RESULTS } from '../../../../src/components/admin/parameters/ResultTypesEnum'
import Styles from '../../../../src/styles/styles'
import FormParametersConfigurationComponent from '../../../../src/components/admin/parameters/FormParametersConfigurationComponent'

/**
 * Tests for FormParametersConfigurationComponent
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing FormParametersConfigurationComponent', () => {
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
      intl: {
        formatMessage: id => (id.id),
      },
    },
  }

  it('Should render a FormParametersConfigurationComponent to configure search results', () => {
    const selectCallback = sinon.spy()
    const props = {
      defaultSelected: DATASET_RESULTS,
      onSelectType: selectCallback,
      disabled: false,
    }
    const wrapper = shallow(
      <FormParametersConfigurationComponent {...props} />, options,
    )

    const radioField = wrapper.find(Field).find({ name: 'conf.resultType' })
    assert(radioField.length === 1, 'The radio button to select the search results type should be defined')

    const radioOptions = radioField.find(RadioButton)
    assert.lengthOf(radioOptions, 2, 'There should be 3 selectable options')
  })
})
