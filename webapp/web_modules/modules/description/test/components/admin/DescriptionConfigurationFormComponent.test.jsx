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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain } from '@regardsoss/domain'
import { FieldArray } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DescriptionConfigurationFormComponent from '../../../src/components/admin/DescriptionConfigurationFormComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DescriptionConfigurationFormComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing DescriptionConfigurationFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionConfigurationFormComponent)
  })
  it('should render correctly', () => {
    const props = {
      entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      isCreating: false,
      changeField: () => { },
      currentNamespace: 'test',
      availableAttributes: {},
    }
    const enzymeWrapper = shallow(<DescriptionConfigurationFormComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATASET.showDescription'), 1, 'there should be the showDescription field')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATASET.showTags'), 1, 'there should be the showTags field')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATASET.showLinkedDocuments'), 1, 'there should be the showLinkedDocuments field')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATASET.showThumbnail'), 1, 'there should be the showThumbnail field')

    const fieldArrayWrapper = enzymeWrapper.find(FieldArray)
    assert.lengthOf(fieldArrayWrapper, 1, 'There should be the field array for groups')
    assert.equal(fieldArrayWrapper.props().name, 'test.DATASET.groups', 'Groups form field name should be correctly computed')
  })
  it('should initialize form values when creating', () => {
    let spiedCalledCount = 0
    const props = {
      entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
      isCreating: true,
      changeField: () => {
        spiedCalledCount += 1
      },
      currentNamespace: 'test',
      availableAttributes: {},
    }
    shallow(<DescriptionConfigurationFormComponent {...props} />, { context })
    assert.equal(spiedCalledCount, 1, 'The component should initialize values for new modules')
  })
  it('should leave form unchanged when editing', () => {
    let spiedCalledCount = 0
    const props = {
      entityType: DamDomain.ENTITY_TYPES_ENUM.DOCUMENT, // TODO very wrong now
      isCreating: false,
      changeField: () => {
        spiedCalledCount += 1
      },
      currentNamespace: 'test',
      availableAttributes: {},
    }
    shallow(<DescriptionConfigurationFormComponent {...props} />, { context })
    assert.equal(spiedCalledCount, 0, 'The component should leave values unchanges for edited modules')
  })
})
