import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import PluginConfigurationFormComponent from '../../src/components/PluginConfigurationFormComponent'

describe('[ADMIN PROJECT MANAGEMENT] Testing plugin configuration form component', () => {
  it('should exists', () => {
    assert.isDefined(PluginConfigurationFormComponent)
    assert.isDefined(Field)
  })

  it('should render sub-components', () => {
    const props = {
      pluginConfiguration: {
        content: {
          id: '2',
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
      submitting: () => {},
      pristine: () => {},
      invalid: () => {},
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<PluginConfigurationFormComponent {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(5)
  })
})
