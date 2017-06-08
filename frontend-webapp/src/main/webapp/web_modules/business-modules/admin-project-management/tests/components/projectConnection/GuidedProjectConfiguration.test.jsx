/*
 * LICENSE_PLACEHOLDER
 */
import keys from 'lodash/keys'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Step } from 'material-ui/Stepper'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import GuidedProjectConfiguration from '../../../src/components/projectConnection/GuidedProjectConfigurationComponent'
import ProjectConnectionFormComponent from '../../../src/components/projectConnection/ProjectConnectionFormComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing GuidedProjectConfiguration', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const options = {
    context: buildTestContext(),
  }

  it('should exists', () => {
    assert.isDefined(GuidedProjectConfiguration)
  })

  const props = {
    project: {
      content: {
        name: 'cdpp',
      },
    },
    projectConnections: {
      0: {
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
      1: {
        content: {
          id: 1,
          projectName: 'cdpp',
          microservice: 'rs-cloud',
          userName: 'Bob',
          password: 'azerty',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.ERROR,
        },
        links: [],
      },
      2: {
        content: {
          id: 2,
          projectName: 'cdpp',
          microservice: 'rs-dam',
          userName: 'Charlie',
          password: 'qsdfgh',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.NOT_TESTED,
        },
        links: [],
      },
    },
    configureOneForAll: true,
    onCreate: () => {},
    onUpdate: () => {},
    onChangeConfigurationMode: () => {},
  }

  it('should render the stepper to configure individually all connections', () => {
    props.configureOneForAll = false

    const enzymeWrapper = shallow(<GuidedProjectConfiguration {...props} />, options)
    expect(enzymeWrapper.find(Step)).to.have.length(keys(STATIC_CONF.MSERVICES).length)
  })

  it('should render only one form to configure all connection at the same time', () => {
    props.configureOneForAll = true

    const enzymeWrapper = shallow(<GuidedProjectConfiguration {...props} />, options)
    expect(enzymeWrapper.find(Step)).to.have.length(0)
    expect(enzymeWrapper.find(ProjectConnectionFormComponent)).to.have.length(1)
  })
})
