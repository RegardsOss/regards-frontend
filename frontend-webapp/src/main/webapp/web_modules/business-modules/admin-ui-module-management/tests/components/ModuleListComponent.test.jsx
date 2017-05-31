/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert, expect } from 'chai'
import keys from 'lodash/keys'
import { TableBody, TableRow } from 'material-ui/Table'
import { spy } from 'sinon'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { HateoasIconAction, ResourceIconAction, HateoasToggle } from '@regardsoss/display-control'
import { ShowableAtRender } from '@regardsoss/components'
import ModuleListComponent from '../../src/components/ModuleListComponent'

/**
 * Tests for ModuleListComponent
 * @author Sébastien binda
 */
describe('[ADMIN UI MODULE MANAGEMENT] Testing Modules list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const options = {
    context: buildTestContext(),
  }

  const testModules = {
    0: {
      content: {
        id: 0,
        name: 'module',
        description: 'First Module',
        active: true,
        applicationId: 'user',
        container: 'content',
        conf: {},
      },
      links: [],
    },
    1: {
      content: {
        id: 1,
        name: 'module',
        description: 'Second Module',
        active: true,
        applicationId: 'user',
        container: 'content',
        conf: {},
      },
      links: [],
    },
    2: {
      content: {
        id: 2,
        name: 'module',
        description: 'Third Module',
        active: false,
        applicationId: 'user',
        container: 'content',
        conf: {},
      },
      links: [],
    },
  }

  it('Should render correctly a list of availables modules', () => {
    const props = {
      modules: testModules,
      onActivation: () => {},
      onCreate: () => {},
      onEdit: () => {},
      onDelete: () => {},
      onDuplicate: () => {},
      backUrl: '#',
    }

    const wrapper = shallow(
      <ModuleListComponent {...props} />
    , options)

    expect(wrapper.find(TableBody).find(TableRow)).to.have.length(3)
  })

  it('Check actions on ModuleListComponent', () => {
    const onEditCallback = spy()
    const onDeleteCallback = spy()
    const onDuplicateCallBack = spy()

    const props = {
      modules: testModules,
      onActivation: () => {},
      onCreate: () => {},
      onDuplicate: onDuplicateCallBack,
      onEdit: onEditCallback,
      onDelete: onDeleteCallback,
      backUrl: '#',
    }

    const wrapper = shallow(
      <ModuleListComponent {...props} />
      , options)


    const numberOfHateoasIconByModule = 2
    const numberOfResourceIconByModule = 1
    const buttons = wrapper.find(TableBody).find(TableRow).find(HateoasIconAction)
    assert.lengthOf(buttons, keys(testModules).length * numberOfHateoasIconByModule, `There should be ${keys(testModules).length * numberOfHateoasIconByModule} HateoasIconAction buttons available in the module form page`)
    const rbuttons = wrapper.find(TableBody).find(TableRow).find(ResourceIconAction)
    assert.lengthOf(rbuttons, keys(testModules).length * numberOfResourceIconByModule, `There should be ${keys(testModules).length * numberOfResourceIconByModule} ResourceIconAction buttons available in the module form page`)

    const editButton = buttons.first()
    editButton.simulate('touchTap')
    assert.isTrue(onEditCallback.calledOnce, 'After click on the edit button, the edit callback function should be called')

    const duplicateButton = rbuttons.at(0)
    duplicateButton.simulate('touchTap')
    assert.isTrue(onDuplicateCallBack.calledOnce, 'After click on the duplicate button, the duplicate callback function should be called')

    const deleteButton = buttons.at(1)
    assert.isDefined(deleteButton)
    assert.equal(wrapper.find(ShowableAtRender).prop('show'), false, 'Confirm dialog should not be displayed')
    deleteButton.simulate('touchTap')
    assert.equal(wrapper.find(ShowableAtRender).prop('show'), true, 'Confirm dialog should be displayed')

    assert.equal(wrapper.find(HateoasToggle).find({ toggled: true }).length, 2, 'There should be two active modules')
    assert.equal(wrapper.find(HateoasToggle).find({ toggled: false }).length, 1, 'There should be one inactive module')
  })
})
