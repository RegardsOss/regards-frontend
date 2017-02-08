/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TwoNumericalCriteriaComposedComponent from '../../src/components/TwoNumericalCriteriaComposedComponent'

/**
 * Test case for {@link TwoNumericalCriteriaComposedComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA COMPOSED] Testing the two numerical criteria composed component', () => {
  it('should exists', () => {
    assert.isDefined(TwoNumericalCriteriaComposedComponent)
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
