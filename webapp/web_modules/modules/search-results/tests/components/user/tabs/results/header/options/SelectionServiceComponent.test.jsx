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
import { assert } from 'chai'
import FlatButton from 'material-ui/FlatButton'
import { DamDomain, AccessDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SelectionServiceComponent from '../../../../../../../src/components/user/tabs/results/header/options/SelectionServiceComponent'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SelectionServiceComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SelectionServiceComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectionServiceComponent)
  })
  it('should render correctly without icon and handle correctly events', () => {
    let spyServiceToRun = null
    const props = {
      onRunService: (service) => { spyServiceToRun = service },
      service: {
        content: {
          configId: '0',
          label: 'ui-service-0',
          iconUrl: null,
          applicationModes: [AccessDomain.applicationModes.ONE],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: AccessDomain.pluginTypes.UI,
        },
      },
    }
    const enzymeWrapper = shallow(<SelectionServiceComponent {...props} />, { context })
    const innerButton = enzymeWrapper.find(FlatButton)
    assert.lengthOf(innerButton, 1, 'The component should use a button to render')
    assert.equal(innerButton.props().label, props.service.content.label, 'Button label should be service label to render')
    assert.isNotOk(innerButton.props().icon, 'The button should have no icon as the service has none')
    // test events handling
    assert.equal(innerButton.props().onClick, enzymeWrapper.instance().onClick, 'The button touch tap handler should correcly link')
    // simulate a click
    enzymeWrapper.instance().onClick()
    assert.equal(spyServiceToRun, props.service, 'Run service event should be correctly propagated')
  })
  it('should render correctly with icon', () => {
    const props = {
      onRunService: () => { },
      service: {
        content: {
          configId: '0',
          label: 'ui-service-0',
          iconUrl: 'http://action-man.org/after-work/beer.png',
          applicationModes: [AccessDomain.applicationModes.ONE],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: AccessDomain.pluginTypes.UI,
        },
      },
    }
    const enzymeWrapper = shallow(<SelectionServiceComponent {...props} />, { context })
    const innerButton = enzymeWrapper.find(FlatButton)
    assert.lengthOf(innerButton, 1, 'The component should use a button to render')
    assert.equal(innerButton.props().label, props.service.content.label, 'Button label should be service label to render')
    assert.isOk(innerButton.props().icon, 'The button should have an icon as the service has one')
  })
})
