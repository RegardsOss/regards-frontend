/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TwoTemporalCriteriaComposedComponent from '../../src/components/TwoTemporalCriteriaComposedComponent'
import TemporalCriteriaComponent from '../../src/components/TemporalCriteriaComponent'

/**
 * Test case for {@link TwoTemporalCriteriaComposedComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO TEMPORAL CRITERIA COMPOSED] Testing the two temporal criteria composed component', () => {
  it('should exists', () => {
    assert.isDefined(TwoTemporalCriteriaComposedComponent)
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
      },
      pluginInstanceId: 42,
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaComposedComponent {...props} />)
    const children = enzymeWrapper.find(TemporalCriteriaComponent)
    expect(children).to.have.length(2)
    const first = children.at(0)
    const second = children.at(1)
    expect(first.props().reversed).to.equal(true)
    expect(first.props().comparator).to.equal('LE')
    expect(first.props().hideAttributeName).to.equal(true)
    expect(second.props().reversed).to.equal(false)
    expect(second.props().comparator).to.equal('LE')
    expect(second.props().hideAttributeName).to.equal(true)
  })
})
