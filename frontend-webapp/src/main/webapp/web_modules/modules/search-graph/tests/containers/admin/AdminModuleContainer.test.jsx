/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModuleForm from '../../../src/components/admin/ModuleForm'
import { AdminModuleContainer } from '../../../src/containers/admin/AdminModuleContainer'

describe('[Search Graph] Testing AdminModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminModuleContainer)
  })
  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
      adminForm: {
        changeField: () => { },
        form: {},
      },
      // form map state to properties
      collectionModels: {},
      selectableAttributes: {},
      hasError: false,
      // from map dispatch to properies
      fetchCollectionModels: () => { },
      fetchSelectableAttributes: () => { },
    }
    // verify that the module form is rendered
    const enzymeWrapper = shallow(<AdminModuleContainer {...props} />)
    assert.equal(enzymeWrapper.find(ModuleForm).length, 1, 'The corresponding component should be rendered')
  })
})
