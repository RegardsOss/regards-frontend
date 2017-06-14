/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import TemporalComparatorComponent from '../../src/components/TemporalComparatorComponent'
import EnumTemporalComparator from '../../src/model/EnumTemporalComparator'

/**
 * Test case for {@link TemporalComparatorComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO TEMPORAL CRITERIA] Testing the temporal comparator component', () => {
  it('should exists', () => {
    assert.isDefined(TemporalComparatorComponent)
    assert.isDefined(EnumTemporalComparator)
  })
  it('should render self and subcomponents', () => {
    const props = {
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<TemporalComparatorComponent {...props} />)
    expect(enzymeWrapper.find(RaisedButton)).to.have.length(1)
    expect(enzymeWrapper.find(IconMenu)).to.have.length(1)
    expect(enzymeWrapper.find(MenuItem)).to.have.length(3)
  })
})
