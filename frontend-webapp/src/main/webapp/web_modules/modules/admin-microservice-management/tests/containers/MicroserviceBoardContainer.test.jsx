/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { MicroserviceBoardContainer } from '../../src/containers/MicroserviceBoardContainer'
import MicroserviceBoardComponent from '../../src/components/MicroserviceBoardComponent'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing microservice board container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(MicroserviceBoardContainer)
    assert.isDefined(MicroserviceBoardComponent)
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
