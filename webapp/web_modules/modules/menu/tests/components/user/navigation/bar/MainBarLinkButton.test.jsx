/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton/FlatButton'
import MainBarLinkButton from '../../../../../src/components/user/navigation/bar/MainBarLinkButton'
import styles from '../../../../../src/styles'
import { fullConvertedNavigationModel } from '../../../../dumps/converted-navigation-items.dump'

const context = buildTestContext(styles)

/**
 * Test MainBarLinkButton
 * @author Théo Lasserre
 */
describe('[Menu] Testing MainBarLinkButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainBarLinkButton)
  })
  it('should render correctly', () => {
    const props = {
      item: fullConvertedNavigationModel[3],
      buildLinkURL: () => { },
    }
    const savedLocale = context.intl.locale
    context.intl.locale = 'en'
    const enzymeWrapper = shallow(<MainBarLinkButton {...props} />, { context })
    const buttonDelegate = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonDelegate, 1, 'It should delegate rendering to a FlatButton ')
    testSuiteHelpers.assertWrapperProperties(buttonDelegate, {
      label: props.item.title.en,
    }, 'It should provide rigth properties to the render delegate')
    assert.isOk(buttonDelegate.props().icon, 'It should configure section icon')

    context.intl.locale = savedLocale
  })
})
