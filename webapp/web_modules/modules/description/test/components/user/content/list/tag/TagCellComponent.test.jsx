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
import SearchIcon from 'mdi-material-ui/Magnify'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TagCellComponent from '../../../../../../src/components/user/content/list/tag/TagCellComponent'
import PageTextCellComponent from '../../../../../../src/components/user/content/list/common/PageTextCellComponent'
import PageElementOption from '../../../../../../src/components/user/content/list/common/PageElementOption'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TagCellComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing TagCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagCellComponent)
  })
  it('should render correctly with search option when search is allowed (coupling tag)', () => {
    const spyOnSearchWord = {}
    const props = {
      allowSearching: true,
      tag: 'coupling:myValue:myLabel',
      onSearchWord: (tag) => {
        spyOnSearchWord.tag = tag
      },
    }
    const enzymeWrapper = shallow(<TagCellComponent {...props} />, { context })
    const textCell = enzymeWrapper.find(PageTextCellComponent)
    // 1 - Check text cell
    assert.lengthOf(textCell, 1, 'There should be the text cell')
    testSuiteHelpers.assertWrapperProperties(textCell, {
      text: 'myLabel',
    }, 'Coupling tag text should be correctly computed')
    // 2 - Test search option and callback
    const searchOption = enzymeWrapper.find(PageElementOption)
    assert.lengthOf(searchOption, 1, 'There should be the search option')
    testSuiteHelpers.assertWrapperProperties(searchOption, {
      IconConstructor: SearchIcon,
      title: 'module.description.common.search.coupling.tag.tooltip',
      onClick: enzymeWrapper.instance().onSearchTag,
    }, 'Search option properties should be correctly set')
    assert.isNotOk(spyOnSearchWord.tag, 'Callback should not have been invoked yet')
    searchOption.props().onClick()
    assert.equal(spyOnSearchWord.tag, props.tag, 'Callback should have been invoked, with the right parameters')
  })
  it('should render correctly without search option when search is not allowed (simple tag)', () => {
    const props = {
      allowSearching: false,
      tag: 'mySimpleTag',
      onSearchWord: () => { },
    }
    const enzymeWrapper = shallow(<TagCellComponent {...props} />, { context })
    const textCell = enzymeWrapper.find(PageTextCellComponent)
    // 1 - Check text cell
    assert.lengthOf(textCell, 1, 'There should be the text cell')
    testSuiteHelpers.assertWrapperProperties(textCell, {
      text: 'mySimpleTag',
    }, 'Simple tag text should be reported unchanged')
    // 2 - Test search option and callback
    const searchOption = enzymeWrapper.find(PageElementOption)
    assert.lengthOf(searchOption, 0, 'There should not be the search option')
  })
})
