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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SearchTagCellComonent from '../../../../../../src/components/user/tree/cells/options/SearchTagCellComonent'
import SearchOptionComponent from '../../../../../../src/components/user/tree/cells/options/SearchOptionComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SearchTagCellComonent
 * @author Raphaël Mechali
 */
describe('[Description] Testing SearchTagCellComonent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchTagCellComonent)
  })
  it('should render correctly a simple tag', () => {
    const spyOnSearchWord = {}
    const props = {
      tag: 'SimpleWord',
      onSearchWord: (tag) => {
        spyOnSearchWord.tag = tag
      },
    }
    const enzymeWrapper = shallow(<SearchTagCellComonent {...props} />, { context })
    const searchOptionWrapper = enzymeWrapper.find(SearchOptionComponent)
    assert.lengthOf(searchOptionWrapper, 1, 'There should be the search option')
    testSuiteHelpers.assertWrapperProperties(searchOptionWrapper, {
      tooltip: 'module.description.common.search.simple.tag.tooltip',
      onSearch: enzymeWrapper.instance().onSearch,
    }, 'Search option properties should be correctly set')

    assert.isNotOk(spyOnSearchWord.tag, 'Callback should not have been invoked yet')
    searchOptionWrapper.props().onSearch()
    assert.equal(spyOnSearchWord.tag, props.tag, 'Callback should have been invoked with the right parameters')
  })
  it('should render correctly a coupling tag', () => {
    const spyOnSearchWord = {}
    const props = {
      tag: 'coupling:myRef:OhMyLabel',
      onSearchWord: (tag) => {
        spyOnSearchWord.tag = tag
      },
    }
    const enzymeWrapper = shallow(<SearchTagCellComonent {...props} />, { context })
    const searchOptionWrapper = enzymeWrapper.find(SearchOptionComponent)
    assert.lengthOf(searchOptionWrapper, 1, 'There should be the search option')
    testSuiteHelpers.assertWrapperProperties(searchOptionWrapper, {
      tooltip: 'module.description.common.search.coupling.tag.tooltip',
      onSearch: enzymeWrapper.instance().onSearch,
    }, 'Search option properties should be correctly set')

    assert.isNotOk(spyOnSearchWord.tag, 'Callback should not have been invoked yet')
    searchOptionWrapper.props().onSearch()
    assert.equal(spyOnSearchWord.tag, props.tag, 'Callback should have been invoked with the right parameters')
  })
})
