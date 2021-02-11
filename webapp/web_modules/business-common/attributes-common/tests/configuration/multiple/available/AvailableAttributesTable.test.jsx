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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { TableHeaderTextField, InfiniteTableContainer } from '@regardsoss/components'
import { StringComparison } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers, getLocalizedIntlStub } from '@regardsoss/tests-helpers'
import AvailableAttributesTable from '../../../../src/configuration/multiple/available/AvailableAttributesTable'
import styles from '../../../../src/styles'
import { attributeModelsDictionary, attributeModelsArray } from '../../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test AvailableAttributesTable
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing AvailableAttributesTable', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AvailableAttributesTable)
  })
  it('should render correctly and updates available attributes with filter', () => {
    const props = {
      attributeModels: attributeModelsArray,
      onAdd: PropTypes.func.isRequired,
    }
    const enzymeWrapper = shallow(<AvailableAttributesTable {...props} />, {
      context: {
        ...context,
        intl: {
          ...getLocalizedIntlStub(),
          // return attr jsonPath + label to let the filter system work
          formatMessage: (idPart, paramsPart) => values(paramsPart).join(' '),
        },
      },
    })
    // 1 - check init
    let state = enzymeWrapper.state()
    let text = enzymeWrapper.find(TableHeaderTextField)
    assert.lengthOf(text, 1, 'There should be the header text filter')
    testSuiteHelpers.assertWrapperProperties(text, {
      value: state.filterText,
      onChange: enzymeWrapper.instance().onFilterTextUpdated,
    }, 'text filter properties should be correctly initialized')
    let table = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(table, 1, 'There should be the attributes table')
    assert.deepEqual(table.props().entities, state.attributeModels, 'Table attributes should be correctly reported')
    assert.deepEqual(state.attributeModels, props.attributeModels, 'Initial attributes should not be filtered')
    // 2 - Apply some filter and check attributes are correctly filtered
    enzymeWrapper.instance().onFilterTextUpdated(null, 'roperti') // we expect to filter only custom attributes, removing standard ones
    enzymeWrapper.update()
    state = enzymeWrapper.state()
    assert.equal(state.filterText, 'roperti', 'Filter text should be updated in state')
    assert.deepEqual(state.attributeModels,
      values(attributeModelsDictionary).sort((a1, a2) => StringComparison.compare(a1.content.jsonPath, a2.content.jsonPath)),
      'Only custom attributes should be retained for "roperti" label')
    text = enzymeWrapper.find(TableHeaderTextField)
    assert.equal(text.props().value, 'roperti', 'Filter text value should be updated')
    table = enzymeWrapper.find(InfiniteTableContainer)
    assert.deepEqual(table.props().entities, state.attributeModels, 'Table available attributes should be updated')
  })
})
