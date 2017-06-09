/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { SampleCriteria } from '../../src/components/SampleCriteria'

/**
 * Test case for {@link StringCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN SampleCriteria CRITERIA] Testing the criteria component', () => {
  it('should exists', () => {
    assert.isDefined(SampleCriteria)
  })
  it('should render self and sub components', () => {
    shallow(<SampleCriteria />)
  })
})
