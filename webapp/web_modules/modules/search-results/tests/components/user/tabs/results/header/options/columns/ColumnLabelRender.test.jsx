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
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableColumnBuilder } from '@regardsoss/components'
import ColumnLabelRender from '../../../../../../../../src/components/user/tabs/results/header/options/columns/ColumnLabelRender'
import styles from '../../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ColumnLabelRender
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ColumnLabelRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ColumnLabelRender)
  })
  it('should render correctly the selection column', () => {
    const props = {
      entity: {
        key: TableColumnBuilder.selectionColumnKey,
        visible: true,
      },
    }
    const enzymeWrapper = shallow(<ColumnLabelRender {...props} />, { context })
    assert.include(enzymeWrapper.debug(), 'results.selection.column.label', 'Specific selection label should be rendered')
  })
  it('should render correctly the options column', () => {
    const props = {
      entity: {
        key: TableColumnBuilder.optionsColumnKey,
        visible: false,
      },
    }
    const enzymeWrapper = shallow(<ColumnLabelRender {...props} />, { context })
    assert.include(enzymeWrapper.debug(), 'results.options.column.label', 'Specific options label should be rendered')
  })
  it('should render correctly an attribute column', () => {
    const props = {
      entity: {
        key: 'anything.else.key',
        label: {
          en: 'IDK.en',
          fr: 'IDK.fr',
        },
        visible: true,
        attributes: [
          DamDomain.AttributeModelController.getStandardAttributeModel(
            DamDomain.AttributeModelController.standardAttributesKeys.label),
          DamDomain.AttributeModelController.getStandardAttributeModel(
            DamDomain.AttributeModelController.standardAttributesKeys.id),
        ],
        enableSorting: false,
      },
    }
    const savedLocale = context.intl.locale
    context.intl.locale = 'en'
    const enzymeWrapper = shallow(<ColumnLabelRender {...props} />, { context })
    assert.include(enzymeWrapper.debug(), props.entity.label.en, 'column label should be rendered for en locale')

    context.intl.locale = 'fr'
    const enzymeWrapper2 = shallow(<ColumnLabelRender {...props} />, { context })
    assert.include(enzymeWrapper2.debug(), props.entity.label.fr, 'column label should be rendered for fr locale')

    context.intl.locale = savedLocale
  })
})
