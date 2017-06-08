/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { SampleService } from '../../src/components/SampleService'

/**
 * Test case for {@link StringCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN SampleService CRITERIA] Testing the service component', () => {
  it('should exists', () => {
    assert.isDefined(SampleService)
  })
  it('should render self and sub components', () => {
    shallow(<SampleService />)
  })
})
