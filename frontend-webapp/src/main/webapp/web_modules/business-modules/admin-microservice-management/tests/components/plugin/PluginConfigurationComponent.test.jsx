/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { Card } from 'material-ui/Card'
import { PluginConfigurationComponent } from '../../../src/components/plugin/PluginConfigurationComponent'
import styles from '../../../src/styles'

const options = {
  context: buildTestContext(styles),
}

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin configuration component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginConfigurationComponent)
    assert.isDefined(Card)
  })

  it('should render sub-components', () => {
    const props = {
      microserviceName: 'rs-test',
      pluginConfiguration: DumpProvider.getFirstEntity('CommonClient', 'PluginConfiguration'),
      pluginMetaData: DumpProvider.getFirstEntity('CommonClient', 'PluginMetaData'),
      onActiveToggle: () => { },
      onCopyClick: () => { },
      onDeleteClick: () => { },
      onEditClick: () => { },
      onDownwardClick: () => { },
      onUpwardClick: () => { },
    }
    const enzymeWrapper = shallow(<PluginConfigurationComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Card)
    expect(subComponent).to.have.length(1)
  })
})
