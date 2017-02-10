/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TwoTemporalCriteriaComponent from '../../src/components/TwoTemporalCriteriaComponent'
import TwoTemporalCriteriaSimpleComponent from '../../src/components/TwoTemporalCriteriaSimpleComponent'
import TwoTemporalCriteriaComposedComponent from '../../src/components/TwoTemporalCriteriaComposedComponent'

/**
 * Test case for {@link TwoTemporalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO TEMPORAL CRITERIA] Testing the two temporal criteria component', () => {
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
          type: 'temporal',
        },
      },
      pluginInstanceId: 42,
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(TwoTemporalCriteriaSimpleComponent)).to.have.length(1)
    expect(enzymeWrapper.find(TwoTemporalCriteriaComposedComponent)).to.have.length(0)
  })
  it('should render the composed component when just a single attribute', () => {
    const props = {
      attributes: {
        firstAttribute: {
          name: 'attribute',
          description: 'First attribute to search',
          type: 'temporal',
        },
      },
      pluginInstanceId: 42,
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(TwoTemporalCriteriaSimpleComponent)).to.have.length(0)
    expect(enzymeWrapper.find(TwoTemporalCriteriaComposedComponent)).to.have.length(1)
  })
})
