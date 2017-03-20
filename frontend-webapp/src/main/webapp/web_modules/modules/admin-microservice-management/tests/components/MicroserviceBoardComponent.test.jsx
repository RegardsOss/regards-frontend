/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { BoardComponent } from '@regardsoss/components'
import MicroserviceBoardComponent from '../../src/components/MicroserviceBoardComponent'
import microservices from '../../src/data/microservices.json'

/**
 * Microservices configuration tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing microservice board component', () => {
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(MicroserviceBoardComponent)
    assert.isDefined(BoardComponent)
  })

  it('should render sub-components', () => {
    const maintenance = {}
    microservices.forEach((microservice) => {
      maintenance[microservice.name] = {}
      maintenance[microservice.name].isOn = () => {}
      maintenance[microservice.name].fetch = () => {}
      maintenance[microservice.name].set = () => {}
    })

    const props = {
      project: 'someProject',
      maintenance,
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
