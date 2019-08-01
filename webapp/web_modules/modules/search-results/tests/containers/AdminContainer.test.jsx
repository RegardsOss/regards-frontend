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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
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
    label: 'data and dataset (no configuration)',
    formValues: dataConfiguration,
    expectedTypeSections: [DamDomain.ENTITY_TYPES_ENUM.DATA, DamDomain.ENTITY_TYPES_ENUM.DATASET],
  }, {
    label: 'data and dataset (with configuration)',
    formValues: dataConfiguration,
    expectedTypeSections: [DamDomain.ENTITY_TYPES_ENUM.DATA, DamDomain.ENTITY_TYPES_ENUM.DATASET],
    conf: {
      selectableDataObjectsAttributes: {
        ...attributes,
        3: {
          content: {
            id: 3,
            name: 'someDataAttr3',
            label: 'Some data attribute 3',
            jsonPath: 'frag3.someDataAttr3',
            description: 'The data attribute 3',
            type: 'STRING',
            fragment: {
              id: 3,
              name: 'some.frag',
              description: 'some.frag',
            },
            queryable: true,
            facetable: true,
            alterable: true,
            optional: true,
          },
        },
      },
      selectableDataSetsAttributes: {
        ...attributes,
        4: {
          content: {
            id: 4,
            name: 'someDatasetAttr4',
            label: 'Some dataset attribute 4',
            jsonPath: 'frag4.someDatasetAttr4',
            description: 'The dataset attribute 4',
            type: 'STRING',
            fragment: {
              id: 4,
              name: 'some.frag',
              description: 'some.frag',
            },
            queryable: true,
            facetable: true,
            alterable: true,
            optional: true,
          },
        },
      },
    },
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
        form: {
          myForm: formValues,
        },
        changeField: () => {},
      },
      dataAttributeModels: attributes,
      datasetAttributeModels: attributes,
      fetchAllDataAttributes: () => new Promise(resolve => resolve()),
      fetchAllDatasetModelsAttributes: () => new Promise(resolve => resolve()),
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    // 1 - check state is as expected
    const { navigationSections, selectedSectionType, selectedPageType } = enzymeWrapper.state()
    assert.equal(selectedSectionType, FORM_SECTIONS_ENUM.MAIN, 'Selected section type should be main initially')
    assert.equal(selectedPageType, FORM_PAGES_ENUM.MAIN, 'Selected section type should be main initially')
    // there should be the following sections:
    // - MAIN with page main only
    // - One section for each expected type
    assert.lengthOf(navigationSections, 1 + expectedTypeSections.length, 'There should be sections MAIN plus one section by expected type')
    assert.equal(navigationSections[0].type, FORM_SECTIONS_ENUM.MAIN, 'First section should be main')
    assert.lengthOf(navigationSections[0].pages, 1, 'Main section should have only one page')
    assert.equal(navigationSections[0].pages[0].type, FORM_PAGES_ENUM.MAIN, 'Main section single page should be main page')
    for (let i = 1; i < navigationSections.length; i += 1) {
      const section = navigationSections[i]
      const type = expectedTypeSections[i - 1]
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
      dataAttributeModels: conf ? conf.selectableDataObjectsAttributes : props.dataAttributeModels,
      datasetAttributeModels: conf ? conf.selectableDataSetsAttributes : props.datasetAttributeModels,
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
        form: {
          myForm: dataConfiguration,
        },
        changeField: () => {},
      },
      dataAttributeModels: attributes,
      datasetAttributeModels: attributes,
      fetchAllDataAttributes: () => new Promise(resolve => resolve()),
      fetchAllDatasetModelsAttributes: () => new Promise(resolve => resolve()),
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    // 1 - check state there are currently the main, data and dataset sections
    let { navigationSections } = enzymeWrapper.state()
    assert.lengthOf(navigationSections, 3, 'There should be 3 sections')
    assert.equal(navigationSections[0].type, FORM_SECTIONS_ENUM.MAIN, 'First section should be main')
    assert.equal(navigationSections[1].type, DamDomain.ENTITY_TYPES_ENUM.DATA, 'Second section should be data')
    assert.equal(navigationSections[2].type, DamDomain.ENTITY_TYPES_ENUM.DATASET, 'Third section should be dataset')
    // 2 - set in document view enabled mode
    // TODO restore for data only (no longer document)
    // enzymeWrapper.setProps({
    //   ...props,
    //   adminForm: {
    //     currentNamespace: 'myForm',
    //     form: {
    //       myForm: documentsConfiguration,
    //     },
    //     changeField: () => {},
    //   },
    // })
    // navigationSections = enzymeWrapper.state().navigationSections
    // assert.lengthOf(navigationSections, 2, 'There should be 2 sections, after update')
    // assert.equal(navigationSections[0].type, FORM_SECTIONS_ENUM.MAIN, 'First section should be main, after update')
    // assert.equal(navigationSections[1].type, DamDomain.ENTITY_TYPES_ENUM.DOCUMENT, 'Second section should be document, after update')
  })
})
