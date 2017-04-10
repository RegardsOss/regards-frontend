import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import DatabaseConnectionTesterIconButton from '../../../src/components/projectConnection/DatabaseConnectionTesterIconButton'
import ConnectionTesterProgress from '../../../src/components/projectConnection/ConnectionTesterProgress'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing DatabaseConnectionTesterIconButton', () => {
  it('should exists', () => {
    assert.isDefined(DatabaseConnectionTesterIconButton)
  })

  it('should render the test button if connectivity is NOT_TESTED', () => {
    const props = {
      testConnection: () => ({ error: false }),
      refreshConnection: () => {},
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
    }
    const options = {
      context: {
        muiTheme: {
          palette: {
            warningColor: 'orange',
          },
        },
      },
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTesterIconButton {...props} />, options)
    expect(enzymeWrapper.find(IconButton)).to.have.length(1)
    expect(enzymeWrapper.find(PlayArrow)).to.have.length(1)
  })

  it('should render the test button at render', () => {
    const props = {
      testConnection: () => ({ error: false }),
      refreshConnection: () => {},
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
    const options = {
      context: {
        muiTheme: {
          palette: {
            warningColor: 'orange',
          },
        },
      },
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTesterIconButton {...props} />, options)
    expect(enzymeWrapper.find(IconButton)).to.have.length(1)
    expect(enzymeWrapper.find(PlayArrow)).to.have.length(1)

    enzymeWrapper.find(IconButton).simulate('touchTap')

    expect(enzymeWrapper.find(ConnectionTesterProgress)).to.have.length(1)
  })
})
