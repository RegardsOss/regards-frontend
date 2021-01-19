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
import MainBarMoreNavigationButton from '../../../../../src/components/user/navigation/bar/MainBarMoreNavigationButton'
import { fullConvertedNavigationModel } from '../../../../dumps/converted-navigation-items.dump'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test MainBarMoreNavigationButton
 * @author Raphaël Mechali
 */
describe('[Menu] Testing MainBarMoreNavigationButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainBarMoreNavigationButton)
  })
  it('should render correctly visible with modules and sections', () => {
    const props = {
      displayed: true,
      items: fullConvertedNavigationModel, // all items
      buildLinkURL: () => { },
      onResized: () => { },
    }
    shallow(<MainBarMoreNavigationButton {...props} />, { context })
  })
  it('should render correctly hidden with modules and sections', () => {
    const props = {
      displayed: true,
      items: fullConvertedNavigationModel, // all items
      buildLinkURL: () => { },
      onResized: () => { },
    }
    shallow(<MainBarMoreNavigationButton {...props} />, { context })
    // note: we cannot search inside the Measure object here
  })
  it('should render correctly visible without modules and sections', () => {
    const props = {
      displayed: true,
      items: [],
      buildLinkURL: () => { },
      onResized: () => { },
    }
    shallow(<MainBarMoreNavigationButton {...props} />, { context })
    // note: we cannot search inside the Measure object here
  })
  it('should call parent callback on resize', () => {
    let spiedResizeWidth = null
    const props = {
      displayed: true,
      items: fullConvertedNavigationModel, // all items
      buildLinkURL: () => { },
      onResized: (width) => { spiedResizeWidth = width },
    }
    const enzymeWrapper = shallow(<MainBarMoreNavigationButton {...props} />, { context })
    // simulate resize
    enzymeWrapper.instance().onComponentResized({ measureDiv: { width: 2555 } })
    assert.equal(spiedResizeWidth, 2555, 'Parent resize callback should have been invoked with right parameters')
  })
  it('should precent parent calls on resize', () => {
    let spiedResizeWidth = null
    const props = {
      displayed: false,
      items: fullConvertedNavigationModel, // all items
      buildLinkURL: () => { },
      onResized: (width) => { spiedResizeWidth = width },
    }
    const enzymeWrapper = shallow(<MainBarMoreNavigationButton {...props} />, { context })
    // simulate resize
    enzymeWrapper.instance().onComponentResized({ measureDiv: { width: 2555 } })
    assert.isNotOk(spiedResizeWidth, 'It should have blocked parent callback as it is not displayed (avoids 0 resize)')
  })
})
