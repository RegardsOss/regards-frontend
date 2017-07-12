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
import { ShowableAtRender } from '@regardsoss/components'
import SearchGraph from '../../../src/components/user/SearchGraph'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SearchGraph', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchGraph)
  })
  it('should render when module is not collapsed', () => {
    const props = {
      graphDatasetAttributes: [],
      moduleCollapsed: false,
      moduleConf: {
        graphLevels: [

        ],
        graphDatasetAttributes: [],
      },
    }
    // check correctly rendered
    const enzymeWrapper = shallow(<SearchGraph {...props} />, { context })
    let showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be a module showable render')
    assert.isTrue(showables.at(0).props().show, 'The module content should be visible when not collapsed')

    const nextProps = {
      ...props,
      moduleCollapsed: true,
    }
    enzymeWrapper.setProps(nextProps)
    showables = enzymeWrapper.find(ShowableAtRender)
    assert.isFalse(showables.at(0).props().show, 'The module content should be hidden when collapsed')
  })
})
