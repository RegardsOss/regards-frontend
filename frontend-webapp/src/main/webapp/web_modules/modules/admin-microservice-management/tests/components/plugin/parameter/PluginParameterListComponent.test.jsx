/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { Card } from 'material-ui/Card'
import PluginParameterListComponent from '../../../../src/components/plugin/parameter/PluginParameterListComponent'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter list component', () => {
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
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
