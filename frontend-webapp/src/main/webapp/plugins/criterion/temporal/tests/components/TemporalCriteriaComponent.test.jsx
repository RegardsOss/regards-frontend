/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import TemporalCriteriaComponent from '../../src/components/TemporalCriteriaComponent'
import TemporalComparatorComponent from '../../src/components/TemporalComparatorComponent'

/**
 * Test case for {@link TemporalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TEMPORAL CRITERIA] Testing the temporal criteria component', () => {
  it('should exists', () => {
    assert.isDefined(TemporalCriteriaComponent)
    assert.isDefined(TemporalComparatorComponent)
    assert.isDefined(DatePicker)
    assert.isDefined(TimePicker)
  })
  it('should render self and subcomponents', () => {
    const props = {
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: 'temporal',
        },
        onChange: () => {
        },
        pluginInstanceId: 42,
      },
    }
    const enzymeWrapper = shallow(<TemporalCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(TemporalComparatorComponent)).to.have.length(1)
    expect(enzymeWrapper.find(DatePicker)).to.have.length(1)
    expect(enzymeWrapper.find(TimePicker)).to.have.length(1)
  })
})
