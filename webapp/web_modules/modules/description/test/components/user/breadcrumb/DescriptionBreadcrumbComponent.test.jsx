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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Breadcrumb } from '@regardsoss/components'
import { DamDomain } from '@regardsoss/domain'
import DescriptionBreadcrumbComponent from '../../../../src/components/user/breadcrumb/DescriptionBreadcrumbComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

const testEntity = {
  content: {
    id: 'URN:helloooooooooooooo Nanny!',
    providerId: 'Provider1',
    label: 'Hello, dear nanny',
    entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
    model: '1',
    tags: [],
  },
}

describe('[Description] Testing DescriptionBreadcrumbComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionBreadcrumbComponent)
  })
  it('should render correctly empty', () => {
    const props = {
      // all entities in current description path
      descriptionPath: [],
      onEntitySelected: PropTypes.func.isRequired, // on breadcrumb entity selected (entity, index) => void
    }
    shallow(<DescriptionBreadcrumbComponent {...props} />, { context })
  })
  it('should render correctly with elements', () => {
    const props = {
      // all entities in current description path
      descriptionPath: [testEntity],
      onEntitySelected: PropTypes.func.isRequired, // on breadcrumb entity selected (entity, index) => void
    }
    const wrapper = shallow(<DescriptionBreadcrumbComponent {...props} />, { context })
    const breadcrumbnWrappers = wrapper.find(Breadcrumb)
    assert.lengthOf(breadcrumbnWrappers, 1, 'The component should use a breadcrumb to render sub elements')
  })
})
