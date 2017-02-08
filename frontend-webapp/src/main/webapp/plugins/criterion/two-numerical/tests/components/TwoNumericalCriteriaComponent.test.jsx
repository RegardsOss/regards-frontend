/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TwoNumericalCriteriaComponent from '../../src/components/NumericalComparatorComponent'

/**
 * Test case for {@link TwoNumericalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA] Testing the two numerical criteria component', () => {
  it('should exists', () => {
    assert.isDefined(TwoNumericalCriteriaComponent)
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
