/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TextField from 'material-ui/TextField'
import TemporalCriteriaComponent from '../../src/components/TemporalCriteriaComponent'
import TemporalComparatorComponent from '../../src/components/TemporalComparatorComponent'

/**
 * Test case for {@link TemporalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TEMPOAL CRITERIA] Testing the temporal criteria component', () => {
  it('should exists', () => {
    assert.isDefined(TemporalCriteriaComponent)
    assert.isDefined(TemporalComparatorComponent)
    assert.isDefined(TextField)
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
    expect(enzymeWrapper.find(TextField)).to.have.length(1)
  })
})
