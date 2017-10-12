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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import TableViewOptionsCellComponent from '../../../../../src/components/user/results/cells/TableViewOptionsCellComponent'
import EntityDescriptionButton from '../../../../../src/components/user/results/options/EntityDescriptionButton'
import OneElementServicesButton from '../../../../../src/components/user/results/options/OneElementServicesButton'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing TableViewOptionsCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TableViewOptionsCellComponent)
  })
  it('should render correctly with services', () => {
    const props = {
      services: [{
        content: {
          configId: 0,
          label: 'ui-service-0',
          icon: null,
          applicationModes: [AccessDomain.applicationModes.ONE],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: AccessDomain.pluginTypes.UI,
        },
      }, {
        content: {
          configId: 0,
          label: 'catalog-service-0',
          icon: 'http://my-little-poney/ponatator.gif',
          applicationModes: [AccessDomain.applicationModes.ONE],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: AccessDomain.pluginTypes.CATALOG,
        },
      }],
      servicesTooltip: 'services.tooltip',
      descriptionTooltip: 'description.tooltip',
      styles: context.moduleTheme.user.optionsStyles,
      onShowDescription: () => { },
      onServiceStarted: () => { },
    }
    const render = shallow(<TableViewOptionsCellComponent {...props} />, { context })

    const descButton = render.find(EntityDescriptionButton)
    assert.lengthOf(descButton, 1, 'There should be a button to show description')
    assert.equal(descButton.props().onShowDescription, props.onShowDescription, 'Description button should use right tooltip')
    assert.equal(descButton.props().tooltip, props.descriptionTooltip, 'Description button should use right callback')

    const servicesButton = render.find(OneElementServicesButton)
    assert.lengthOf(servicesButton, 1, 'There should be a button to show services')
    assert.equal(servicesButton.props().onServiceStarted, props.onServiceStarted, 'Services button should use right tooltip')
    assert.equal(servicesButton.props().services, props.services, 'Service button should have the list of services')
    // note: no need to test disabled state here, performed in OneElementServicesButton tests
  })
})
