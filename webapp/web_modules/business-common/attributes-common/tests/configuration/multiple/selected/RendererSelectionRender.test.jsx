/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import { DEFAULT_RENDERER_KEY } from '../../../../src/render/AttributesTypeToRender'
import RendererSelectionRender from '../../../../src/configuration/multiple/selected/RendererSelectionRender'
import styles from '../../../../src/styles'
import { attributeModelsArray } from '../../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test RendererSelectionRender
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing RendererSelectionRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RendererSelectionRender)
  })
  const testCases = [{
    label: 'single renderer selection',
    types: [
      DamDomain.PSEUDO_ATTR_TYPES.BOOLEAN,
      DamDomain.PSEUDO_ATTR_TYPES.DOUBLE,
      DamDomain.PSEUDO_ATTR_TYPES.DOUBLE_ARRAY,
      DamDomain.PSEUDO_ATTR_TYPES.DOUBLE_INTERVAL,
      DamDomain.PSEUDO_ATTR_TYPES.INTEGER,
      DamDomain.PSEUDO_ATTR_TYPES.INTEGER_ARRAY,
      DamDomain.PSEUDO_ATTR_TYPES.INTEGER_INTERVAL,
      DamDomain.PSEUDO_ATTR_TYPES.LONG,
      DamDomain.PSEUDO_ATTR_TYPES.LONG_ARRAY,
      DamDomain.PSEUDO_ATTR_TYPES.LONG_INTERVAL,
      DamDomain.PSEUDO_ATTR_TYPES.THUMBNAIL_PSEUDO_TYPE,
      DamDomain.PSEUDO_ATTR_TYPES.URL,
    ],
    expectedRenderers: [DEFAULT_RENDERER_KEY],
  }, {
    label: 'string type (2 renderers available)',
    types: [DamDomain.PSEUDO_ATTR_TYPES.STRING],
    expectedRenderers: [DEFAULT_RENDERER_KEY, 'multiline'],
  }, {
    label: 'date types (7 renderers available)',
    types: [
      DamDomain.PSEUDO_ATTR_TYPES.DATE_ARRAY,
      DamDomain.PSEUDO_ATTR_TYPES.DATE_INTERVAL,
      DamDomain.PSEUDO_ATTR_TYPES.DATE_ISO8601,
    ],
    expectedRenderers: [
      DEFAULT_RENDERER_KEY,
      'date',
      'dateWithMinutes',
      'dateWithMilliseconds',
      'time',
      'timeWithMilliseconds',
      'dateIso',
    ],
  }]

  testCases
    .forEach(({ label, types, expectedRenderers }) => it(`should render correctly for ${label}`, () => types
      .forEach((attributeType) => expectedRenderers.forEach((selectedRenderer) => {
      // Render once for each type and each possible renderer
        const spyCallback = {}
        const props = {
          entity: {
            name: 'aCustomAttribute',
            renderer: selectedRenderer,
          },
          rowIndex: Math.round(Math.random() * 5000),
          attributeModels: [{
            content: {
              id: 50000000,
              name: 'cAttr',
              label: 'A custom attribute',
              jsonPath: 'aCustomAttribute',
              description: 'A custom attribute for test',
              type: attributeType,
            },
          }, ...attributeModelsArray],
          onRendererSelected: (rowIndex, value) => {
            spyCallback.rowIndex = rowIndex
            spyCallback.value = value
          },
        }
        // Test render
        const enzymeWrapper = shallow(<RendererSelectionRender {...props} />, { context })
        const selectFieldWrapper = enzymeWrapper.find(SelectField)
        assert.lengthOf(selectFieldWrapper, 1, 'There should be select field')
        testSuiteHelpers.assertWrapperProperties(selectFieldWrapper, {
          value: selectedRenderer,
          onChange: enzymeWrapper.instance().onRendererSelected,
        }, 'Select field should have the right value and callback')
        const optionsWrapper = selectFieldWrapper.find(MenuItem)
        assert.lengthOf(optionsWrapper, expectedRenderers.length, 'There should be an option for each available renderer')
        expectedRenderers.forEach((r) => {
          assert.lengthOf(optionsWrapper.findWhere((n) => n.props().value === r), 1, `There should be ${r} option`)
        })

        // Test callback
        expectedRenderers.forEach((r, index) => {
          selectFieldWrapper.props().onChange(null, index, r)
          if (r === selectedRenderer) {
            assert.notEqual(spyCallback.value, r, `Callback should not have been invoked for current renderer (${r})`)
          } else {
            assert.equal(spyCallback.rowIndex, props.rowIndex, 'Callback should have been invoked for right row index')
            assert.equal(spyCallback.value, r, `Callback should have been invoked for another renderer (${r})`)
          }
        })
      }))))
})
