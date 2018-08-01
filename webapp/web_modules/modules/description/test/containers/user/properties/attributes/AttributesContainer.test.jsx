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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { StringValueRender } from '@regardsoss/components'
import AttributesComponent from '../../../../../src/components/user/properties/attributes/AttributesComponent'
import { AttributesContainer } from '../../../../../src/containers/user/properties/attributes/AttributesContainer'
import styles from '../../../../../src/styles/styles'

import { fullModuleConf } from '../../../../dumps/configuration.dump'

const context = buildTestContext(styles)

describe('[Description] Testing AttributesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributesContainer)
  })
  it('should render no data correctly', () => {
    const props = {
      // eslint-disable-next-line react/no-unused-prop-types
      entity: null,
      loading: false,
      typeConfiguration: fullModuleConf[DamDomain.ENTITY_TYPES_ENUM.DATA],
      modelAttributes: {},
      fetchEntityModelAttributes: () => { },
    }


    const enzymeWrapper = shallow(<AttributesContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AttributesComponent)
    assert.lengthOf(componentWrapper, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: false,
      attributeGroups: [],
      thumbnailURL: null,
    }, 'No data properties should be correctly reported')
  })
  it('should render loading correctly', () => {
    const props = {
      // eslint-disable-next-line react/no-unused-prop-types
      entity: null,
      loading: true,
      typeConfiguration: fullModuleConf[DamDomain.ENTITY_TYPES_ENUM.DATA],
      modelAttributes: {},
      fetchEntityModelAttributes: () => { },
    }


    const enzymeWrapper = shallow(<AttributesContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AttributesComponent)
    assert.lengthOf(componentWrapper, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: true,
      attributeGroups: [],
      thumbnailURL: null,
    }, 'Loading properties should be correctly reported')
  })
  it('should fetch attributes', () => {
    const fetchCount = {
      attributes: 0,
    }
    const props = {
      loading: true,
      typeConfiguration: fullModuleConf[DamDomain.ENTITY_TYPES_ENUM.DATA],
      modelAttributes: {},
      fetchEntityModelAttributes: () => { fetchCount.attributes += 1 },
      entity: {
        content: {
          entityType: 'DATA',
          id: 'URN:AIP:DATA:0',
          label: 'ça',
          model: { name: 'NEW_MODEL' },
          descriptionFile: { type: 'text/markdown' },
          tags: [],
        },
      },
    }

    shallow(<AttributesContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(fetchCount.attributes, 1, 'Attributes should have been fetched for entity')
  })
  it('should convert correctly attribute models and thumbnail when receiving them (after fetch)', () => {
    const props = {
      loading: false,
      entity: {
        content: {
          entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
          model: { name: 'MODEL_1' },
          files: { // provide a thumbnail for test
            [CommonDomain.DataTypesEnum.THUMBNAIL]: [{
              uri: 'test:thumnail.png',
            }],
          },
          test: {
            attr1: 'myAttr1Value',
            attr2: 'myAttr2Value',
          },
          // standard attributes
          id: 'urn:child',
          providerId: 'Provider1',
          label: 'thelabel',
          properties: {
            aproperty: 'entityPropertyValue',
          },
          tags: [],
        },
      },
      modelAttributes: {
        0: {
          content: {
            model: {
              id: 0,
              name: 'MODEL_1',
              type: 'DATA',
              description: 'IDK',
            },
            id: 0,
            mode: 'idc',
            attribute: {
              id: 0,
              name: 'TestAttribut2',
              label: 'A Test attribute (2)',
              jsonPath: 'test.attr2',
              type: 'STRING',
              fragment: { id: 0, name: 'DEFAULT' },
              unit: 'justForTest',
            },
          },
        },
      },
      typeConfiguration: fullModuleConf[DamDomain.ENTITY_TYPES_ENUM.DATA],
      fetchEntityModelAttributes: () => { },
    }


    const containerWrapper = shallow(<AttributesContainer {...props} />, { context, lifecycleExperimental: true })
    const componentWrapper = containerWrapper.find(AttributesComponent)

    // 1 - check thumbnail was retrieved
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: false,
      thumbnailURL: 'test:thumnail.png',
    })
    // 2 - confirm groups without retrievable attributes are filtered and attributes elements is preserved
    const resolvedGroups = componentWrapper.props().attributeGroups
    assert.lengthOf(resolvedGroups, 1, '(1) First group should have been filtered')
    const resolvedSecondGroup = resolvedGroups[0]
    assert.isFalse(resolvedSecondGroup.showTitle, '(1) Second group properties should be correctly reported')
    // now check inner attributes were also correctly resolved
    const resolvedSecondGroupElements = resolvedSecondGroup.elements
    assert.lengthOf(resolvedSecondGroupElements, 2, '(1) All the second group attributes (server and standard) should have been retrieved')
    const secondGroupFirstElement = resolvedSecondGroup.elements[0]
    assert.deepEqual(secondGroupFirstElement.label, { en: 'attr2And3.en', fr: 'attr2And3.fr' }, '(1a) elements order should be preserved')
    assert.lengthOf(secondGroupFirstElement.attributes, 1, '(1a) second group first element attributes should have been correctly filtered (attr3 should not be retrieved)')
    assert.deepEqual(secondGroupFirstElement.attributes[0], {
      key: 'test.attr2',
      Renderer: StringValueRender,
      renderValue: 'myAttr2Value',
      renderUnit: 'justForTest',
      // note: render method is not tested here (depends on render attribute models tests)
    }, '(1a) the restored attribute values should be correctly resolved')
    const secondGroupSecondElement = resolvedSecondGroup.elements[1]
    assert.deepEqual(secondGroupSecondElement.label, { en: 'Standard label', fr: 'Libellé standard' }, '(1b) elements order should be preserved')
  })
})
