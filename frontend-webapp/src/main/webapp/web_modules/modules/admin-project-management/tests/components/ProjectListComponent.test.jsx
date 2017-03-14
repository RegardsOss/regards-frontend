import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { Table, TableRow } from 'material-ui/Table'
import { IntlStub } from '@regardsoss/tests-helpers'
import { CardActionsComponent } from '@regardsoss/components'
import { ProjectListComponent } from '../../src/components/ProjectListComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing project list container', () => {
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(ProjectListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      projectList: {
        'project name': {
          content: {
            id: 1,
            name: 'project name',
            description: 'project desc',
            icon: 'http://localhost:1888/yeah.gif',
            isPublic: true,
            isAccessible: true,
          },
        },
        'project name 2': {
          content: {
            id: 2,
            name: 'project name 2',
            description: 'project desc',
            icon: '../../storage-folder/yeah.gif',
            isPublic: true,
            isAccessible: true,
          },
        },
      },
      handleDelete: () => { },
      handleOpen: () => { },
      handleEdit: () => { },
      handleUpdateLicense: () => { },
      createUrl: '/some/url',
    }
    const options = {
      context: {
        intl: IntlStub,
        muiTheme: {
          palette: {
            primary1Color: '789456',
          },
        },
      },
    }

    const enzymeWrapper = shallow(<ProjectListComponent {...props} />, options)
    expect(enzymeWrapper.find(Table)).to.have.length(1)
    expect(enzymeWrapper.find(TableRow)).to.have.length(3)
    expect(enzymeWrapper.find(CardActionsComponent)).to.have.length(1)
  })
})
