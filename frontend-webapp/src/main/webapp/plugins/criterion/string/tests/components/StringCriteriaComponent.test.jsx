/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TextField from 'material-ui/TextField'
import { StringCriteriaComponent } from '../../src/components/StringCriteriaComponent'

/**
 * Test case for {@link StringCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN STRING CRITERIA] Testing the string criteria component', () => {
  it('should exists', () => {
    assert.isDefined(StringCriteriaComponent)
    assert.isDefined(TextField)
  })
  it('should render self and sub components', () => {
    const props = {
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: 'string',
        },
      },
      getDefaultState: () => {
      },
    }
    const enzymeWrapper = shallow(<StringCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(TextField)).to.have.length(1)
  })
})
