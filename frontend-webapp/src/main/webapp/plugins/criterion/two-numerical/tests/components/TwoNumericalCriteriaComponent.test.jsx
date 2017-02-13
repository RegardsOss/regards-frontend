/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TwoNumericalCriteriaComponent from '../../src/components/TwoNumericalCriteriaComponent'
import TwoNumericalCriteriaSimpleComponent from '../../src/components/TwoNumericalCriteriaSimpleComponent'
import TwoNumericalCriteriaComposedComponent from '../../src/components/TwoNumericalCriteriaComposedComponent'

/**
 * Test case for {@link TwoNumericalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA] Testing the two numerical criteria component', () => {
  it('should exists', () => {
    assert.isDefined(TwoNumericalCriteriaComponent)
  })
  it('should render the simple component when two different attributes', () => {
    const props = {
      attributes: {
        firstField: {
          name: 'firstAttribute',
          description: 'First attribute to search',
          type: 'numerical',
        },
        secondField: {
          name: 'secondAttribute',
          description: 'Second attribute to search',
          type: 'numerical',
        },
      },
      pluginInstanceId: 42,
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(TwoNumericalCriteriaSimpleComponent)).to.have.length(1)
    expect(enzymeWrapper.find(TwoNumericalCriteriaComposedComponent)).to.have.length(0)
  })
  it('should render the composed component when just a single attribute', () => {
    const props = {
      attributes: {
        firstAttribute: {
          name: 'attribute',
          description: 'First attribute to search',
          type: 'numerical',
        },
      },
      pluginInstanceId: 42,
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(TwoNumericalCriteriaSimpleComponent)).to.have.length(0)
    expect(enzymeWrapper.find(TwoNumericalCriteriaComposedComponent)).to.have.length(1)
  })
})
