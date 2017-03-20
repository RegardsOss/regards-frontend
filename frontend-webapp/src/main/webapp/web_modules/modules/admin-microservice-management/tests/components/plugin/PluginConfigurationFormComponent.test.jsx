/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { Card } from 'material-ui/Card'
import { IntlStub } from '@regardsoss/tests-helpers'
import { PluginConfigurationFormComponent } from '../../../src/components/plugin/PluginConfigurationFormComponent'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin configuration form component', () => {
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(PluginConfigurationFormComponent)
    assert.isDefined(Card)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('should render sub-components', () => {
    const props = {
      pluginConfiguration: {
        content: {
          id: 2,
          label: 'Random configuration',
          version: '0.0.1',
          priorityOrder: 1,
          active: false,
          pluginClassName: 'Kerberos',
        },
      },
      pluginMetaData: {
        content: {
          id: 0,
          pluginType: 'Authentication',
          pluginClassName: 'Kerberos',
          author: 'Jules Verne',
          version: '0.0.5',
          description: 'Allows the users to log in with their usual email and password.',
        },
      },
      onSubmit: () => {},
      backUrl: 'back/url',
      formMode: 'create',
      // from reduxForm
      submitting: false,
      pristine: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }
    const enzymeWrapper = shallow(<PluginConfigurationFormComponent {...props} />, { context })
    const subComponent = enzymeWrapper.find(Card)
    expect(subComponent).to.have.length(2)
  })
})
