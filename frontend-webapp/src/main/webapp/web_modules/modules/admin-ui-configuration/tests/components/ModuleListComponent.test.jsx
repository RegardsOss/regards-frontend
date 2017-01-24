/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { TableBody, TableRow } from 'material-ui/Table'
import sinon from 'sinon'
import IconButton from 'material-ui/IconButton'
import ModuleListComponent from '../../src/components/ModuleListComponent'

const options = {
  context: {
    muiTheme: {
      palette: {
        primary1Color: 'White',
        accent1Color: 'White',
        pickerHeaderColor: 'White',
      },
    },
    intl: {
      formatMessage: opt => opt.id,
      formatTime: () => {},
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

describe('[ADMIN UI-CONFIGURATION] Testing Modules list component', () => {
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
  })
})
