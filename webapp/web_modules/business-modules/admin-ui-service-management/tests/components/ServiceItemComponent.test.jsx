/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CardTitle } from 'material-ui/Card'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import ServiceItemComponent, { ResourceIconAction } from '../../src/components/ServiceItemComponent'
import { uiPluginConfigurationActions } from '../../src/clients/UIPluginConfigurationClient'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ServiceItemComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceItemComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceItemComponent)
  })
  it('should render correctly', () => {
    const props = {
      uiPluginDefinition: DumpProvider.getFirstEntity('AccessProjectClient', 'UIPluginDefinition'),
      onOpen: () => {},
      onCreate: () => {},
    }
    const enzymeWrapper = shallow(<ServiceItemComponent {...props} />, { context })
    // Check title
    const cardTitle = enzymeWrapper.find(CardTitle)
    assert.lengthOf(cardTitle, 1, 'There should be title')
    assert.equal(cardTitle.props().title, props.uiPluginDefinition.content.name, 'Title should be correctly set')

    const actions = enzymeWrapper.find(ResourceIconAction)

    // Check actions
    assert.lengthOf(actions, 2, 'There should be open and create actions')
    testSuiteHelpers.assertWrapperProperties(actions.at(0), {
      resourceDependencies: uiPluginConfigurationActions.getDependency(RequestVerbEnum.GET_LIST),
      tooltip: 'service.list.open.tooltip',
      onClick: enzymeWrapper.instance().onOpen,
    }, 'Open action should be correctly set')

    testSuiteHelpers.assertWrapperProperties(actions.at(1), {
      resourceDependencies: uiPluginConfigurationActions.getDependency(RequestVerbEnum.POST),
      tooltip: 'service.list.create.tooltip',
      onClick: enzymeWrapper.instance().onCreate,
    }, 'Create action should be correctly set')
  })
})
