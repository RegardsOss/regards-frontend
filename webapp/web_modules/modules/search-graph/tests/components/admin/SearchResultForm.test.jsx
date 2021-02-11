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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LazyModuleComponent } from '@regardsoss/modules'
import SearchResultForm from '../../../src/components/admin/SearchResultForm'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SearchResultForm', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchResultForm)
  })

  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
      adminForm: {
        currentNamespace: 'conf',
        isCreating: true,
        isDuplicating: false,
        isEditing: false,
        changeField: () => { },
        form: {},
      },
    }
    const enzymeWrapper = shallow(<SearchResultForm {...props} />, { context })
    // assert the component delegates to search results module configuration pane
    const lazyModule = enzymeWrapper.find(LazyModuleComponent)
    assert.equal(lazyModule.length, 1, 'There should be a lazy module for search results configuration')
    assert.equal(lazyModule.at(0).props().module.type, 'search-results', 'There lazy module configuration should point search results')
    assert.isTrue(lazyModule.at(0).props().admin, 'The module should be rendered for configuration')
  })
})
