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
import { DynamicModule } from '@regardsoss/components'
import SearchGraph from '../../../src/components/user/SearchGraph'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SearchGraph', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchGraph)
  })
  it('should render when module is expanded', () => {
    const props = {
      graphDatasetAttributes: [],
      onExpandChange: () => { },
      expanded: true,
      moduleConf: {
        graphLevels: [

        ],
        graphDatasetAttributes: [],
      },
    }
    // check correctly rendered
    const enzymeWrapper = shallow(<SearchGraph {...props} />, { context })
    let moduleDisplayer = enzymeWrapper.find(DynamicModule)
    assert.lengthOf(moduleDisplayer, 1, 'There should be a module displayer render')
    assert.equal(moduleDisplayer.at(0).props().onExpandChange, props.onExpandChange, 'The expand callback should be correctly reported')
    assert.isTrue(moduleDisplayer.at(0).props().expanded, 'The module content should be visible when expanded')

    const nextProps = {
      ...props,
      expanded: false,
    }
    enzymeWrapper.setProps(nextProps)
    moduleDisplayer = enzymeWrapper.find(DynamicModule)
    assert.isFalse(moduleDisplayer.at(0).props().expanded, 'The module content should be hidden when collapsed')
  })
})
