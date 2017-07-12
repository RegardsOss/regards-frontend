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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SearchGraphHeaderContainer } from '../../../src/containers/user/SearchGraphHeaderContainer'
import SearchGraphHeader from '../../../src/components/user/SearchGraphHeader'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SearchGraphHeaderContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchGraphHeaderContainer)
  })
  it('should render properly', () => {
    const props = {
      graphDatasetAttributes: [],
      // from mapStateToProps
      datasetAttributesVisible: true,
      moduleCollapsed: true,
      // from mapDispatchToProps
      dispatchSetDatasetAttributesVisible: () => { },
      dispatchSetModuleCollapsed: () => { },
    }
    const enzymeWrapper = shallow(<SearchGraphHeaderContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SearchGraphHeader), 1, 'The corresponding component should be rendered')
  })
})
