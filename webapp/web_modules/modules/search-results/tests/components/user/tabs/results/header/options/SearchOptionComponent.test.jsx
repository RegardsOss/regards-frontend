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
 **/
import SearchIcon from 'mdi-material-ui/Magnify'
import FlatButton from 'material-ui/FlatButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SearchOptionComponent from '../../../../../../../src/components/user/tabs/results/header/options/SearchOptionComponent'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SearchOptionComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SearchOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchOptionComponent)
  })
  it('should render correctly with search open', () => {
    const props = {
      open: true,
      onToggleOpen: () => {},
    }
    const enzymeWrapper = shallow(<SearchOptionComponent {...props} />, { context })
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1)
    testSuiteHelpers.assertWrapperProperties(button, {
      label: 'search.results.show.search.pane.label',
      title: 'search.results.show.search.pane.title',
      onClick: props.onToggleOpen,
      icon: <SearchIcon />,
      secondary: true,
    })
  })
  it('should render correctly with search closed', () => {
    const props = {
      open: false,
      onToggleOpen: () => {},
    }
    const enzymeWrapper = shallow(<SearchOptionComponent {...props} />, { context })
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1)
    testSuiteHelpers.assertWrapperProperties(button, {
      label: 'search.results.show.search.pane.label',
      title: 'search.results.show.search.pane.title',
      onClick: props.onToggleOpen,
      icon: <SearchIcon />,
      secondary: false,
    })
  })
})
