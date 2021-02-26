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
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import OpenSearchQueryParameter from '../../../catalog/query/OpenSearchQueryParameter'

describe('[Domain] Testing OpenSearchQueryParameter', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly in query', () => {
    const queryParameter = new OpenSearchQueryParameter('myName', 'myValue')
    assert.equal(queryParameter.toQueryString(), 'myName:myValue', 'The parameter is not correctly displayed')
  })
  const testCases = [{
    label: 'a single value for strict equality',
    value: 'ab cd ef',
    expected: '"ab cd ef"',
    method: OpenSearchQueryParameter.toStrictStringEqual,
  }, {
    label: 'a single value for strict equality (with espaced chars)',
    value: 'ab"c"1.56\\def(){}[]$$||+-',
    expected: '"ab\\"c\\"1.56\\def(){}[]$$||+-"',
    method: OpenSearchQueryParameter.toStrictStringEqual,
  }, {
    label: 'multiple values for strict equality (with espaced chars)',
    value: ['a+', 'b"', null, 'ab"c"1.56\\def(){}[]$$||+-', ''],
    expected: '("a+" OR "b\\"" OR "ab\\"c\\"1.56\\def(){}[]$$||+-")',
    method: OpenSearchQueryParameter.toStrictStringEqual,
    separator: OpenSearchQueryParameter.OR_SEPARATOR,
    negate: false,
  }, {
    label: 'multiple values for strict equality (with espaced chars and negated)',
    value: ['a+', 'b"', null, 'ab"c"1.56\\def(){}[]$$||+-', ''],
    expected: '(!("a+" OR "b\\"" OR "ab\\"c\\"1.56\\def(){}[]$$||+-"))',
    method: OpenSearchQueryParameter.toStrictStringEqual,
    separator: OpenSearchQueryParameter.AND_SEPARATOR,
    negate: true,
  }, {
    label: 'a single value for containing test',
    value: 'abcdef',
    expected: '(abcdef)',
    method: OpenSearchQueryParameter.toStringContained,
  }, {
    label: 'a single value for containing test (with espaced chars)',
    value: 'ab"c"1.56\\def(){}[]&&||+-!^~*zz?: x',
    expected: '(ab\\"c\\"1.56\\\\def\\(\\)\\{\\}\\[\\]\\&&\\||\\+\\-\\!\\^\\~\\*zz\\?\\:\\ x)',
    method: OpenSearchQueryParameter.toStringContained,
  }, {
    label: 'multiple values for containing test (with espaced chars)',
    value: ['a+', 'b"', null, 'ab"c"1.56\\def(){}[]&&||+-!^~*zz?: x', ''],
    expected: '((a\\+) AND (b\\") AND (ab\\"c\\"1.56\\\\def\\(\\)\\{\\}\\[\\]\\&&\\||\\+\\-\\!\\^\\~\\*zz\\?\\:\\ x))',
    method: OpenSearchQueryParameter.toStringContained,
    separator: OpenSearchQueryParameter.AND_SEPARATOR,
    negate: false,
  }, {
    label: 'multiple values for containing test (with espaced chars and negated)',
    value: ['a+', 'b"', null, 'ab"c"1.56\\def(){}[]&&||+-!^~*zz?: x', ''],
    expected: '(!((a\\+) AND (b\\") AND (ab\\"c\\"1.56\\\\def\\(\\)\\{\\}\\[\\]\\&&\\||\\+\\-\\!\\^\\~\\*zz\\?\\:\\ x)))',
    method: OpenSearchQueryParameter.toStringContained,
    separator: OpenSearchQueryParameter.OR_SEPARATOR,
    negate: true,
  }, {
    label: 'a single value for regex text',
    value: 'abcdef',
    expected: '/abcdef/',
    method: OpenSearchQueryParameter.toRegex,
  }, {
    label: 'multiple values for regex text',
    value: 'zehbf sqfkd',
    expected: '/zehbf sqfkd/',
    method: OpenSearchQueryParameter.toRegex,
  }, {
    label: 'a single value for full text',
    value: 'abcdef',
    expected: '*abcdef*',
    method: OpenSearchQueryParameter.toFullText,
  }, {
    label: 'multiple values for full text',
    value: ['abcdef', 'fdsfq', 'aeaez'],
    expected: '*abcdef* AND *fdsfq* AND *aeaez*',
    method: OpenSearchQueryParameter.toFullText,
  }]

  testCases.forEach(({
    label, value, expected, method, separator, negate,
  }) => it(`Should compute correctly ${label}`, () => {
    assert.equal(method(value, separator, negate), expected)
  }))
})
