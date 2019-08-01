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
import { Tab } from 'material-ui/Tabs'
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AdminFormComponent from '../../../src/components/admin/AdminFormComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AdminFormComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing AdminFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminFormComponent)
  })
  it('should render correctly', () => {
    const props = {
      currentNamespace: 'test',
      changeField: () => { },
      isCreating: true,

      collectionAttributeModels: {},
      dataAttributeModels: {},
      datasetAttributeModels: {},
    }
    const enzymeWrapper = shallow(<AdminFormComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.allowTagSearch'), 1, 'There should be allow search tag field for current namespace')

    // check there is one tab by entity type
    const tabsWrapper = enzymeWrapper.find(Tab)
    const typesToConfigure = [
      DamDomain.ENTITY_TYPES_ENUM.DATA,
      DamDomain.ENTITY_TYPES_ENUM.DATASET,
      DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
      // TODO probably add back here the document pseudo type, based on model
    ]
    typesToConfigure.forEach((entityType) => {
      const entityTabWrapper = tabsWrapper.findWhere(n => n.props().entityType === entityType)
      assert.lengthOf(entityTabWrapper, 1, `There should be a tab for ${entityType} type`)
      testSuiteHelpers.assertWrapperProperties(entityTabWrapper, {
        isCreating: props.isCreating,
        changeField: props.changeField,
        currentNamespace: props.currentNamespace,
        availableAttributes: enzymeWrapper.instance().getAvailableAttributes(entityType),
      }, `Tab properties should be correctly reported for ${entityType} type tab`)
    })
  })
})
