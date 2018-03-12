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
 **/
import { shallow } from 'enzyme'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UnconnectedAdminContainer } from '../../src/containers/AdminContainer'

/**
 * Tests for AdminContainer
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing Admin Container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Create new configuration : Should render correctly', () => {
    const props = {
      appName: 'test',
      project: 'project',
      adminForm: {
        isCreating: true,
        isDuplicating: false,
        isEditing: false,
        changeField: () => {
        },
        form: {
          enableFacettes: false,
        },
      },
      moduleConf: {
        datasets: {
          type: null,
          selectedDatasets: [],
          selectedModels: [],
        },
        criterion: [],
        layout: {
          id: 'main',
          type: 'type',
        },
        resultType: '',
        enableFacettes: false,
      },
      selectableDataObjectsAttributes: {},
      selectableDataSetsAttributes: {},
      availableCriterion: {},
      fetchCriterion: () => { },
      fetchDataObjectAttributes: () => { },
      fetchDataSetAttributes: () => { },
    }

    shallow(<UnconnectedAdminContainer {...props} />)
  })
})
