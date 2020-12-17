/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DynamicModulePane } from '@regardsoss/components'
import SearchGraph from '../../../src/components/user/SearchGraph'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SearchGraph', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchGraph)
  })

  UIDomain.PRESENTATION_STATE.forEach((presentationState) => it(`should render corrent in state ${presentationState}`, () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      presentationState,
      graphDatasetAttributes: [],
      moduleConf: {
        graphLevels: [

        ],
        graphDatasetAttributes: [],
      },
    }
    // check correctly rendered
    const enzymeWrapper = shallow(<SearchGraph {...props} />, { context })
    const moduleDisplayer = enzymeWrapper.find(DynamicModulePane)
    assert.lengthOf(moduleDisplayer, 1, 'There should be a module displayer render')
  }))
})
