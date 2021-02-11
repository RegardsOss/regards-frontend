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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import MainFormComponent from '../../src/components/admin/MainFormComponent'
import { AdminContainer } from '../../src/containers/AdminContainer'
import { FORM_SECTIONS_ENUM } from '../../src/domain/form/FormSectionsEnum'
import { FORM_PAGES_ENUM } from '../../src/domain/form/FormPagesEnum'
import { PAGES_BY_TYPE } from '../../src/domain/form/FormPagesByType'
import { configuration as dataConfiguration } from '../dumps/data.configuration.dump'
import styles from '../../src/styles'
import { attributes } from '../dumps/attributes.dump'

const context = buildTestContext(styles)

/**
 * Test AdminContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing AdminContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminContainer)
  })

  const testCases = [{
    label: 'data only (no configuration)',
    formValues: {
      ...dataConfiguration,
      viewsGroups: {
        ...dataConfiguration.viewsGroups,
        [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
          ...dataConfiguration.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATASET],
          enabled: false,
        },
      },
    },
    expectedTypeSections: [DamDomain.ENTITY_TYPES_ENUM.DATA],
  }, {
    label: 'data and dataset',
    formValues: dataConfiguration,
    expectedTypeSections: [DamDomain.ENTITY_TYPES_ENUM.DATA, DamDomain.ENTITY_TYPES_ENUM.DATASET],
  }]

  testCases.forEach(({
    label, formValues, expectedTypeSections, conf,
  }) => it(`should render correctly, with ${label}, building the corresponding tree and allowing navigation`, () => {
    const props = {
      appName: 'anyApp',
      project: 'someProject',
      type: 'any',
      adminForm: {
        conf,
        currentNamespace: 'myForm',
        isPage: true,
        form: {
          myForm: formValues,
        },
        changeField: () => {},
      },
      datasets: {},
      datasetModels: {},
      dataAttributeModels: attributes,
      datasetAttributeModels: attributes,
      fetchDatasets: () => new Promise((resolve) => resolve()),
      fetchDatasetModels: () => new Promise((resolve) => resolve()),
      fetchDataObjectAttributes: () => new Promise((resolve) => resolve()),
      fetchDataSetAttributes: () => new Promise((resolve) => resolve()),
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    // 1 - check state
    const { navigationSections, selectedSectionType, selectedPageType } = enzymeWrapper.state()
    assert.equal(selectedSectionType, FORM_SECTIONS_ENUM.MAIN, 'Selected section type should be main initially')
    assert.equal(selectedPageType, FORM_PAGES_ENUM.MAIN, 'Selected section type should be main initially')
    // there should be the following sections:
    // - MAIN with page main only
    // - RESTRICTIONS with page main only
    // - One section for each expected type
    assert.lengthOf(navigationSections, 4 + expectedTypeSections.length, 'There should be sections MAIN, FILTERS, RESTRICITONS, SEARCH plus one section by expected type')
    assert.equal(navigationSections[0].type, FORM_SECTIONS_ENUM.MAIN, 'First section should be main')
    assert.lengthOf(navigationSections[0].pages, 1, 'Main section should have only one page')
    assert.equal(navigationSections[0].pages[0].type, FORM_PAGES_ENUM.MAIN, 'Main section single page should be main page')
    assert.equal(navigationSections[1].type, FORM_SECTIONS_ENUM.FILTERS, 'Second section should be filters')
    assert.lengthOf(navigationSections[1].pages, 1, 'Filters section should have only one page')
    assert.equal(navigationSections[1].pages[0].type, FORM_PAGES_ENUM.MAIN, 'Filters section single page should be main page')
    assert.equal(navigationSections[2].type, FORM_SECTIONS_ENUM.RESTRICTIONS, 'Third section should be restrictions')
    assert.lengthOf(navigationSections[2].pages, 1, 'Restrictions section should have only one page')
    assert.equal(navigationSections[2].pages[0].type, FORM_PAGES_ENUM.MAIN, 'Restriction section single page should be main page')
    assert.equal(navigationSections[3].type, FORM_SECTIONS_ENUM.SEARCH, 'Fourth section should be search')
    assert.lengthOf(navigationSections[3].pages, 1, 'Search section should have only one page')
    assert.equal(navigationSections[3].pages[0].type, FORM_PAGES_ENUM.MAIN, 'Search section single page should be main page')

    for (let i = 4; i < navigationSections.length; i += 1) {
      const section = navigationSections[i]
      const type = expectedTypeSections[i - 4]
      const expectedPages = PAGES_BY_TYPE[type]
      assert.lengthOf(section.pages, expectedPages.length, `Section for ${type} should have length ${expectedPages.length}`)
      section.pages.forEach((page, index) => {
        assert.equal(page.type, expectedPages[index], `In section for ${type}, page ${page.type} should have been of type ${expectedPages[index]}`)
      })
    }

    // 2 - Check properties are correctly reported to component
    const componentWrapper = enzymeWrapper.find(MainFormComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      navigationSections, // from state
      selectedSectionType, // from state
      selectedPageType, // from state
      currentNamespace: 'myForm',
      currentFormValues: formValues,
      dataAttributeModels: props.dataAttributeModels,
      datasetAttributeModels: props.datasetAttributeModels,
      changeField: props.adminForm.changeField,
      onBrowseToPage: enzymeWrapper.instance().onBrowseToPage,
    }, 'Component should define the expected properties')

    navigationSections.forEach((section) => {
      section.pages.forEach((page) => {
        enzymeWrapper.instance().onBrowseToPage(section, page)
        assert.equal(enzymeWrapper.state().selectedSectionType, section.type)
        assert.equal(enzymeWrapper.state().selectedPageType, page.type)
      })
    })
  }))
  it('Should update correctly navigation tree on form values change', () => {
    const props = {
      appName: 'anyApp',
      project: 'someProject',
      type: 'any',
      adminForm: {
        currentNamespace: 'myForm',
        isPage: true,
        form: {
          myForm: dataConfiguration,
        },
        changeField: () => {},
      },
      datasets: {},
      datasetModels: {},
      dataAttributeModels: attributes,
      datasetAttributeModels: attributes,
      fetchDatasets: () => new Promise((resolve) => resolve()),
      fetchDatasetModels: () => new Promise((resolve) => resolve()),
      fetchDataObjectAttributes: () => new Promise((resolve) => resolve()),
      fetchDataSetAttributes: () => new Promise((resolve) => resolve()),
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    // 1 - check there are currently the main, data and dataset sections
    const { navigationSections } = enzymeWrapper.state()
    assert.lengthOf(navigationSections, 6, 'There should be 6 sections')
    assert.equal(navigationSections[0].type, FORM_SECTIONS_ENUM.MAIN, 'First section should be main')
    assert.equal(navigationSections[1].type, FORM_SECTIONS_ENUM.FILTERS, 'Second section should be filters')
    assert.equal(navigationSections[2].type, FORM_SECTIONS_ENUM.RESTRICTIONS, 'Thrid section should be restrictions')
    assert.equal(navigationSections[3].type, FORM_SECTIONS_ENUM.SEARCH, 'Fourth section should be search')
    assert.equal(navigationSections[4].type, DamDomain.ENTITY_TYPES_ENUM.DATA, 'Fifth section should be data')
    assert.equal(navigationSections[5].type, DamDomain.ENTITY_TYPES_ENUM.DATASET, 'Sixth section should be dataset')
    // 2 - Change to data only and check sections list do no longer contain dataset
    enzymeWrapper.setProps(UIDomain.ResultsContextHelper.deepMerge(props, {
      adminForm: {
        form: {
          myForm: {
            viewsGroups: {
              DATASET: {
                enabled: false, // disable that view type
              },
            },
          },
        },
      },
    }))
    const { navigationSections: updatedSections } = enzymeWrapper.state()
    assert.lengthOf(updatedSections, 5, 'There should be 5 sections after update')
    assert.equal(updatedSections[0].type, FORM_SECTIONS_ENUM.MAIN, 'First section should be main')
    assert.equal(updatedSections[1].type, FORM_SECTIONS_ENUM.FILTERS, 'Second section should be filters')
    assert.equal(updatedSections[2].type, FORM_SECTIONS_ENUM.RESTRICTIONS, 'Third section should be restrictions')
    assert.equal(navigationSections[3].type, FORM_SECTIONS_ENUM.SEARCH, 'Fourth section should be search')
    assert.equal(navigationSections[4].type, DamDomain.ENTITY_TYPES_ENUM.DATA, 'Fifth section should be data')
  })
  it('Should hide restrictions when configured by a parent module', () => {
    const props = {
      appName: 'anyApp',
      project: 'someProject',
      type: 'any',
      adminForm: {
        isPage: true,
        currentNamespace: 'myForm',
        conf: {
          forbidRestrictions: true,
        },
        form: {
          myForm: dataConfiguration,
        },
        changeField: () => {},
      },
      datasets: {},
      datasetModels: {},
      dataAttributeModels: attributes,
      datasetAttributeModels: attributes,
      fetchDatasets: () => new Promise((resolve) => resolve()),
      fetchDatasetModels: () => new Promise((resolve) => resolve()),
      fetchDataObjectAttributes: () => new Promise((resolve) => resolve()),
      fetchDataSetAttributes: () => new Promise((resolve) => resolve()),
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    // 1 - check there are currently the main, data and dataset sections
    const { navigationSections } = enzymeWrapper.state()
    assert.isFalse(navigationSections.some((section) => section.type === FORM_SECTIONS_ENUM.RESTRICTIONS), 'Restriction section should be hidden')
  })
})
