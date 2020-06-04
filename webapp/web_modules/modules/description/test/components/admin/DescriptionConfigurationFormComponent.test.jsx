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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DescriptionConfigurationFormComponent from '../../../src/components/admin/DescriptionConfigurationFormComponent'
import GroupsFieldComponent from '../../../src/components/admin/GroupsFieldComponent'
import { fullModuleConf } from '../../dumps/configuration.dump'
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
  it('Should not render when form values are not initialized', () => {
    const props = {
      entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      currentTypeValues: null,
      isCreating: false,
      changeField: () => { },
      currentNamespace: 'test',
      availableAttributes: {},
    }
    const enzymeWrapper = shallow(<DescriptionConfigurationFormComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.children(), 0, 'There should be no child (hidden)')
  })
  it('should render correctly with form values', () => {
    const props = {
      entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      currentTypeValues: fullModuleConf[DamDomain.ENTITY_TYPES_ENUM.DATA],
      isCreating: false,
      changeField: () => { },
      currentNamespace: 'test',
      availableAttributes: {},
    }
    const enzymeWrapper = shallow(<DescriptionConfigurationFormComponent {...props} />, { context })
    assert.isTrue(enzymeWrapper.children().length > 0, 'There should be children (shown)')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATA.showDescription'), 1, 'there should be the showDescription field')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATA.hideEmptyAttributes'), 1, 'There should be hide empty attributes field for current namespace')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATA.showTags'), 1, 'there should be the showTags field')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATA.showCoupling'), 1, 'there should be the showCoupling field')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATA.showLinkedDocuments'), 1, 'there should be the showLinkedDocuments field')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATA.showLinkedEntities'), 1, 'there should be the showLinkedEntities field')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === 'test.DATA.showThumbnail'), 1, 'there should be the showThumbnail field')

    const groupsField = enzymeWrapper.findWhere(n => n.props().name === 'test.DATA.groups')
    assert.lengthOf(groupsField, 1, 'There should be groups field array')
    testSuiteHelpers.assertWrapperProperties(groupsField, {
      component: GroupsFieldComponent,
      availableAttributes: props.availableAttributes,
      validate: enzymeWrapper.instance().validateGroups,
    }, 'Groups field array properties should be correctly reported')

    const urlDescFilesField = enzymeWrapper.find(AttributesListConfigurationComponent)
    assert.lengthOf(urlDescFilesField, 1, 'There should be url attributes to description file field')
    testSuiteHelpers.assertWrapperProperties(urlDescFilesField, {
      selectableAttributes: props.availableAttributes,
      attributesFilter: DescriptionConfigurationFormComponent.filterURLAttributes,
      attributesList: props.currentTypeValues.attributeToDescriptionFiles,
      attributesListFieldName: 'test.DATA.attributeToDescriptionFiles',
      hintMessageKey: 'module.description.configuration.description.files.hint',
      changeField: props.changeField,
    }, 'URL attributes to description file field properties should be correctly reported')
  })
  it('should initialize form values when creating', () => {
    let spiedCalledCount = 0
    const props = {
      entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
      currentTypeValues: null,
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
  it('should leave form unchanged when entering edition', () => {
    let spiedCalledCount = 0
    const props = {
      entityType: UIDomain.PSEUDO_TYPES_ENUM.DOCUMENT,
      currentTypeValues: fullModuleConf[DamDomain.ENTITY_TYPES_ENUM.DOCUMENT],
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
