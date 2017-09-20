/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { TableContainer } from '@regardsoss/components'
import DocumentListComponent from '../../src/components/DocumentListComponent'

describe('[ADMIN DATA DOCUMENT MANAGEMENT] Testing DocumentListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DocumentListComponent)
  })
  const context = buildTestContext()

  it('Render properly', () => {
    const props = {
      handleDelete: () => {},
      handleEdit: () => {},
      backUrl: '#',
      createUrl: '#',
    }

    const enzymeWrapper = shallow(<DocumentListComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableContainer)).to.have.length(1)
  })
})
