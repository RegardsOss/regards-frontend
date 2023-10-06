/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TableRow } from 'material-ui/Table'
import { Field } from '@regardsoss/form-utils'
import DBDatasourceFormMappingLineComponent from '../../../src/components/db/DBDatasourceFormMappingLineComponent'
import DBDatasourceFormMappingInputComponent from '../../../src/components/db/DBDatasourceFormMappingInputComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingLineComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DBDatasourceFormMappingLineComponent)
    assert.isDefined(Field)
  })
  it('Render properly', () => {
    const props = {
      modelAttribute: DumpProvider.getFirstEntity('DataManagementClient', 'ModelAttribute'),
      handleDelete: () => { },
      tableAttributeList: DumpProvider.get('DataManagementClient', 'ConnectionTableAttribute'),
      table: DumpProvider.getFirstEntity('DataManagementClient', 'ConnectionTable'),
      onlyAdvancedConfiguration: false,
      isEditingSQL: false,
      change: () => { },
    }

    const enzymeWrapper = shallow(<DBDatasourceFormMappingLineComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(1)
    expect(enzymeWrapper.find(DBDatasourceFormMappingInputComponent)).to.have.length(1)
  })
})
