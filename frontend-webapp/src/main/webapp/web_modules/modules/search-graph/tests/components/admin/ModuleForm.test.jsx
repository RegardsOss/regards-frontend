/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { FieldArray } from '@regardsoss/form-utils'
import ModuleForm from '../../../src/components/admin/ModuleForm'
import SearchResultForm from '../../../src/components/admin/SearchResultForm'
import SelectedLevelFormRender from '../../../src/components/admin/SelectedLevelFormRender'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing ModuleForm', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleForm)
  })

  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
      adminForm: {
        changeField: () => { },
        form: {
          conf: {
            graphDatasetAttributes: [],
          },
        },
      },
      collectionModels: {},
      selectableAttributes: {},
    }
    const enzymeWrapper = shallow(<ModuleForm {...props} />, { context })
    assert.equal(enzymeWrapper.find(SearchResultForm).length, 1, 'The search result configuration form should be used to configure search results')
    // test render component in array
    const field = enzymeWrapper.find(FieldArray)
    assert.equal(field.length, 1, 'There should be a field for levels')
    assert.equal(field.at(0).props().component, SelectedLevelFormRender, 'The render used should be the specific levels render')
  })
})
