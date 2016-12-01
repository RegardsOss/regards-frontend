import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Table, TableRow } from 'material-ui/Table'
import { AccountListComponent } from '../../src/components/AccountListComponent'

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing project list container', () => {
  it('should exists', () => {
    assert.isDefined(AccountListComponent)
  })
  it('should render self and subcomponents', () => {
    const props = {
      accountList: {
        1: {
          content: {
            id: '1',
            lastName: 'last name',
            email: 'em@il.com',
            firstName: 'first icon',
            status: 'PENDING',
          },
        },
      },
      handleDelete: () => {},
      handleOpen: () => {},
      handleEdit: () => {},
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

    const enzymeWrapper = shallow(<AccountListComponent {...props} />, options)
    expect(enzymeWrapper.find(Table)).to.have.length(1)
    expect(enzymeWrapper.find(TableRow)).to.have.length(2)
  })
})
