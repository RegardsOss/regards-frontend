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
import { Field } from '@regardsoss/form-utils'
import OSQueryParameterInputField from '../../../../src/components/opensearch/query/OSQueryParameterInputField'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSQueryParameterInputField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(OSQueryParameterInputField)
  })
  it('should render correctly with min / max exclusive', () => {
    const props = {
      name: 'test.queryValue',
      filterParameter: {
        name: 'myParam',
        value: '{my.param}',
        title: 'This is my parameter',
        minExclusive: '0',
        maxExclusive: '25',
      },
    }
    const wrapper = shallow(<OSQueryParameterInputField {...props} />, { context })
    assert.deepEqual(wrapper.state(), {
      regexp: null,
      minInclusive: null,
      maxInclusive: null,
      minExclusive: 0,
      maxExclusive: 25,
    }, 'State should be correctly computed from parameter model')
    const field = wrapper.find(Field)
    assert.lengthOf(field, 1, 'There should be input field')
    assert.equal(field.props().name, props.name, 'Field name should be correctly reported from props')
    assert.equal(field.props().label, 'opensearch.crawler.form.query.input.field.numeric.value', 'Field label should be computed for numeric bounds')
    assert.isTrue(field.props().validate.length > 0, 'Field value should be validated')
  })
  it('should render correctly with min / max inclusive', () => {
    const props = {
      name: 'test.queryValue',
      filterParameter: {
        name: 'myParam',
        value: '{my.param}',
        title: 'This is my parameter',
        minInclusive: '-45',
        maxInclusive: '635',
      },
    }
    const wrapper = shallow(<OSQueryParameterInputField {...props} />, { context })
    assert.deepEqual(wrapper.state(), {
      regexp: null,
      minExclusive: null,
      maxExclusive: null,
      minInclusive: -45,
      maxInclusive: 635,
    }, 'State should be correctly computed from parameter model')
    const field = wrapper.find(Field)
    assert.lengthOf(field, 1, 'There should be input field')
    assert.equal(field.props().name, props.name, 'Field name should be correctly reported from props')
    assert.equal(field.props().label, 'opensearch.crawler.form.query.input.field.numeric.value', 'Field label should be computed for numeric bounds')
    assert.isTrue(field.props().validate.length > 0, 'Field value should be validated')
  })
  it('should render correctly with regexp pattern', () => {
    const props = {
      name: 'test.queryValue',
      filterParameter: {
        name: 'myParam',
        value: '{my.param}',
        title: 'This is my parameter',
        pattern: '[a-zA-Z]+',
      },
    }
    const wrapper = shallow(<OSQueryParameterInputField {...props} />, { context })
    assert.deepEqual(wrapper.state(), {
      regexp: /[a-zA-Z]+/,
      minExclusive: null,
      maxExclusive: null,
      minInclusive: null,
      maxInclusive: null,
    }, 'State should be correctly computed from parameter model')
    const field = wrapper.find(Field)
    assert.lengthOf(field, 1, 'There should be input field')
    assert.equal(field.props().name, props.name, 'Field name should be correctly reported from props')
    assert.equal(field.props().label, 'opensearch.crawler.form.query.input.field.pattern.value', 'Field label should be computed for pattern constraint')
    assert.isTrue(field.props().validate.length > 0, 'Field value should be validated')
  })
  it('should render correctly without constraint', () => {
    const props = {
      name: 'test.queryValue',
      filterParameter: {
        name: 'myParam',
        value: '{my.param}',
        title: 'This is my parameter',
      },
    }
    const wrapper = shallow(<OSQueryParameterInputField {...props} />, { context })
    assert.deepEqual(wrapper.state(), {
      regexp: null,
      minExclusive: null,
      maxExclusive: null,
      minInclusive: null,
      maxInclusive: null,
    }, 'State should be correctly computed from parameter model')
    const field = wrapper.find(Field)
    assert.lengthOf(field, 1, 'There should be input field')
    assert.equal(field.props().name, props.name, 'Field name should be correctly reported from props')
    assert.equal(field.props().label, 'opensearch.crawler.form.query.input.field.free.value', 'Field label should be computed for constraint free value')
    assert.isTrue(field.props().validate.length > 0, 'Field value should be validated')
  })
})
