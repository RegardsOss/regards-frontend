import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import Warning from 'material-ui/svg-icons/alert/warning'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import OnHoverSwitchIconButton from '@regardsoss/components/src/buttons/OnHoverSwitchIconButton'
import DatabaseConnectionTesterIconButton from '../../src/components/DatabaseConnectionTesterIconButton'
import ConnectionTesterProgress from '../../src/components/ConnectionTesterProgress'

// Test a component rendering
describe('[ADMIN DATABASE MANAGEMENT] Testing DatabaseConnectionTesterIconButton', () => {
  it('should exists', () => {
    assert.isDefined(DatabaseConnectionTesterIconButton)
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
    expect(enzymeWrapper.find(OnHoverSwitchIconButton)).to.have.length(1)
    expect(enzymeWrapper.find(Check)).to.have.length(1)
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
    expect(enzymeWrapper.find(OnHoverSwitchIconButton)).to.have.length(1)
    expect(enzymeWrapper.find(Warning)).to.have.length(1)
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
          connectivity: EnumConnectivity.ERROR,
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
    expect(enzymeWrapper.find(OnHoverSwitchIconButton)).to.have.length(1)
    expect(enzymeWrapper.find(Error)).to.have.length(1)
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
    expect(enzymeWrapper.find(ConnectionTesterProgress)).to.have.length(1)
  })
})
