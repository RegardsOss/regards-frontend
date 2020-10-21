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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ConfigurationCellComponent from '../../../../../../src/components/admin/content/search/cells/ConfigurationCellComponent'
import styles from '../../../../../../src/styles'
import { attributes } from '../../../../../dumps/attributes.dump'
import { pluginMeta35 } from '../../../../../dumps/search.plugins.meta.runtime'

const context = buildTestContext(styles)

/**
 * Test ConfigurationCellComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ConfigurationCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ConfigurationCellComponent)
  })

  // test cases where configuration cannot be edited: group / empty
  const inactiveTestCases = [{
    label: 'a group',
    entity: {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'anything',
        [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
      },
      showTitle: true,
      groupIndex: 8,
      criteria: [],
    },
  }, {
    label: 'a criterion without plugin (not set)',
    entity: {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'anything',
        [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
      },
      groupIndex: 0,
      criterionIndex: 3,
      pluginMetadata: null,
      configuration: {
        attributes: {},
      },
    },
  }, {
    label: 'a criterion using a plugin without configuration',
    entity: {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'anything',
        [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
      },
      groupIndex: 0,
      criterionIndex: 3,
      pluginMetadata: {
        ...pluginMeta35,
        configuration: {
          attributes: [],
        },
      },
      configuration: {
        attributes: {},
      },
    },
  }]
  inactiveTestCases.forEach(({ label, entity }) => it(`should render disabled for ${label}`, () => {
    const props = {
      entity: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        showTitle: true,
        groupIndex: 8,
        criteria: [],
      },
      availableAttributes: attributes,
      onShowConfigurationDialog: () => {},
    }
    const enzymeWrapper = shallow(<ConfigurationCellComponent {...props} />, { context })
    const mainDiv = enzymeWrapper.find('div')
    assert.lengthOf(mainDiv, 1)
    assert.isNotOk(mainDiv.props().onClick)
    assert.isNotOk(mainDiv.props().title)
    assert.deepEqual(mainDiv.props().style,
      context.moduleTheme.configuration.content.searchPane.commonCell.inactive)
  }))

  it('should render enabled for a criterion with configuration', () => {
    const spyOnEdit = {}
    const props = {
      entity: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        groupIndex: 0,
        criterionIndex: 3,
        pluginMetadata: pluginMeta35,
        configuration: {
          attributes: {
            // selected: label
            field1: DamDomain.AttributeModelController.getStandardAttributeModel(
              DamDomain.AttributeModelController.standardAttributesKeys.label).content.jsonPath,
            // selected: attr2
            field2: attributes[3].content.jsonPath,
          },
        },
      },
      availableAttributes: attributes,
      onShowConfigurationDialog: (entity) => {
        spyOnEdit.entity = entity
      },
    }
    const enzymeWrapper = shallow(<ConfigurationCellComponent {...props} />, { context })
    const mainDiv = enzymeWrapper.find('div')
    assert.lengthOf(mainDiv, 1)
    assert.equal(mainDiv.props().onClick, enzymeWrapper.instance().onEdit)
    assert.isOk(mainDiv.props().title)
    assert.deepEqual(mainDiv.props().style,
      context.moduleTheme.configuration.content.searchPane.commonCell.default)
    // test edition callback
    enzymeWrapper.instance().onEdit()
    assert.deepEqual(spyOnEdit.entity, props.entity)
  })

  const errorTestCases = [{
    label: 'an attribute has not been set',
    configuration: {
      attributes: {
        field2: attributes[3].content.jsonPath,
      },
    },
  }, {
    label: 'an attribute type is not matching',
    configuration: {
      attributes: {
        field1: attributes[4].content.jsonPath, // DATE !== STRING => KO
        field2: attributes[3].content.jsonPath,
      },
    },
  }, {
    label: 'an attribute cannot be retrieved is not matching',
    configuration: {
      attributes: {
        field1: 'attribute.that.does.not.exist',
        field2: attributes[3].content.jsonPath,
      },
    },
  }]
  errorTestCases.forEach(({ label, configuration }) => it(`should render in error when ${label}`, () => {
    const props = {
      entity: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        groupIndex: 0,
        criterionIndex: 3,
        pluginMetadata: pluginMeta35,
        configuration,
      },
      availableAttributes: attributes,
      onShowConfigurationDialog: () => {},
    }
    const enzymeWrapper = shallow(<ConfigurationCellComponent {...props} />, { context })
    const mainDiv = enzymeWrapper.find('div')
    assert.lengthOf(mainDiv, 1)
    assert.equal(mainDiv.props().onClick, enzymeWrapper.instance().onEdit)
    assert.isOk(mainDiv.props().title)
    assert.deepEqual(mainDiv.props().style,
      context.moduleTheme.configuration.content.searchPane.commonCell.error)
  }))
})
