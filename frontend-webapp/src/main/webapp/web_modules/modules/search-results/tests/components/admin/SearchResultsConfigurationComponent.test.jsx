/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { stub, spy } from 'sinon'
import { assert } from 'chai'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Field } from '@regardsoss/form-utils'
import { RadioButton } from 'material-ui/RadioButton'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import Styles from '../../../src/styles/styles'
import SearchResultsConfigurationComponent from '../../../src/components/admin/SearchResultsConfigurationComponent'

/**
 * Tests for FormParametersConfigurationComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing SearchResultsConfigurationComponent', () => {
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

  it('Should render a SearchResultsConfigurationComponent to configure search results', () => {
    const selectCallback = spy()
    const props = {
      defaultSelected: SearchResultsTargetsEnum.DATASET_RESULTS,
      onSelectType: selectCallback,
      disabled: false,
      selectableAttributes: {},
      changeField: () => {},
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
