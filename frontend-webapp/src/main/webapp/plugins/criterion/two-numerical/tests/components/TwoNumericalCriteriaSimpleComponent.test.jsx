/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TwoNumericalCriteriaSimpleComponent from '../../src/components/TwoNumericalCriteriaSimpleComponent'
import NumericalCriteriaComponent from '../../src/components/NumericalCriteriaComponent'

/**
 * Test case for {@link TwoNumericalCriteriaSimpleComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA SIMPLE] Testing the two numerical criteria simple component', () => {
  it('should exists', () => {
    assert.isDefined(TwoNumericalCriteriaSimpleComponent)
    assert.isDefined(NumericalCriteriaComponent)
  })
  it('should render self and subcomponents', () => {
    const props = {
      attributes: {
        firstField: {
          name: 'firstField',
          description: 'First attribute to search',
          type: 'numerical',
        },
        secondField: {
          name: 'secondField',
          description: 'Second attribute to search',
          type: 'numerical',
        },
      },
      getDefaultState: () => {
      },
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaSimpleComponent {...props} />)
    expect(enzymeWrapper.find(NumericalCriteriaComponent)).to.have.length(2)
  })
})
