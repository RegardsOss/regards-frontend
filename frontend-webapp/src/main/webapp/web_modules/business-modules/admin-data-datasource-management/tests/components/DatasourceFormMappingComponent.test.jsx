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
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { DatasourceFormMappingComponent } from '../../src/components/DatasourceFormMappingComponent'
import DatasourceFormMappingFromTableComponent from '../../src/components/DatasourceFormMappingFromTableComponent'
import DatasourceFormMappingCustomComponent from '../../src/components/DatasourceFormMappingCustomComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceFormMappingComponent)
    assert.isDefined(DatasourceFormMappingFromTableComponent)
    assert.isDefined(DatasourceFormMappingCustomComponent)
  })
  it('Render properly', () => {
    const props = {
      currentDatasource: DumpProvider.getFirstEntity('DataManagementClient', 'Datasource'),
      isEditing: true,
      isCreating: false,
      handleBack: () => {},
      onSubmit: () => {},
      onTableSelected: () => {},
      tableList: DumpProvider.get('DataManagementClient', 'ConnectionTable'),
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      tableAttributeList: DumpProvider.get('DataManagementClient', 'ConnectionTableAttribute'),
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceFormMappingComponent {...props} />, { context })
    expect(enzymeWrapper.find(DatasourceFormMappingFromTableComponent)).to.have.length(1)
    expect(enzymeWrapper.find(DatasourceFormMappingCustomComponent)).to.have.length(1)
  })
})
