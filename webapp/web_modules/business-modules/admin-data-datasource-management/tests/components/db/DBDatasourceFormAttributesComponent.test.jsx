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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { DBDatasourceFormAttributesComponent } from '../../../src/components/db/DBDatasourceFormAttributesComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormAttributesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DBDatasourceFormAttributesComponent)
    assert.isDefined(Field)
  })
  it('Render properly', () => {
    const props = {
      currentDatasource: DumpProvider.getFirstEntity('DataManagementClient', 'Datasource'),
      currentConnection: DumpProvider.getFirstEntity('DataManagementClient', 'Connection'),
      onSubmit: () => { },
      backUrl: '#',
      modelList: DumpProvider.get('DataManagementClient', 'Model'),
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
    }

    const enzymeWrapper = shallow(<DBDatasourceFormAttributesComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(4)
  })
})
