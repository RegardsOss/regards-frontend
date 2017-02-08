/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TwoNumericalCriteriaSimpleComponent from '../../src/components/TwoNumericalCriteriaSimpleComponent'

/**
 * Test case for {@link TwoNumericalCriteriaSimpleComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA] Testing the two numerical criteria simple component', () => {
  it('should exists', () => {
    assert.isDefined(TwoNumericalCriteriaSimpleComponent)
  })
  it('should render self and subcomponents', () => {
    assert.fail(null, null, 'Implement this test')
    // const props = {
    //   onChange: () => {
    //   },
    // }
    // const enzymeWrapper = shallow(<TwoNumericalCriteriaComponent {...props} />)
  })
})
