/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { GraphLevelDisplayerContainer } from '../../../src/containers/user/GraphLevelDisplayerContainer'
import GraphLevelDisplayer from '../../../src/components/user/GraphLevelDisplayer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing GraphLevelDisplayerContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GraphLevelDisplayerContainer)
  })
  it('should render properly', () => {
    const props = {
      graphDatasetAttributes: [],
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
      levelIndex: 0,
      isFirstLevel: true,
      isLastLevel: false,
      levelModelName: 'any',
      selectionPath: [],
      isShowable: true,
      isLoading: false,
      hasError: false,
      collections: {},
      datasets: {},
      parentId: null,

      // from mapDispatchToProps
      dispatchFetchLevelCollections: () => { },
      dispatchFetchLevelDatasets: () => { },
    }
    const enzymeWrapper = shallow(<GraphLevelDisplayerContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(GraphLevelDisplayer), 1, 'The corresponding component should be rendered')
  })
})
