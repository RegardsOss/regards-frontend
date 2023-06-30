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
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MainBarModuleLink from '../../../../../src/components/user/navigation/bar/MainBarModuleLink'
import styles from '../../../../../src/styles'
import { fullConvertedNavigationModel } from '../../../../dumps/converted-navigation-items.dump'

const context = buildTestContext(styles)

/**
 * Test MainBarModuleLink
 * @author Raphaël Mechali
 */
describe('[Menu] Testing MainBarModuleLink', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainBarModuleLink)
  })
  it('should render correctly a selected module (EN locale)', () => {
    let spiedModuleParameter = null
    const props = {
      item: fullConvertedNavigationModel[0],
      buildLinkURL: (module) => {
        spiedModuleParameter = module
        return 'built-test-URL'
      },
    }
    const savedLocale = context.intl.locale
    context.intl.locale = 'en'
    const enzymeWrapper = shallow(<MainBarModuleLink {...props} />, { context })
    // 1 - check link
    const linkWrapper = enzymeWrapper.find(Link)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    assert.equal(linkWrapper.props().to, 'built-test-URL', 'Link should point to buildLinkURL function result')
    assert.equal(spiedModuleParameter, props.item.module, 'Module should be provided as parameter of the buildLinkURL function')
    // 2 - check button
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button')
    assert.isTrue(buttonWrapper.props().secondary, 'The module should be marked selected')
    assert.isOk(buttonWrapper.props().icon, 'The module icon should be configured')
    assert.equal(buttonWrapper.props().label, props.item.title.en, 'The selected module title should be module EN title')

    context.intl.locale = savedLocale
  })
  it('should render correctly a non selected module (FR locale)', () => {
    let spiedModuleParameter = null
    const props = {
      item: fullConvertedNavigationModel[1].children[0],
      buildLinkURL: (module) => {
        spiedModuleParameter = module
        return 'built-test-URL'
      },
    }
    const savedLocale = context.intl.locale
    context.intl.locale = 'fr'
    const enzymeWrapper = shallow(<MainBarModuleLink {...props} />, { context })
    // 1 - check link
    const linkWrapper = enzymeWrapper.find(Link)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    assert.equal(linkWrapper.props().to, 'built-test-URL', 'Link should point to buildLinkURL function result')
    assert.equal(spiedModuleParameter, props.item.module, 'Module should be provided as parameter of the buildLinkURL function')
    // 2 - check button
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button')
    assert.isFalse(buttonWrapper.props().secondary, 'The module should not be marked selected')
    assert.isOk(buttonWrapper.props().icon, 'The module icon should be configured')
    assert.equal(buttonWrapper.props().label, props.item.title.fr, 'The selected module title should be module FR title')

    context.intl.locale = savedLocale
  })
})
