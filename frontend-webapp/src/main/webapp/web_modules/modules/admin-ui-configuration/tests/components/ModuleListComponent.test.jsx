/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert, expect } from 'chai'
import { TableBody, TableRow } from 'material-ui/Table'
import sinon from 'sinon'
import IconButton from 'material-ui/IconButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Toggle from 'material-ui/Toggle'
import { ShowableAtRender } from '@regardsoss/components'
import ModuleListComponent from '../../src/components/ModuleListComponent'

describe('[ADMIN UI-CONFIGURATION] Testing Modules list component', () => {
  const options = {
    context: {
      muiTheme: getMuiTheme({}),
      intl: {
        formatMessage: opt => opt.id,
        formatTime: () => {},
        formatDate: () => {},
        formatRelative: () => {},
        formatNumber: () => {},
        now: () => {},
        formatPlural: () => {},
        formatHTMLMessage: () => {},
      },
    },
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
    },
  }

  it('Should render correctly a list of availables modules', () => {
    const props = {
      modules: testModules,
      onActivation: () => {},
      onCreate: () => {},
      onEdit: () => {},
      onDelete: () => {},
    }

    const wrapper = shallow(
      <ModuleListComponent {...props} />
    , options)

    expect(wrapper.find(TableBody).find(TableRow)).to.have.length(3)
  })

  it('Check actions on ModuleListComponent', () => {
    const onEditCallback = sinon.spy()
    const onDeleteCallback = sinon.spy()

    const props = {
      modules: testModules,
      onActivation: () => {},
      onCreate: () => {},
      onEdit: onEditCallback,
      onDelete: onDeleteCallback,
    }

    const wrapper = shallow(
      <ModuleListComponent {...props} />
      , options)


    const buttons = wrapper.find(TableBody).find(TableRow).find(IconButton)
    expect(buttons).to.have.length(6)

    const editButton = buttons.first()
    editButton.simulate('touchTap')
    expect(onEditCallback.calledOnce).to.equal(true)

    const deleteButton = buttons.at(1)
    assert.isDefined(deleteButton)
    assert.equal(wrapper.find(ShowableAtRender).prop('show'), false, 'Confirm dialog should not be displayed')
    deleteButton.simulate('touchTap')
    assert.equal(wrapper.find(ShowableAtRender).prop('show'), true, 'Confirm dialog should be displayed')

    assert.equal(wrapper.find(Toggle).find({ toggled: true }).length, 2, 'There should be two active modules')
    assert.equal(wrapper.find(Toggle).find({ toggled: false }).length, 1, 'There should be one inactive module')
  })
})
