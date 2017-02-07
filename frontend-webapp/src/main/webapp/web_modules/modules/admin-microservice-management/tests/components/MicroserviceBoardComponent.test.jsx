import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { IntlStub } from '@regardsoss/tests-helpers'
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
    const options = {
      context: {
        intl: IntlStub,
      },
    }
    const enzymeWrapper = shallow(<MicroserviceBoardComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(BoardComponent)
    expect(subComponent).to.have.length(1)
  })
})
