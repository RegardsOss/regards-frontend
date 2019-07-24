/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Breadcrumb } from '@regardsoss/components'
import { AccessDomain } from '@regardsoss/domain'
import NavigationComponent from '../../../../src/components/user/navigation/NavigationComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[SEARCH RESULTS] Testing NavigationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationComponent)
  })
  it('should render correctly without page', () => {
    const props = {
      page: null,
      defaultIconURL: 'hello.png',
      navigationLevels: [{
        label: {
          en: 'hello',
          fr: 'bijour',
        },
        isNavigationAllowed: false,
      }, {
        label: {
          en: 'bye',
          fr: 'au rivoir',
        },
        isNavigationAllowed: true,
      }],
      onLevelSelected: () => { },
    }
    const enzymeWrapper = shallow(<NavigationComponent {...props} />, { context })
    const breadcrumb = enzymeWrapper.find(Breadcrumb)
    assert.lengthOf(breadcrumb, 1, 'There should be a breadcrumb component')
    assert.deepEqual(breadcrumb.props().elements, props.navigationLevels, 'breacrumb elements should be the defined navigation levels')
    const savedLocale = context.intl.locale
    context.intl.locale = 'en'
    assert.equal(enzymeWrapper.instance().getLevelLabel(props.navigationLevels[0], 0), 'hello', 'level[0] label should be correctly retrieved')
    assert.equal(enzymeWrapper.instance().getLevelLabel(props.navigationLevels[1], 1), 'bye', 'level[1] label should be correctly retrieved')
    context.intl.locale = 'fr'
    assert.equal(enzymeWrapper.instance().getLevelLabel(props.navigationLevels[0], 0), 'bijour', 'level[0] label should be correctly retrieved')
    assert.equal(enzymeWrapper.instance().getLevelLabel(props.navigationLevels[1], 1), 'au rivoir', 'level[1] label should be correctly retrieved')
    context.intl.locale = savedLocale
  })
  it('should render correctly with page', () => {
    const props = {
      defaultIconURL: 'hello.png',
      page: {
        home: PropTypes.false,
        iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM,
        customIconURL: 'kikou.png',
        title: {
          en: 'Page title',
          fr: 'Titre de la page',
        },
      },
      navigationLevels: [{
        label: {
          en: 'hello',
          fr: 'bijour',
        },
        isNavigationAllowed: false,
      }, {
        label: {
          en: 'bye',
          fr: 'au rivoir',
        },
        isNavigationAllowed: true,
      }],
      onLevelSelected: () => { },
    }
    shallow(<NavigationComponent {...props} />, { context })
  })
})
