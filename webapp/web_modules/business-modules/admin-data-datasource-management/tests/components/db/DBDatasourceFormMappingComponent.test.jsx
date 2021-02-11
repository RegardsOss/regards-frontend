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
import { DBDatasourceFormMappingComponent } from '../../../src/components/db/DBDatasourceFormMappingComponent'
import DBDatasourceFormMappingFromTableComponent from '../../../src/components/db/DBDatasourceFormMappingFromTableComponent'
import DBDatasourceFormMappingCustomComponent from '../../../src/components/db/DBDatasourceFormMappingCustomComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DBDatasourceFormMappingComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DBDatasourceFormMappingComponent)
    assert.isDefined(DBDatasourceFormMappingFromTableComponent)
    assert.isDefined(DBDatasourceFormMappingCustomComponent)
  })
  it('Render properly', () => {
    const props = {
      currentDatasource: DumpProvider.getFirstEntity('DataManagementClient', 'Datasource'),
      isEditing: true,
      isCreating: false,
      handleBack: () => { },
      onSubmit: () => { },
      onTableSelected: () => { },
      tableList: DumpProvider.get('DataManagementClient', 'ConnectionTable'),
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      tableAttributeList: DumpProvider.get('DataManagementClient', 'ConnectionTableAttribute'),
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
      change: () => { },
    }

    const enzymeWrapper = shallow(<DBDatasourceFormMappingComponent {...props} />, { context })
    expect(enzymeWrapper.find(DBDatasourceFormMappingFromTableComponent)).to.have.length(1)
    expect(enzymeWrapper.find(DBDatasourceFormMappingCustomComponent)).to.have.length(1)
  })
})
