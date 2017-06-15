/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import TwoNumericalCriteriaComposedComponent from '../../src/components/TwoNumericalCriteriaComposedComponent'
import NumericalCriteriaComponent from '../../src/components/NumericalCriteriaComponent'

/**
 * Test case for {@link TwoNumericalCriteriaComposedComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA COMPOSED] Testing the two numerical criteria composed component', () => {
  it('should exists', () => {
    assert.isDefined(TwoNumericalCriteriaComposedComponent)
    assert.isDefined(NumericalCriteriaComponent)
  })
  it('should render self and subcomponents', () => {
    const props = {
      attributes: {
        firstAttribute: {
          name: 'firstAttribute',
          description: 'First attribute to search',
          type: 'numerical',
        },
      },
      getDefaultState: spy(),
      savePluginState: spy(),
      onChange: spy(),
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaComposedComponent {...props} />)
    const children = enzymeWrapper.find(NumericalCriteriaComponent)
    expect(children).to.have.length(2)
    const first = children.at(0)
    const second = children.at(1)
    expect(first.props().reversed).to.equal(true)
    expect(first.props().hideAttributeName).to.equal(true)
    expect(first.props().fixedComparator).to.equal(true)
    expect(second.props().reversed).to.equal(false)
    expect(second.props().hideAttributeName).to.equal(true)
    expect(second.props().fixedComparator).to.equal(true)
  })
})
