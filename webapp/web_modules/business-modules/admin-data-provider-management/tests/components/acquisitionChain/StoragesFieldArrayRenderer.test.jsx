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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { StoragesFieldArrayRenderer } from '../../../src/components/acquisitionChain/StoragesFieldArrayRenderer'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StoragesFieldArrayRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing StoragesFieldArrayRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StoragesFieldArrayRenderer)
  })
  it('should render correctly', () => {
    const props = {
      changeField: () => {},
      fields: ReduxFormTestHelper.getFieldsProps([{
        active: true,
        label: 'LocalDataStorage',
        path: '/machin/chose',
      },
      {
        active: true,
        label: 'Sacoche Infini',
        path: '',
      },
      {
        active: false,
        label: 'Turkmenistan',
        path: '',
      },
      ]),
    }
    const enzymeWrapper = shallow(<StoragesFieldArrayRenderer {...props} />, { context })
    const fields = enzymeWrapper.find(Field)
    assert.equal(fields.length, 18, 'There should be 18 parameter Field rendered in this form')
    assert.notInclude(enzymeWrapper.debug(), 'acquisition-chain.form.general.section.info.storage.no.data', 'Error message should be displayed')
  })
  it('should render error when there is no storage', () => {
    const props = {
      changeField: () => {},
      fields: ReduxFormTestHelper.getFieldsProps([]),
    }
    const enzymeWrapper = shallow(<StoragesFieldArrayRenderer {...props} />, { context })
    const fields = enzymeWrapper.find(Field)
    assert.equal(fields.length, 0, 'There should be no field')
    assert.include(enzymeWrapper.debug(), 'acquisition-chain.form.general.section.info.storage.no.data', 'Error message should be displayed')
  })
})
