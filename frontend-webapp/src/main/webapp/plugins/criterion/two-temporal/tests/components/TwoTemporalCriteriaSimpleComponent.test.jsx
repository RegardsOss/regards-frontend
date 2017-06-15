/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
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
        firstField: {
          name: 'firstField',
          description: 'First attribute to search',
          type: 'temporal',
        },
        secondField: {
          name: 'secondField',
          description: 'Second attribute to search',
          type: 'temporal',
        },
      },
      getDefaultState: spy(),
      savePluginState: spy(),
      onChange: spy(),
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaSimpleComponent {...props} />)
    expect(enzymeWrapper.find(TemporalCriteriaComponent)).to.have.length(2)
  })
})
