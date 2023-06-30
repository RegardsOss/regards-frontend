/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import TextField from 'material-ui/TextField'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import LabelCellComponent from '../../../../../../src/components/admin/content/search/cells/LabelCellComponent'
import styles from '../../../../../../src/styles'
import { pluginMeta35 } from '../../../../../dumps/search.plugins.meta.runtime'

const context = buildTestContext(styles)

/**
 * Test LabelCellComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing LabelCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LabelCellComponent)
  })
  const testCases = [{
    label: 'a group with label',
    entity: {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'anything',
        [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
      },
      showTitle: true,
      groupIndex: 8,
      criteria: [],
    },
    expectedError: false,
  }, {
    label: 'a group without label, showing it (error)',
    entity: {
      label: {
        [UIDomain.LOCALES_ENUM.en]: '',
        [UIDomain.LOCALES_ENUM.fr]: '',
      },
      showTitle: true,
      groupIndex: 8,
      criteria: [],
    },
    expectedError: true,
  }, {
    label: 'a group without label, hiding it',
    entity: {
      label: {
        [UIDomain.LOCALES_ENUM.en]: '',
        [UIDomain.LOCALES_ENUM.fr]: '',
      },
      showTitle: false,
      groupIndex: 8,
      criteria: [],
    },
    expectedError: false,
  }, {
    label: 'a criterion with label',
    entity: {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'anything',
        [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
      },
      groupIndex: 0,
      criterionIndex: 3,
      pluginMetadata: pluginMeta35,
      configuration: {
        attributes: {},
      },
    },
    expectedError: false,
  }, {
    label: 'a criterion without label (error)',
    entity: {
      label: {
        [UIDomain.LOCALES_ENUM.en]: '',
        [UIDomain.LOCALES_ENUM.fr]: '',
      },
      groupIndex: 0,
      criterionIndex: 3,
      pluginMetadata: pluginMeta35,
      configuration: {
        attributes: {},
      },
    },
    expectedError: true,
  }]
  testCases.forEach(({ label, entity, expectedError }) => {
    // Test for each locale
    UIDomain.LOCALES.forEach((locale) => it(`should render correctly ${label}, with locale ${locale}`, () => {
      const spyUpdate = {}
      // 1 - Test initial error
      const props = {
        entity,
        locale,
        onUpdateElementLabel: (groupIndex, criterionIndex, locale2, editionText) => {
          spyUpdate.groupIndex = groupIndex
          spyUpdate.criterionIndex = criterionIndex
          spyUpdate.locale = locale2
          spyUpdate.editionText = editionText
        },
      }
      const enzymeWrapper = shallow(<LabelCellComponent {...props} />, { context })
      let fieldWrapper = enzymeWrapper.find(TextField)
      assert.lengthOf(fieldWrapper, 0, 'There should not be field wrapper in default mode')
      let mainDiv = enzymeWrapper.find('div')
      assert.lengthOf(mainDiv, 1, 'There should be main div in default mode')
      assert.equal(mainDiv.props().onClick, enzymeWrapper.instance().onEdit, 'Main should set up edition callback')
      if (isEmpty(entity.label[locale])) {
        assert.include(mainDiv.debug(), 'search.results.form.configuration.search.pane.label.column.cell.unset', 'Empty message should be shown')
      } else {
        assert.include(mainDiv.debug(), entity.label[locale], 'Locale label should be shown')
      }
      if (expectedError) {
        assert.deepEqual(mainDiv.props().style,
          context.moduleTheme.configuration.content.searchPane.commonCell.error,
          'Cell should display an error')
      } else {
        assert.deepEqual(mainDiv.props().style,
          context.moduleTheme.configuration.content.searchPane.commonCell.default,
          'Cell should display no error')
      }
      // 2 - Test edition process
      mainDiv.props().onClick()
      mainDiv = enzymeWrapper.find('div')
      assert.lengthOf(mainDiv, 0, 'There should not be main div in edition mode')
      fieldWrapper = enzymeWrapper.find(TextField)
      assert.lengthOf(fieldWrapper, 1, 'There should be field wrapper in edition mode')
      testSuiteHelpers.assertWrapperProperties(fieldWrapper, {
        value: entity.label[locale],
        onChange: enzymeWrapper.instance().onTextChanged,
        onBlur: enzymeWrapper.instance().onConfirmEdition,
        onKeyPress: enzymeWrapper.instance().onKeyPress,
      }, 'field should define expected properties')
      // 2.a edit text and check it is updated in text field
      fieldWrapper.props().onChange({}, 'some text I entered')
      fieldWrapper = enzymeWrapper.find(TextField)
      assert.equal(fieldWrapper.props().value, 'some text I entered', 'Text field should be updated as user types')
      // 2.b test committing (through losing focus here)
      fieldWrapper.props().onBlur()
      assert.deepEqual(spyUpdate, {
        groupIndex: entity.groupIndex,
        criterionIndex: entity.criterionIndex,
        locale,
        editionText: 'some text I entered',
      }, 'Commit should be performed with the right parameters')
      // 3 - Test back to default mode
      fieldWrapper = enzymeWrapper.find(TextField)
      assert.lengthOf(fieldWrapper, 0, 'There should not be field wrapper in default mode (after edition)')
      mainDiv = enzymeWrapper.find('div')
      assert.lengthOf(mainDiv, 1, 'There should be main div in default mode (after edition)')
    }))
  })
})
