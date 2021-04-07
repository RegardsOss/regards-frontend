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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import BreadcrumbComponent from '../../../../src/components/user/header/BreadcrumbComponent'
import styles from '../../../../src/styles'
import { resolvedDataEntity, resolvedDatasetEntity } from '../../../dumps/resolved.dump'
import BreadcrumbLinkComponent from '../../../../src/components/user/header/BreadcrumbLinkComponent'

const context = buildTestContext(styles)

/**
 * Test BreadcrumbComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing BreadcrumbComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BreadcrumbComponent)
  })
  it('should render correctly', () => {
    const props = {
      settings: {
        showVersion: true,
        documentModels: [],
        primaryQuicklookGroup: 'primary',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      selectedEntityIndex: 0,
      descriptionPath: [resolvedDataEntity, resolvedDatasetEntity],
      onSelectEntityIndex: () => {},
    }
    const enzymeWrapper = shallow(<BreadcrumbComponent {...props} />, { context })
    const breadcrumbLinks = enzymeWrapper.find(BreadcrumbLinkComponent)
    assert.lengthOf(breadcrumbLinks, props.descriptionPath.length, 'There should be one link for each description path entity')
    props.descriptionPath.forEach((descriptionEntity, index) => {
      const entityLink = breadcrumbLinks.findWhere((n) => n.props().descriptionEntity === descriptionEntity)
      assert.lengthOf(entityLink, 1, `There should be ${descriptionEntity.entityWithTreeEntry.entity.content.label} link`)
      testSuiteHelpers.assertWrapperProperties(entityLink, {
        settings: props.settings,
        descriptionEntity,
        entityIndex: index,
        selected: index === props.selectedEntityIndex,
        onSelectEntityIndex: props.onSelectEntityIndex,
      }, `${descriptionEntity.entityWithTreeEntry.entity.content.label} link properties should be correctly set`)
    })
  })
})
