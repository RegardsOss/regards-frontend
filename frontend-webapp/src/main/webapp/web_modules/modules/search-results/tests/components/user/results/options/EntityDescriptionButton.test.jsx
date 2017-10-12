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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import IconButton from 'material-ui/IconButton'
import EntityDescriptionButton from '../../../../../src/components/user/results/options/EntityDescriptionButton'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test EntityDescriptionButton
* @author Raphaël Mechali
*/
describe('[Search Results] Testing EntityDescriptionButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntityDescriptionButton)
  })
  it('should render correctly and start action on click', () => {
    const props = {
      tooltip: 'a tooltip',
      onShowDescription: () => { },
    }
    const render = shallow(<EntityDescriptionButton {...props} />, { context })
    const innerButton = render.find(IconButton)
    assert.lengthOf(innerButton, 1, 'It should use button to render')
    assert.equal(innerButton.props().title, props.tooltip, 'The tooltip should be visible')
    assert.equal(innerButton.props().onTouchTap, props.onShowDescription, 'The button should invoke onShowDescription after on touch tap')
  })
})
