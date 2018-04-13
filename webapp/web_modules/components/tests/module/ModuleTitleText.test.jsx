/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ModuleTitleText from '../../src/module/ModuleTitleText'
import styles from '../../src/module/styles'

const context = buildTestContext(styles)

/**
 * Test ModuleTitleText
 * @author Raphaël Mechali
 */
describe('[Components] Testing ModuleTitleText', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleTitleText)
  })
  it('should render correctly with locale title', () => {
    const props = {
      title: {
        en: 'en-title',
        fr: 'fr-title',
      },
      description: 'description',
      locale: 'en',
    }
    const enzymeWrapper = shallow(<ModuleTitleText {...props} />, { context })
    assert.include(enzymeWrapper.debug(), 'en-title', 'english title should be selected')
    enzymeWrapper.setProps({
      ...props,
      locale: 'fr',
    })
    assert.include(enzymeWrapper.debug(), 'fr-title', 'english title should be selected')
  })
  it('should select the description when there is no title for locale', () => {
    const props = {
      title: {
        en: 'en-title',
      },
      description: 'description',
      locale: 'fr',
    }
    const enzymeWrapper = shallow(<ModuleTitleText {...props} />, { context })
    assert.include(enzymeWrapper.debug(), 'description', 'description should be selected as title ')
    enzymeWrapper.setProps({
      title: null,
      description: 'description2',
      locale: 'en',
    })
    assert.include(enzymeWrapper.debug(), 'description2', 'description2 should be selected as title ')
  })
})
