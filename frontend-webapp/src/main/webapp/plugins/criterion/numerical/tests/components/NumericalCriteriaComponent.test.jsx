/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TextField from 'material-ui/TextField'
import NumericalCriteriaComponent from '../../src/components/NumericalCriteriaComponent'
import NumericalComparatorComponent from '../../src/components/NumericalComparatorComponent'

/**
 * Test case for {@link NumericalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN NUMERICAL CRITERIA] Testing the numerical criteria component', () => {
  it('should exists', () => {
    assert.isDefined(NumericalCriteriaComponent)
    assert.isDefined(NumericalComparatorComponent)
    assert.isDefined(TextField)
  })
  it('should render self and subcomponents', () => {
    const props = {
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: 'numerical',
        },
        onChange: () => {
        },
        pluginInstanceId: 42,
      },
    }
    const enzymeWrapper = shallow(<NumericalCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(NumericalComparatorComponent)).to.have.length(1)
    expect(enzymeWrapper.find(TextField)).to.have.length(1)
  })
})
