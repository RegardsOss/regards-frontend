import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import FlatButton from 'material-ui/FlatButton'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import OnHoverSwitchFlatButton from '@regardsoss/components/src/buttons/OnHoverSwitchFlatButton'
import DatabaseConnectionTester from '../../../src/components/projectConnection/DatabaseConnectionTester'
import ConnectionTesterProgress from '../../../src/components/projectConnection/ConnectionTesterProgress'

const options = {
  context: buildTestContext(),
}

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing DatabaseConnectionTester', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatabaseConnectionTester)
  })

  it('should render the test button if connectivity is NOT_TESTED', () => {
    const props = {
      projectConnection: {
        content: {
          id: 0,
          projectName: 'cdpp',
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.NOT_TESTED,
        },
        links: [],
      },
      testConnection: () => {},
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTester {...props} />, options)
    expect(enzymeWrapper.find(FlatButton)).to.have.length(1)
  })

  it('should render the success button if connectivity is SUCCESS', () => {
    const props = {
      projectConnection: {
        content: {
          id: 0,
          projectName: 'cdpp',
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.SUCCESS,
        },
        links: [],
      },
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTester {...props} />, options)
    expect(enzymeWrapper.find(OnHoverSwitchFlatButton)).to.have.length(1)
  })

  it('should render the warning button if connectivity is WARNING', () => {
    const props = {
      projectConnection: {
        content: {
          id: 0,
          projectName: 'cdpp',
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.WARNING,
        },
        links: [],
      },
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTester {...props} />, options)
    expect(enzymeWrapper.find(OnHoverSwitchFlatButton)).to.have.length(1)
  })

  it('should render the error button if connectivity is ERROR', () => {
    const props = {
      projectConnection: {
        content: {
          id: 0,
          projectName: 'cdpp',
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.WARNING,
        },
        links: [],
      },
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTester {...props} />, options)
    expect(enzymeWrapper.find(OnHoverSwitchFlatButton)).to.have.length(1)
  })

  it('should render the liner progress if connectivity is PENDING', () => {
    const props = {
      projectConnection: {
        content: {
          id: 0,
          projectName: 'cdpp',
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.PENDING,
        },
        links: [],
      },
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTester {...props} />, options)
    expect(enzymeWrapper.find(ConnectionTesterProgress)).to.have.length(1)
  })
})
