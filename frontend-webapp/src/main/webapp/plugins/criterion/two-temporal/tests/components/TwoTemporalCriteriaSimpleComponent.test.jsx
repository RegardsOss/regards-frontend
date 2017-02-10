/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TwoTemporalCriteriaSimpleComponent from '../../src/components/TwoTemporalCriteriaSimpleComponent'
import TemporalCriteriaComponent from '../../src/components/TemporalCriteriaComponent'

/**
 * Test case for {@link TwoTemporalCriteriaSimpleComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO TEMPORAL CRITERIA SIMPLE] Testing the two temporal criteria simple component', () => {
  it('should exists', () => {
    assert.isDefined(TwoTemporalCriteriaSimpleComponent)
    assert.isDefined(TemporalCriteriaComponent)
  })
  it('should render self and subcomponents', () => {
    const props = {
      attributes: {
        firstAttribute: {
          name: 'firstAttribute',
          description: 'First attribute to search',
          type: 'temporal',
        },
        secondAttribute: {
          name: 'secondAttribute',
          description: 'Second attribute to search',
          type: 'temporal',
        },
      },
      pluginInstanceId: 42,
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaSimpleComponent {...props} />)
    expect(enzymeWrapper.find(TemporalCriteriaComponent)).to.have.length(2)
  })
})
