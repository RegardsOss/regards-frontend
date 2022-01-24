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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import CheckedIcon from 'mdi-material-ui/CheckboxMarked'
import UncheckedIcon from 'mdi-material-ui/CheckboxBlankOutline'
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableColumnBuilder } from '@regardsoss/components'
import ColumnVisibleRender from '../../../../../../../../src/components/user/tabs/results/header/options/columns/ColumnVisibleRender'
import styles from '../../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ColumnVisibleRender
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ColumnVisibleRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ColumnVisibleRender)
  })
  it('should render correctly the selection column', () => {
    const props = {
      entity: {
        key: TableColumnBuilder.selectionColumnKey,
        visible: true,
      },
      onChangeVisibility: () => { },
    }
    const enzymeWrapper = shallow(<ColumnVisibleRender {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(CheckedIcon), 1, 'Checked icon should be added in DOM as column is visible')
    assert.lengthOf(enzymeWrapper.find(UncheckedIcon), 0, 'Unchecked icon should not be added in DOM as column is visible')
  })
  it('should render correctly the options column', () => {
    const props = {
      entity: {
        key: TableColumnBuilder.optionsColumnKey,
        visible: false,
      },
      onChangeVisibility: () => { },
    }
    const enzymeWrapper = shallow(<ColumnVisibleRender {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(CheckedIcon), 0, 'Checked icon should not be added in DOM as column is hidden')
    assert.lengthOf(enzymeWrapper.find(UncheckedIcon), 1, 'Unchecked icon should be added in DOM as column is hidden')
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
      onChangeVisibility: () => { },
    }

    const enzymeWrapper = shallow(<ColumnVisibleRender {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(CheckedIcon), 1, 'Checked icon should be added in DOM as column is visible')
    assert.lengthOf(enzymeWrapper.find(UncheckedIcon), 0, 'Unchecked icon should not be added in DOM as column is visible')
  })
})
