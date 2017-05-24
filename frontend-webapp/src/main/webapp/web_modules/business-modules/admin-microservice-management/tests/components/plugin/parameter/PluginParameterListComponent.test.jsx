/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Card } from 'material-ui/Card'
import PluginParameterListComponent from '../../../../src/components/plugin/parameter/PluginParameterListComponent'

const options = {
  context: buildTestContext(),
}

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginParameterListComponent)
    assert.isDefined(Card)
  })

  it('should render a Card', () => {
    const props = {
      mode: 'view',
    }
    const enzymeWrapper = shallow(<PluginParameterListComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Card)
    expect(subComponent).to.have.length(1)
  })
})
