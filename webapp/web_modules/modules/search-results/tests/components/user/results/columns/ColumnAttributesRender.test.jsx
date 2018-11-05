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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableColumnBuilder, TableSortOrders } from '@regardsoss/components'
import ColumnAttributesRender from '../../../../../src/components/user/results/columns/ColumnAttributesRender'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ColumnAttributesRender
 * @author Raphaël Mechali
 */
describe('[Search Results] Testing ColumnAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ColumnAttributesRender)
  })
  it('should render correctly the selection column', () => {
    const props = {
      entity: {
        key: TableColumnBuilder.selectionColumnKey,
        visible: true,
        enableSorting: false,
        sortOrder: TableSortOrders.NO_SORT,
      },
    }
    const enzymeWrapper = shallow(<ColumnAttributesRender {...props} />, { context })
    assert.include(enzymeWrapper.debug(), 'search.results.configure.columns.attribute.not.available',
      'attributes should not be rendered for selection column')
  })
  it('should render correctly the options column', () => {
    const props = {
      entity: {
        key: TableColumnBuilder.optionsColumnKey,
        visible: false,
        enableSorting: false,
        sortOrder: TableSortOrders.NO_SORT,
      },
    }
    const enzymeWrapper = shallow(<ColumnAttributesRender {...props} />, { context })
    assert.include(enzymeWrapper.debug(), 'search.results.configure.columns.attribute.not.available',
      'attributes should not be rendered for options column')
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
        sortOrder: TableSortOrders.NO_SORT,
        sortIndex: null,
        defaultSorting: false,
      },
    }
    const enzymeWrapper = shallow(<ColumnAttributesRender {...props} />, { context })
    assert.include(enzymeWrapper.debug(),
      DamDomain.AttributeModelController.getAttributeModelFullLabel(props.entity.attributes[0]),
      'First attribute should appear in label')
    assert.include(enzymeWrapper.debug(),
      DamDomain.AttributeModelController.getAttributeModelFullLabel(props.entity.attributes[1]),
      'Second attribute should appear in label')
  })
})
