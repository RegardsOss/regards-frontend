/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import SearchResultsConfigurationComponent from '../../src/components/admin/SearchResultsConfigurationComponent'
import { AdminContainer } from '../../src/containers/AdminContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing AdminContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminContainer)
  })
  it('should render properly', () => {
    const props = {
      appName: 'any',
      project: 'any',
      type: 'any',
      adminForm: {
        isCreating: true,
        isDuplicating: false,
        isEditing: false,
        changeField: () => { },
        form: {},
      },
      moduleConf: {},
      attributeModels: {},
      fetchAllDataAttributes: () => { },
      fetchAllDatasetModelsAttributes: () => { },
      fetchAllDocumentModelsAttributes: () => { },
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    let loadableWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableWrapper, 1, 'There should be the loadable wrapper')
    assert.isTrue(loadableWrapper.props().isLoading, 'The loader wrapper should be marked loading')
    assert.lengthOf(enzymeWrapper.find(SearchResultsConfigurationComponent), 1, 'The corresponding component should be rendered')
    enzymeWrapper.instance().setState({
      isLoading: false,
    })
    enzymeWrapper.update() // wait for state update
    assert.isTrue(loadableWrapper.props().isLoading, 'The loader should be marked loading')
    loadableWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableWrapper, 1, 'There should be the loadable wrapper')
    assert.isFalse(loadableWrapper.props().isLoading, 'The loader wrapper should not be marked loading')
    assert.lengthOf(enzymeWrapper.find(SearchResultsConfigurationComponent), 1, 'The corresponding component should be rendered')
  })
})
