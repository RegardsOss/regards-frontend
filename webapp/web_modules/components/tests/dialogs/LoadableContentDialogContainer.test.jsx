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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LoadableContentDialogContainer } from '../../src/dialogs/LoadableContentDialogContainer'
import ContentLoadingComponent from '../../src/content/feedback/ContentLoadingComponent'

describe('[COMPONENTS] Testing LoadableContentDialogContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(LoadableContentDialogContainer)
  })

  it('should render correctly when loading', () => {
    const enzymeWrapper = shallow(
      <LoadableContentDialogContainer
        dialogHeightPercent={50}
        dialogWidthPercent={50}
        loadingMessage="Loading..."
        open
        loaded={false}
      >
        <div id="testDiv" />
      </LoadableContentDialogContainer>)
    assert.lengthOf(enzymeWrapper.find(ContentLoadingComponent), 1, 'It should display loading')

    const testDivs = enzymeWrapper.findWhere((n) => n.props().id === 'testDiv')
    assert.lengthOf(testDivs, 1, 'The children should be added')
    // parent should not be visible
    const parentStyles = testDivs.parent().props().style
    assert.isDefined(parentStyles, 'The custom children parent styles should be defined (to not display children)')
    assert.equal(parentStyles.display, 'none', 'The parent should hide children while loading')
  })
  it('should render correctly when loaded', () => {
    const enzymeWrapper = shallow(
      <LoadableContentDialogContainer
        dialogHeightPercent={50}
        dialogWidthPercent={50}
        loadingMessage="Loading..."
        open
        loaded
      >
        <div id="testDiv" />
      </LoadableContentDialogContainer>)
    assert.lengthOf(enzymeWrapper.find(ContentLoadingComponent), 0, 'It should not display loading')

    const testDivs = enzymeWrapper.findWhere((n) => n.props().id === 'testDiv')
    assert.lengthOf(testDivs, 1, 'The children should be added')
    // parent should not be visible
    const parentStyles = testDivs.parent().props().style
    assert.isDefined(parentStyles, 'The custom children parent styles should be defined (to not display children)')
    assert.notEqual(parentStyles.display, 'none', 'The parent should show children while loading')
  })
})
