/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { FieldArray } from '@regardsoss/form-utils'
import ModuleForm from '../../../src/components/admin/ModuleForm'
import SearchResultForm from '../../../src/components/admin/SearchResultForm'
import SelectedLevelFormRender from '../../../src/components/admin/SelectedLevelFormRender'

import styles from '../../../src/styles/styles'

describe('[Search Graph] Testing ModuleForm', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(ModuleForm)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
    moduleTheme: styles({ textField: {} }),
  }
  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
      adminForm: {
        changeField: () => { },
        form: {},
      },
      collectionModels: {},
    }
    const enzymeWrapper = shallow(<ModuleForm {...props} />, { context })
    assert.equal(enzymeWrapper.find(SearchResultForm).length, 1, 'The search result configuration form should be used to configure search results')
    // test render component in array
    const field = enzymeWrapper.find(FieldArray)
    assert.equal(field.length, 1, 'There should be a field for levels')
    assert.equal(field.at(0).props().component, SelectedLevelFormRender, 'The render used should be the specific levels render')
  })
})
