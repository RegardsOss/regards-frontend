/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import Chip from 'material-ui/Chip'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import PluginParameterDynamic from '../../../../src/components/plugin/parameter/PluginParameterDynamic'

const options = {
  context: buildTestContext(),
}

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter dynamic component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginParameterDynamic)
    assert.isDefined(Chip)
  })

  it('should render a Chip', () => {
    const props = {
      pluginParameter: {
        id: 0,
        name: 'suffix',
        value: 'dynavalue0',
        dynamic: true,
        dynamicsValues: [
          {
            value: 'dynavalue0',
          },
          {
            value: 'dynavalue1',
          },
        ],
      },
      pluginParameterType: {
        name: 'suffix',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
        defaultValue: 'default',
      },
    }
    const enzymeWrapper = shallow(<PluginParameterDynamic {...props} />, options)
    const subComponent = enzymeWrapper.find(Chip)
    expect(subComponent).to.have.length(2)
  })
})
