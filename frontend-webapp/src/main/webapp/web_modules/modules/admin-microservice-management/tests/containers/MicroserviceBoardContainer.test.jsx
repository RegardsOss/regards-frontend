import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { MicroserviceBoardContainer } from '../../src/containers/MicroserviceBoardContainer'
import MicroserviceBoardComponent from '../../src/components/MicroserviceBoardComponent'

// Test a components rendering
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing microservice board container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isNotNull(MicroserviceBoardContainer)
    assert.isNotNull(MicroserviceBoardComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      fetchMaintenance: () => {},
      setMaintenance: () => {},
      maintenanceList: () => {},
      // from router
      params: {
        project: 'projectName',
      },
    }
    const enzymeWrapper = shallow(<MicroserviceBoardContainer {...props} />)
    expect(enzymeWrapper.find(MicroserviceBoardComponent)).to.have.length(1)
  })
})
