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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MainBarSectionButton from '../../../../../src/components/user/navigation/bar/MainBarSectionButton'
import MainBarDropMenuButton from '../../../../../src/components/user/navigation/bar/MainBarDropMenuButton'
import styles from '../../../../../src/styles'
import { fullConvertedNavigationModel } from '../../../../dumps/converted-navigation-items.dump'

const context = buildTestContext(styles)

/**
 * Test MainBarSectionButton
 * @author Raphaël Mechali
 */
describe('[Menu] Testing MainBarSectionButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainBarSectionButton)
  })
  it('should render correctly', () => {
    const props = {
      item: fullConvertedNavigationModel[1],
      buildLinkURL: () => { },
    }
    const savedLocale = context.intl.locale
    context.intl.locale = 'en'
    const enzymeWrapper = shallow(<MainBarSectionButton {...props} />, { context })
    const buttonDelegate = enzymeWrapper.find(MainBarDropMenuButton)
    assert.lengthOf(buttonDelegate, 1, 'It should delegate rendering to a MainBarDropMenuButton ')
    testSuiteHelpers.assertWrapperProperties(buttonDelegate, {
      label: props.item.title.en,
      items: props.item.children,
      buildLinkURL: props.buildLinkURL,
    }, 'It should provide rigth properties to the render delegate')
    assert.isOk(buttonDelegate.props().icon, 'It should configure section icon')

    context.intl.locale = savedLocale
  })
})
