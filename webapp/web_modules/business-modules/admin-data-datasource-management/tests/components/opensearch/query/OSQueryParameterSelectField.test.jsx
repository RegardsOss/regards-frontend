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
 */
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import MenuItem from 'material-ui/MenuItem'
import { RenderSelectField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import OSQueryParameterSelectField from '../../../../src/components/opensearch/query/OSQueryParameterSelectField'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSQueryParameterSelectField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(OSQueryParameterSelectField)
  })
  it('should render correctly parameter options', () => {
    const props = {
      name: 'test.queryValue',
      filterParameter: {
        name: 'myParam',
        value: '{my.param}',
        title: 'This is my parameter',
        option: [{ value: 'option1', label: 'My option1' }, { value: 'option2' }, { value: 'option3' }],
      },
    }
    const wrapper = shallow(<OSQueryParameterSelectField {...props} />, { context })

    const field = wrapper.find(Field)
    assert.lengthOf(field, 1, 'There should be select field')
    testSuiteHelpers.assertWrapperProperties(field, {
      name: props.name,
      component: RenderSelectField,
      label: 'opensearch.crawler.form.query.value',
      validate: ValidationHelpers.required,
    }, 'Field properties should be correctly set')

    // Check all options are available
    const menuItems = field.find(MenuItem)
    assert.lengthOf(menuItems, props.filterParameter.option.length, 'There should be one menu item for each option')
    props.filterParameter.option.forEach((option) => {
      const optionItem = menuItems.findWhere((n) => n.props().value === option.value)
      assert.lengthOf(optionItem, 1, `There should be option "${option.label || option.value}"`)
      if (option.label) {
        assert.equal(optionItem.props().primaryText, option.label, `Option should be labelled ${option.label}`)
      } else {
        assert.equal(optionItem.props().primaryText, option.value, `Option should be labelled ${option.value}`)
      }
    })
  })
})
