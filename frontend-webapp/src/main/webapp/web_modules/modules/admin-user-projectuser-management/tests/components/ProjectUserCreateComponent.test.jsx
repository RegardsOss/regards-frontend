/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { Field } from '@regardsoss/form-utils'
import { ProjectUserCreateComponent } from '../../src/components/ProjectUserCreateComponent'

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing projectuser form component', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  })
  after(() => {
    console.error.restore()
  })

  it('should exists', () => {
    assert.isDefined(ProjectUserCreateComponent)
  })

  it('should render edit form', () => {
    const props = {
      currentUser: {
        content: {
          id: 1,
          email: 'mon@adresse.em',
          lastUpdate: {
            date: { year: '2017', month: '1', day: '9' },
            time: { hour: '15', minute: '46', second: '12', nano: '453000000' },
          },
          status: 'WAITING_ACCESS',
          metaData: [],
          role: { name: 'REGISTERED_USER' },
          permissions: [],
        },
        links: [],
      },
      roleList: {
        PUBLIC: {
          content: {
            id: 1,
            name: 'PUBLIC',
            permissions: [],
            authorizedAddresses: [],
            isCorsRequestsAuthorized: true,
            isDefault: true,
            isNative: true,
          },
          links: [],
        },
      },
      groupList: {
        AG1: {
          content: {
            id: 1,
            name: 'AG1',
            users: [{ email: 'florian.philippot@facholand.fr' }, { email: 'mon@adresse.em' }],
            accessRights: [],
            isPrivate: true,
          },
          links: [],
        },
        AG2: {
          content: { id: 2, name: 'AG2', users: [], accessRights: [], isPrivate: true },
          links: [],
        },
      },
      onSubmit: () => {},
      backUrl: 'some/url',
      // from Redux Form
      handleSubmit: () => {},
      initialize: () => {},
    }
    const options = {
      context: {
        muiTheme: {
          palette: {
            primary1Color: '#BADA55',
            primary2Color: '#BADA55',
          },
          textField: {
            floatingLabelColor: '#BADA55',
          },
        },
      },
    }
    const enzymeWrapper = shallow(<ProjectUserCreateComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(2)
  })

  it('should render create form', () => {
    const props = {
      roleList: {
        PUBLIC: {
          content: {
            id: 1,
            name: 'PUBLIC',
            permissions: [],
            authorizedAddresses: [],
            isCorsRequestsAuthorized: true,
            isDefault: true,
            isNative: true,
          },
          links: [],
        },
      },
      groupList: {
        AG1: {
          content: {
            id: 1,
            name: 'AG1',
            users: [{ email: 'florian.philippot@facholand.fr' }, { email: 'mon@adresse.em' }],
            accessRights: [],
            isPrivate: true,
          },
          links: [],
        },
        AG2: {
          content: { id: 2, name: 'AG2', users: [], accessRights: [], isPrivate: true },
          links: [],
        },
      },
      onSubmit: () => {},
      backUrl: 'some/url',
      // from Redux Form
      handleSubmit: () => {},
      initialize: () => {},
    }
    const options = {
      context: {
        muiTheme: {
          palette: {
            primary1Color: '#BADA55',
            primary2Color: '#BADA55',
          },
          textField: {
            floatingLabelColor: '#BADA55',
          },
        },
      },
    }
    const enzymeWrapper = shallow(<ProjectUserCreateComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(5)

    // Test if it hides Fields when using an existing REGARDS account
    enzymeWrapper.setState({ useExistingAccount: true })
    const subComponentExistingAccount = enzymeWrapper.find(Field)
    expect(subComponentExistingAccount).to.have.length(2)
  })
})
