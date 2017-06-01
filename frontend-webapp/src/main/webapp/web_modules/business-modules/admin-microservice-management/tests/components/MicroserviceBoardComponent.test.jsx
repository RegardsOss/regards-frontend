/**
 * LICENSE_PLACEHOLDER
 **/
import forEach from 'lodash/forEach'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { BoardComponent } from '@regardsoss/components'
import MicroserviceBoardComponent from '../../src/components/MicroserviceBoardComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

const microservices = STATIC_CONF.MSERVICES
/**
 * Microservices configuration tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing microservice board component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MicroserviceBoardComponent)
    assert.isDefined(BoardComponent)
  })

  it('should render sub-components', () => {
    const maintenance = {}
    forEach(microservices, (microservice) => {
      maintenance[microservice.name] = {}
      maintenance[microservice.name].isOn = () => { }
      maintenance[microservice.name].fetch = () => { }
      maintenance[microservice.name].set = () => { }
    })

    const props = {
      project: 'someProject',
      maintenance,
    }
    const enzymeWrapper = shallow(<MicroserviceBoardComponent {...props} />, { context })
    const subComponent = enzymeWrapper.find(BoardComponent)
    expect(subComponent).to.have.length(1)
  })
})
