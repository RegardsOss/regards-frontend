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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MainFormComponent from '../../../src/components/admin/MainFormComponent'
import styles from '../../../src/styles'
import { FORM_SECTIONS_ENUM } from '../../../src/domain/form/FormSectionsEnum'
import { FORM_PAGES_ENUM, FORM_PAGES } from '../../../src/domain/form/FormPagesEnum'
import { AdminContainer } from '../../../src/containers/AdminContainer'
import BrowsingTree from '../../../src/components/admin/tree/BrowsingTreeComponent'
import MainConfigurationComponent from '../../../src/components/admin/content/MainConfigurationComponent'
import EntityTypeConfigurationComponent from '../../../src/components/admin/content/EntityTypeConfigurationComponent'
import FiltersConfigurationComponent from '../../../src/components/admin/content/FiltersConfigurationComponent'
import SortingConfigurationComponent from '../../../src/components/admin/content/SortingConfigurationComponent'
import ViewTypeConfigurationComponent from '../../../src/components/admin/content/ViewTypeConfigurationComponent'
import { attributes } from '../../dumps/attributes.dump'
import { configuration as dataConfiguration } from '../../dumps/data.configuration.dump'

const context = buildTestContext(styles)

/**
 * Test MainFormComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing MainFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainFormComponent)
  })

  const testCases = [{
    label: 'data',
    viewsGroups: [{
      type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      enabled: true,
    }, {
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      enabled: false,
    }],
    values: dataConfiguration,
  }, {
    label: 'data and datasets',
    viewsGroups: [{
      type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      enabled: true,
    }, {
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      enabled: true,
    }],
    values: dataConfiguration,
  }]

  testCases.forEach(({
    label, viewsGroups, values,
  }) => it(`should render correctly for ${label}`, () => {
    const props = {
      // we use here AdminContainer converter, which is tested in its own file
      navigationSections: AdminContainer.buildNavigationTree(viewsGroups).navigationSections,
      selectedSectionType: FORM_SECTIONS_ENUM.MAIN,
      selectedPageType: FORM_PAGES_ENUM.MAIN,
      currentNamespace: 'any',
      currentFormValues: values,
      dataAttributeModels: attributes,
      datasetAttributeModels: attributes,
      changeField: () => {},
      onBrowseToPage: () => {},
    }
    const enzymeWrapper = shallow(<MainFormComponent {...props} />, { context })
    const tree = enzymeWrapper.find(BrowsingTree)
    assert.lengthOf(tree, 1, 'There should be the browsing tree')
    testSuiteHelpers.assertWrapperProperties(tree, {
      navigationSections: props.navigationSections,
      onBrowseToPage: props.onBrowseToPage,
    }, 'Tree properties should be correctly set')
    // swap sections and mode and check the right form component is visible
    // 1 - Main section, already selected
    const mainConfigurationForm = enzymeWrapper.find(MainConfigurationComponent)
    assert.lengthOf(mainConfigurationForm, 1, 'Main configuration component should be currently displayed')
    // 2 - Sections by type, for each enabled type
    viewsGroups.forEach(({ type, enabled }) => {
      if (enabled) {
        // Iterate over page types (we do not care here if it is allowed or not for a given type, as all types should behave the same way)
        FORM_PAGES.forEach((pageType) => {
          enzymeWrapper.setProps({ ...props, selectedSectionType: type, selectedPageType: pageType })
          let expectedComponent = null
          switch (pageType) {
            case FORM_PAGES_ENUM.MAIN:
              expectedComponent = EntityTypeConfigurationComponent
              break
            case FORM_PAGES_ENUM.FILTERS:
              expectedComponent = FiltersConfigurationComponent
              break
            case FORM_PAGES_ENUM.SORTING:
              expectedComponent = SortingConfigurationComponent
              break
            case FORM_PAGES_ENUM.LIST_AND_TABLE:
            case FORM_PAGES_ENUM.QUICKLOOKS:
            case FORM_PAGES_ENUM.MAP:
            default:
              expectedComponent = ViewTypeConfigurationComponent
          }
          assert.lengthOf(enzymeWrapper.find(expectedComponent), 1, 'Form component should be displayed when corresponding page is selected')
        })
      }
    })
  }))
})
