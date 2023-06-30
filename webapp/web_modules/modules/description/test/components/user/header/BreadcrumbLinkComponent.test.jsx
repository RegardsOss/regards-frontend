/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LabelVersionText } from '@regardsoss/attributes-common'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import BreadcrumbLinkComponent from '../../../../src/components/user/header/BreadcrumbLinkComponent'
import styles from '../../../../src/styles'
import { resolvedDataEntity, resolvedDatasetEntity } from '../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test BreadcrumbLinkComponent
 * @author Raphaël Mechali
 */
describe('[ Module name] Testing BreadcrumbLinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BreadcrumbLinkComponent)
  })
  it('should render correctly a selected data entity', () => {
    const spyOnSelectEntityIndex = {}
    const props = {
      settings: {
        showVersion: true,
        documentModels: [],
        primaryQuicklookGroup: 'primary',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      descriptionEntity: resolvedDataEntity,
      entityIndex: 25,
      selected: true,
      onSelectEntityIndex: (index) => {
        spyOnSelectEntityIndex.index = index
      },
    }
    const enzymeWrapper = shallow(<BreadcrumbLinkComponent {...props} />, { context })
    // 1 - check label is displayed as text and tooltip
    const label = LabelVersionText.formatLabel(context.intl.formatMessage, props.descriptionEntity.entityWithTreeEntry.entity, props.settings)
    assert.include(enzymeWrapper.debug(), label, 'Entity label should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().title === label), 1, 'Entity label should also be shown as tooltip')
    // 2 - check callback setup and used
    const callbackHolder = enzymeWrapper.findWhere((n) => n.props().onClick === enzymeWrapper.instance().onClick)
    assert.lengthOf(callbackHolder, 1, 'There should be an element providing selection callback on click')
    assert.isNotOk(spyOnSelectEntityIndex.index, 'Callback should not have been invoked yet')
    callbackHolder.props().onClick()
    assert.equal(spyOnSelectEntityIndex.index, props.entityIndex, 'Callback should been invoked')
  })
  it('should render correctly an unselected dataset entity', () => {
    const spyOnSelectEntityIndex = {}
    const props = {
      settings: {
        showVersion: false,
        documentModels: [],
        primaryQuicklookGroup: 'primary',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      descriptionEntity: resolvedDatasetEntity,
      entityIndex: 18,
      selected: false,
      onSelectEntityIndex: (index) => {
        spyOnSelectEntityIndex.index = index
      },
    }
    const enzymeWrapper = shallow(<BreadcrumbLinkComponent {...props} />, { context })
    // 1 - check label is displayed as text and tooltip
    const label = LabelVersionText.formatLabel(context.intl.formatMessage, props.descriptionEntity.entityWithTreeEntry.entity, props.settings)
    assert.include(enzymeWrapper.debug(), label, 'Entity label should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().title === label), 1, 'Entity label should also be shown as tooltip')
    // 2 - check callback setup and used
    const callbackHolder = enzymeWrapper.findWhere((n) => n.props().onClick === enzymeWrapper.instance().onClick)
    assert.lengthOf(callbackHolder, 1, 'There should be an element providing selection callback on click')
    assert.isNotOk(spyOnSelectEntityIndex.index, 'Callback should not have been invoked yet')
    callbackHolder.props().onClick()
    assert.equal(spyOnSelectEntityIndex.index, props.entityIndex, 'Callback should been invoked')
  })
})
