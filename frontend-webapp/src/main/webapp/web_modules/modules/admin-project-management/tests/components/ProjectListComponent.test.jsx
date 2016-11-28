import { shallow } from 'enzyme'
import { expect } from 'chai'
import { ProjectListComponent } from '../../src/components/ProjectListComponent'
import { Table, TableRow } from 'material-ui/Table'
import { CardActionsComponent } from '@regardsoss/components'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing project list container', () => {
  it('should render self and subcomponents', () => {
    const props = {
      projectList: {
        'project name': {
          content: {
            id: '1',
            name: 'project name',
            description: 'project desc',
            icon: 'project icon',
            isPublic: true,
          },
        },
        'project name 2': {
          content: {
            id: '2',
            name: 'project name 2',
            description: 'project desc',
            icon: 'project icon',
            isPublic: true,
          },
        },
      },
      handleDelete: () => {},
      handleOpen: () => {},
      handleEdit: () => {},
      createUrl: '/some/url',
    }
    const options = {
      context: {
        intl: {
          formatMessage: message => message.id,
        },
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
