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
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { CommonDomain } from '@regardsoss/domain'
import { EntitiesFilesFormContainer } from '../../src/containers/EntitiesFilesFormContainer'
import EntitiesFilesFormComponent from '../../src/components/EntitiesFilesFormComponent'

const context = buildTestContext()

describe('[ADMIN DATA ENTITIES ATTRIBUTES MANAGEMENT] Testing EntitiesFilesFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntitiesFilesFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
    assert.isDefined(EntitiesFilesFormComponent)
  })

  it('Render properly', () => {
    const props = {
      currentEntity: DumpProvider.getFirstEntity('DataManagementClient', 'Collection'),
      allowedDataType: [CommonDomain.DATA_TYPES_ENUM.DESCRIPTION],

      handleRefreshEntity: () => { },
      handleUpdateEntity: () => { },

      // from mapStateToProps
      accessToken: '#',

      // from mapDispatchToProps
      addFiles: () => { },
      removeFile: () => { },
      removeOneFieldOfTheForm: () => { },
    }
    const enzymeWrapper = shallow(<EntitiesFilesFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    expect(enzymeWrapper.find(EntitiesFilesFormComponent)).to.have.length(1)

    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
    assert.isOk(enzymeWrapper.find(EntitiesFilesFormComponent), 'Should get the sub component')
  })
})
