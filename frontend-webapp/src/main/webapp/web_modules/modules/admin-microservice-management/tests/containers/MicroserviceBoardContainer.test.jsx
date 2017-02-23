import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { MicroserviceBoardContainer } from '../../src/containers/MicroserviceBoardContainer'
import MicroserviceBoardComponent from '../../src/components/MicroserviceBoardComponent'

// Test a components rendering
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing microservice board container', () => {
  it('should exists', () => {
    assert.isDefined(MicroserviceBoardContainer)
    assert.isDefined(MicroserviceBoardComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'projectName',
      },
    }
    const enzymeWrapper = shallow(<MicroserviceBoardContainer {...props} />)
    expect(enzymeWrapper.find(MicroserviceBoardComponent)).to.have.length(1)
  })
})
