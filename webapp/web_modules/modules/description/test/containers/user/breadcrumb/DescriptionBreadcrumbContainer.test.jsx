/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DescriptionBreadcrumbComponent from '../../../../src/components/user/breadcrumb/DescriptionBreadcrumbComponent'
import { DescriptionBreadcrumbContainer } from '../../../../src/containers/user/breadcrumb/DescriptionBreadcrumbContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

const testEntity = {
  content: {
    ipId: 'test',
    label: 'test',
    entityType: 'COLLECTION',
    tags: [],
  },
}

describe('[Description] Testing DescriptionBreadcrumbContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionBreadcrumbContainer)
  })
  it('should render no data correctly', () => {
    const props = {
      descriptionPath: [],
      dispatchEntitySelected: () => { },
    }
    const enzymeWrapper = shallow(<DescriptionBreadcrumbContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(DescriptionBreadcrumbComponent), 1, 'The corresponding component should be rendered')
  })
  it('should render correctly with data', () => {
    const props = {
      descriptionPath: [testEntity],
      dispatchEntitySelected: () => { },
    }
    const enzymeWrapper = shallow(<DescriptionBreadcrumbContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(DescriptionBreadcrumbComponent), 1, 'The corresponding component should be rendered')
  })
})
