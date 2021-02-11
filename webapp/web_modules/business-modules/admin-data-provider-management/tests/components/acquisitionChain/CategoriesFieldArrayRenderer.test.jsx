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
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import { CategoriesFieldArrayRenderer } from '../../../src/components/acquisitionChain/CategoriesFieldArrayRenderer'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test CategoriesFieldArrayRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing CategoriesFieldArrayRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CategoriesFieldArrayRenderer)
  })
  it('should render correctly', () => {
    const props = {
      fields: ReduxFormTestHelper.getFieldsProps(['pikachu', 'soyouz', 'vendetta']),
    }
    const enzymeWrapper = shallow(<CategoriesFieldArrayRenderer {...props} />, { context })
    const chip = enzymeWrapper.find(Chip)
    assert.equal(chip.length, 3, 'There should be 3 Chip rendered in this form')
    const fields = enzymeWrapper.find(TextField)
    assert.equal(fields.length, 1, 'There should be 1 TextField rendered in this form')
  })
})
