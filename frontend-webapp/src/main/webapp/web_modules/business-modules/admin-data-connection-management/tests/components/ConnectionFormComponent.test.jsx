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
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { ConnectionFormComponent } from '../../src/components/ConnectionFormComponent'

const context = buildTestContext()

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ConnectionFormComponent)
    assert.isDefined(Field)
  })

  it('Render properly', () => {
    const props = {
      currentConnection: null,
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      onSubmit: () => {},
      backUrl: '#',
      isCreating: true,
      isEditing: false,
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<ConnectionFormComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(7)
  })
})
