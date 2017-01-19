import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { BoardComponent } from '@regardsoss/components'
import MicroserviceBoardComponent from '../../src/components/MicroserviceBoardComponent'

describe('[ADMIN PROJECT MANAGEMENT] Testing microservice board component', () => {
  it('should exists', () => {
    assert.isDefined(MicroserviceBoardComponent)
    assert.isDefined(BoardComponent)
  })

  it('should render sub-components', () => {
    const props = {
      project: 'someProject',
    }
    const enzymeWrapper = shallow(<MicroserviceBoardComponent {...props} />)
    const subComponent = enzymeWrapper.find(BoardComponent)
    expect(subComponent).to.have.length(1)
  })
})
