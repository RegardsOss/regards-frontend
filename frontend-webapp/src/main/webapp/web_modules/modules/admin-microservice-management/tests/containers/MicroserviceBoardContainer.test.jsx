/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { MicroserviceBoardContainer } from '../../src/containers/MicroserviceBoardContainer'
import MicroserviceBoardComponent from '../../src/components/MicroserviceBoardComponent'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing microservice board container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MicroserviceBoardContainer)
    assert.isDefined(MicroserviceBoardComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      fetchMaintenance: () => { },
      setMaintenance: () => { },
      maintenanceList: () => { },
      // from router
      params: {
        project: 'projectName',
      },
    }
    const enzymeWrapper = shallow(<MicroserviceBoardContainer {...props} />)
    expect(enzymeWrapper.find(MicroserviceBoardComponent)).to.have.length(1)
  })
})
