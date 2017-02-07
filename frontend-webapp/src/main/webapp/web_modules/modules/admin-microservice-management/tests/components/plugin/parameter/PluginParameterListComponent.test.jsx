import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Card } from 'material-ui/Card'
import PluginParameterListComponent from '../../../../src/components/plugin/parameter/PluginParameterListComponent'

describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter list component', () => {
  it('should exists', () => {
    assert.isDefined(PluginParameterListComponent)
    assert.isDefined(Card)
  })

  it('should render a Card', () => {
    const props = {
      mode: 'view',
    }
    const enzymeWrapper = shallow(<PluginParameterListComponent {...props} />)
    const subComponent = enzymeWrapper.find(Card)
    expect(subComponent).to.have.length(1)
  })
})
