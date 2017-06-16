/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import NumericalComparatorComponent from '../../src/components/NumericalComparatorComponent'
import EnumNumericalComparator from '../../src/model/EnumNumericalComparator'

/**
 * Test case for {@link NumericalComparatorComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN NUMERICAL CRITERIA] Testing the numerical comparator component', () => {
  it('should exists', () => {
    assert.isDefined(NumericalComparatorComponent)
    assert.isDefined(EnumNumericalComparator)
  })
  it('should render self and subcomponents', () => {
    const props = {
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<NumericalComparatorComponent {...props} />)
    expect(enzymeWrapper.find(RaisedButton)).to.have.length(1)
    expect(enzymeWrapper.find(IconMenu)).to.have.length(1)
    expect(enzymeWrapper.find(MenuItem)).to.have.length(4)
  })
})
