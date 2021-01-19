/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Card } from 'material-ui/Card'
import { PluginFormComponent } from '../../src/components/PluginFormComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)
/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing plugin configuration form component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginFormComponent)
    assert.isDefined(Card)
  })

  it('should render sub-components', () => {
    const props = {
      microserviceName: STATIC_CONF.MSERVICES.DAM,
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
        id: 0,
        pluginId: 'plugin',
        pluginType: 'Authentication',
        pluginClassName: 'Kerberos',
        author: 'Jules Verne',
        version: '0.0.5',
        description: 'Allows the users to log in with their usual email and password.',
      },
      onSubmit: () => { },
      backUrl: 'back/url',
      formMode: 'create',
      // from reduxForm
      submitting: false,
      pristine: false,
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
      change: () => { },
    }
    const enzymeWrapper = shallow(<PluginFormComponent {...props} />, { context })
    const subComponent = enzymeWrapper.find(Card)
    expect(subComponent).to.have.length(1)
  })
})
