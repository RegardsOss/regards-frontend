/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AdminFormComponent from '../../../src/components/admin/AdminFormComponent'
import styles from '../../../src/styles'
import { fullModuleConf } from '../../dumps/configuration.dump'

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
  const testCases = [{
    editionMode: 'creating',
    isCreating: true,
    currentFormValues: {},
  }, {
    editionMode: 'editing',
    isCreating: false,
    currentFormValues: fullModuleConf,
  }]
  testCases.forEach(({ editionMode, isCreating, currentFormValues }) => it(`should render correctly ${editionMode}`, () => {
    const props = {
      currentNamespace: 'test',
      currentFormValues,
      changeField: () => { },
      isCreating,

      collectionAttributeModels: {},
      dataAttributeModels: {},
      datasetAttributeModels: {},
      documentAttributeModels: {},
    }
    const enzymeWrapper = shallow(<AdminFormComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === 'test.allowSearching'), 1, 'There should be allow search tag field for current namespace')

    // check there is one tab by entity type
    const tabsWrapper = enzymeWrapper.find(Tab)
    UIDomain.PSEUDO_TYPES.forEach((entityType) => {
      const entityTabWrapper = tabsWrapper.findWhere((n) => n.props().entityType === entityType)
      assert.lengthOf(entityTabWrapper, 1, `There should be a tab for ${entityType} type`)
      testSuiteHelpers.assertWrapperProperties(entityTabWrapper, {
        entityType,
        currentTypeValues: props.currentFormValues[entityType],
        isCreating: props.isCreating,
        changeField: props.changeField,
        currentNamespace: props.currentNamespace,
        availableAttributes: enzymeWrapper.instance().getAvailableAttributes(entityType),
      }, `Tab properties should be correctly reported for ${entityType} type tab`)
    })
  }))
})
